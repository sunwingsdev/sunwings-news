import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

import {
  FreeMode,
  Thumbs,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";
import CategoryTitle from "../shared/CategoryTitle";
import { useGetAllPhotoQuery } from "../../redux/features/allApis/photoGalleryApi/photoGalleryApi";

const Gallery = () => {
  const { data: allPhotos } = useGetAllPhotoQuery();
  const selectedPhotos = allPhotos?.filter((photo) => photo.isSelected);

  const newPhotos = selectedPhotos?.slice(0, 5);

  return (
    <div>
      <CategoryTitle title="ফটোগ্যালারী" />
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Thumbs, Autoplay, Pagination, Navigation]}
        className="mySwiper w-full mx-auto my-2 h-fit lg:h-[30rem]"
      >
        {newPhotos?.map((item, i) => (
          <SwiperSlide key={i}>
            <img src={item?.photo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {newPhotos?.map((item, i) => (
          <SwiperSlide key={i}>
            <img src={item?.photo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
