import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { FaCirclePlay } from "react-icons/fa6";
import { useState } from "react";
import { useGetAllVideoQuery } from "../../redux/features/allApis/videoGalleryApi/videoGalleryApi";
import { MdLiveTv } from "react-icons/md";

const VideoNews = () => {
  const [clickedVideo, setClickedVideo] = useState(null);
  const { data: allVideos } = useGetAllVideoQuery();

  const handleVideo = async (vid) => {
    setClickedVideo(vid);
    document.getElementById("my_modal_3").showModal();
  };
  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 1280px
    1280: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  };

  const liveTv = allVideos?.filter((video) => video.category === "liveTv");
  const showLiveTv = liveTv?.filter((video) => video.isSelected === true);

  const newsData = allVideos?.filter((video) => video.category === "news");
  const entertainmentData = allVideos?.filter(
    (video) => video.category === "entertainment"
  );
  const talkShowData = allVideos?.filter(
    (video) => video.category === "talk-show"
  );
  return (
    <>
      <div className="bg-gray-500 text-gray-200 flex gap-4 flex-col md:flex-col lg:flex-row">
        <div className="p-10 bg-gray-700 flex flex-col items-center md:items-start w-full md:w-full lg:w-1/2">
          <div className="text-white font-semibold mb-4">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6 flex items-center justify-center">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></div>

                <MdLiveTv className="text-lg text-red-600" />
              </div>
              <span> লাইভ টিভি</span>
            </div>
          </div>

          {showLiveTv?.[0] ? (
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8">
                <FaCirclePlay
                  onClick={() => handleVideo(showLiveTv?.[0])}
                  className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer"
                />
              </div>

              <img
                src={showLiveTv?.[0]?.thumbnail}
                alt="Gallery Image"
                className="w-full"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-lg font-mono italic">
                *** No Live TV / video Streaming Now ***
              </p>
            </div>
          )}
        </div>
        <div className="p-6 w-full md:w-full lg:w-1/2">
          <Tabs>
            <TabList className="flex gap-4 font-medium text-xs md:text-base">
              <Tab className="border p-2 bg-orange-500 hover:bg-red-500 cursor-pointer">
                ভিডিও নিউজ
              </Tab>
              <Tab className="border p-2 bg-orange-500 hover:bg-red-500 cursor-pointer">
                ভিডিও বিনোদন
              </Tab>
              <Tab className="border p-2 bg-orange-500 hover:bg-red-500 cursor-pointer">
                ভিডিও টকশো
              </Tab>
            </TabList>

            <TabPanel className="mt-5">
              {newsData?.filter((video) => video.isSelected)?.length > 0 ? (
                <div className="max-w-3xl">
                  <Swiper
                    breakpoints={breakpoints}
                    spaceBetween={30}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    loop={true}
                    modules={[Autoplay, FreeMode, Navigation, Pagination]}
                    className="mySwiper h-72 lg:h-60 xl:h-80 2xl:h-96"
                  >
                    {newsData
                      ?.filter((video) => video.isSelected)
                      ?.map((vid) => (
                        <SwiperSlide key={vid?._id}>
                          <div key={vid?._id} className="relative">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8">
                              <FaCirclePlay
                                onClick={() => handleVideo(vid)}
                                className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer"
                              />
                            </div>

                            <img
                              src={vid?.thumbnail}
                              alt="Gallery Image"
                              className="w-full"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              ) : (
                <div className="flex items-center justify-center h-72 lg:h-60 xl:h-80 2xl:h-96">
                  <p className="text-lg font-mono italic">
                    *** No data available ***
                  </p>
                </div>
              )}
            </TabPanel>

            <TabPanel className="mt-5">
              {entertainmentData?.filter((video) => video.isSelected)?.length >
              0 ? (
                <div className="max-w-3xl">
                  <Swiper
                    breakpoints={breakpoints}
                    spaceBetween={30}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    loop={true}
                    modules={[Autoplay, FreeMode, Navigation, Pagination]}
                    className="mySwiper h-72 lg:h-60 xl:h-80 2xl:h-96"
                  >
                    {entertainmentData
                      ?.filter((video) => video.isSelected)
                      ?.map((vid) => (
                        <SwiperSlide key={vid?._id}>
                          <div key={vid?._id} className="relative">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8">
                              <FaCirclePlay
                                onClick={() => handleVideo(vid)}
                                className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer"
                              />
                            </div>

                            <img
                              src={vid?.thumbnail}
                              alt="Gallery Image"
                              className="w-full"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              ) : (
                <div className="flex items-center justify-center h-72 lg:h-60 xl:h-80 2xl:h-96">
                  <p className="text-lg font-mono italic">
                    *** No data available ***
                  </p>
                </div>
              )}
            </TabPanel>

            <TabPanel className="mt-5">
              {talkShowData?.filter((video) => video.isSelected)?.length > 0 ? (
                <div className="max-w-3xl">
                  <Swiper
                    breakpoints={breakpoints}
                    spaceBetween={30}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    loop={true}
                    modules={[Autoplay, FreeMode, Navigation, Pagination]}
                    className="mySwiper h-72 lg:h-60 xl:h-80 2xl:h-96"
                  >
                    {talkShowData
                      ?.filter((video) => video.isSelected)
                      ?.map((vid) => (
                        <SwiperSlide key={vid?._id}>
                          <div key={vid?._id} className="relative">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8">
                              <FaCirclePlay
                                onClick={() => handleVideo(vid)}
                                className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white cursor-pointer"
                              />
                            </div>

                            <img
                              src={vid?.thumbnail}
                              alt="Gallery Image"
                              className="w-full"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              ) : (
                <div className="flex items-center justify-center h-72 lg:h-60 xl:h-80 2xl:h-96">
                  <p className="text-lg font-mono italic">
                    *** No data available ***
                  </p>
                </div>
              )}
            </TabPanel>
          </Tabs>
        </div>
      </div>
      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-[98%] md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 max-w-5xl bg-gray-300">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle bg-orange-600 absolute right-2 top-2 text-white">
              ✕
            </button>
          </form>
          {/* modal content  */}
          <div>
            {clickedVideo?.category !== "liveTv" ? (
              <iframe
                src={clickedVideo?.link.replace(
                  "https://youtu.be/",
                  "https://www.youtube.com/embed/"
                )}
                frameBorder="0"
                className="w-full h-96"
              ></iframe>
            ) : (
              <iframe
                src={clickedVideo?.liveLink.replace(
                  "https://www.youtube.com/live/",
                  "https://www.youtube.com/embed/"
                )}
                frameBorder="0"
                className="w-full h-96"
              ></iframe>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default VideoNews;
