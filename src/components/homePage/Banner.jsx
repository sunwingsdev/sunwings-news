import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";

import { Link } from "react-router-dom";
import SmallNewsCard from "../shared/SmallNewsCard";

const Banner = () => {
  const { data, isLoading: loading } = useGetPostsQuery({});
  const posts = data?.filter((post) => post.status === "published");
  const lastFiveNews = posts?.slice(0, 5);
  const popularNews = posts?.filter((post) => post.isPopular === true);

  const tabList = [
    { label: "সর্বশেষ সংবাদ", value: "" },
    { label: "আলোচিত সংবাদ", value: "" },
  ];
  return (
    <div className="grow text-white flex flex-col md:flex-row gap-2 container mx-auto">
      <div className="md:w-2/3">
        {loading ? (
          <div className="skeleton w-full md:w-[30rem] lg:w-[41rem] xl:w-[38rem] 2xl:w-[54rem] h-full md:h-[30rem] lg:h-[41rem] xl:h-[38rem] 2xl:h-[54rem]"></div>
        ) : (
          <div className="w-full md:max-w-[30rem] lg:max-w-[41rem] xl:max-w-[38rem] 2xl:max-w-[54rem]">
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              navigation={false}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper w-full"
            >
              {lastFiveNews?.map((post) => (
                <SwiperSlide key={post?._id}>
                  <div className="relative h-fit">
                    <div className="h-[30rem]">
                      <img
                        src={post?.postThumbnail}
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                    <div className="absolute bottom-0 backdrop-blur-sm bg-black/30 w-full py-2 px-2">
                      <Link to={`/posts/${post?._id}`}>
                        <h1 className="text-white text-lg hover:text-blue-500 hover:underline">
                          {post?.postTitle}
                        </h1>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
      <div className="md:w-1/3 text-black text-sm md:text-lg">
        {/* need to change the selected border radius */}

        {loading ? (
          <div className="skeleton w-full md:w-[5rem] lg:w-[10rem] xl:w-[15rem] 2xl:w-[20rem] h-full md:h-[30rem] lg:h-[41rem] xl:h-[38rem] 2xl:h-[54rem] md:ml-5"></div>
        ) : (
          <Tabs
            defaultFocus={false}
            selectedTabClassName="bg-[#022831] text-white border-[#046279] rounded-none"
          >
            <TabList
              className={
                "flex flex-row justify-center items-center text-[#022831] bg-[#ddd] md:text-[16px] "
              }
            >
              {tabList.map((tab, i) => (
                <Tab
                  className="p-[4px] w-full flex items-center justify-center border-t-[3px] border-solid border-[#022940] rounded-none cursor-pointer"
                  key={i}
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>

            <div className="max-h-[300px] md:max-h-[450px] lg:max-h-[430px] xl:max-h-[440px] 2xl:max-h-[420px] overflow-y-scroll  overflow-x-clip">
              <TabPanel className={"space-y-2 my-2"}>
                {posts?.map((post, i) => (
                  <SmallNewsCard post={post} key={i} />
                ))}
              </TabPanel>
              <TabPanel className={"space-y-2 my-2"}>
                {popularNews?.map((post, i) => (
                  <SmallNewsCard post={post} key={i} />
                ))}
              </TabPanel>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Banner;
