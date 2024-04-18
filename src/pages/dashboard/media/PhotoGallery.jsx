import { Helmet } from "react-helmet-async";
import PhotoGalleryUpload from "../../../components/dashboard/media/photoGallery/PhotoGalleryUpload";
import PhotoGalleryCollection from "../../../components/dashboard/media/photoGallery/PhotoGalleryCollection";
import { useGetAllPhotoQuery } from "../../../redux/features/allApis/photoGalleryApi/photoGalleryApi";

const PhotoGallery = () => {
  const { data: allPhotos } = useGetAllPhotoQuery();
  return (
    <div className="flex flex-col gap-3">
      <Helmet>
        <title>Sunwings | Photo Gallery</title>
      </Helmet>
      <h1 className="text-black text-2xl mb-5">Photo Gallery</h1>
      <div className="flex flex-col gap-16 w-full">
        <PhotoGalleryUpload />
        <PhotoGalleryCollection data={allPhotos} />
      </div>
    </div>
  );
};

export default PhotoGallery;
