import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useGetAllPhotoQuery } from "../../redux/features/allApis/photoGalleryApi/photoGalleryApi";
import Loader from "../../components/shared/Loader/Loader";
import { Helmet } from "react-helmet-async";
import Carousel, { Modal, ModalGateway } from "react-images";

const FooterGallery = () => {
  const { data: images, isLoading } = useGetAllPhotoQuery();
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setLightboxIsOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  const photos = images.map((image) => ({
    src: image.photo,
    width: 4,
    height: 3,
  }));

  return (
    <div className="w-full mx-auto max-w-6xl px-4 py-8">
      <Helmet>
        <title>Sunwings | Photo Gallery</title>
      </Helmet>
      <h2 className="text-center text-orange-600 text-5xl mb-8 font-semibold">
        Welcome to Our Photo Gallery
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed mb-8 text-center">
        Explore moments captured in time. From serene landscapes to vibrant
        cityscapes, our gallery encapsulates the essence of wanderlust. Each
        image tells a unique story waiting to be discovered. Join us on a visual
        journey like no other.
      </p>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.photo}
                className="w-full h-auto object-cover rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                alt=""
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                <p className="text-white text-lg font-semibold">
                  Click to View
                </p>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <ModalGateway>
        {lightboxIsOpen ? (
          <Modal onClose={closeLightbox}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </div>
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default FooterGallery;
