import NewsContent from "../../components/homePage/NewsContent";
import fullImg from "../../assets/2.png";
import Banner from "../../components/homePage/Banner";
import Aside from "../../components/homePage/Aside";
import Advertisement from "../../components/shared/Advertisement";
import MiddleCategorySec from "../../components/homePage/MiddleCategorySec";
import AllNews from "../../components/homePage/AllNews";
import EntertainmentSection from "../../components/homePage/EntertainmentSection";
import { useGetAllAdvertisementQuery } from "../../redux/features/allApis/advertisementApi/advertisementApi";
import Gallery from "../../components/homePage/Gallery";
import { Helmet } from "react-helmet-async";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";
import CategorizedNews from "../../components/homePage/CategorizedNews";
import { useEffect, useState } from "react";
import VideoNews from "../../components/homePage/VideoNews";
import ReactGA from "react-ga4";

const Home = () => {
  const [date, setDate] = useState("");
  const { data: allAds } = useGetAllAdvertisementQuery();
  const { data: nationalNews, isLoading: nationalLoading } = useGetPostsQuery({
    category: "সারাদেশ",
  });

  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
  ReactGA.initialize(trackingId);
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: document.location.pathname,
      title: "Home",
    });
  }, []);

  const publishedNationalNews = nationalNews?.filter(
    (news) => news.status === "published"
  );
  const adCenterOfHomePage = allAds
    ? allAds.find(
        (ad) => ad.isSelected === true && ad.position === "center_home_page"
      )
    : null;

  const adJatioCategoryTopLeft = allAds
    ? allAds.find(
        (ad) =>
          ad.isSelected === true && ad.position === "jatio_category_top_left"
      )
    : null;

  const adJatioCategoryTopRight = allAds
    ? allAds.find(
        (ad) =>
          ad.isSelected === true && ad.position === "jatio_category_top_right"
      )
    : null;

  const adBinodonCategoryTopLeft = allAds
    ? allAds.find(
        (ad) =>
          ad.isSelected === true && ad.position === "binodon_category_top_left"
      )
    : null;

  const adBinodonCategoryTopRight = allAds
    ? allAds.find(
        (ad) =>
          ad.isSelected === true && ad.position === "binodon_category_top_right"
      )
    : null;

  const adVideoSectionTopLeft = allAds
    ? allAds.find(
        (ad) =>
          ad.isSelected === true && ad.position === "video_section_top_left"
      )
    : null;

  const adVideoSectionTopRight = allAds
    ? allAds.find(
        (ad) =>
          ad.isSelected === true && ad.position === "video_section_top_right"
      )
    : null;

  const adVideoSectionBottomLeft = allAds
    ? allAds.find(
        (ad) =>
          ad.isSelected === true && ad.position === "video_section_bottom_left"
      )
    : null;

  const adVideoSectionBottomRight = allAds
    ? allAds.find(
        (ad) =>
          ad.isSelected === true && ad.position === "video_section_bottom_right"
      )
    : null;
  return (
    <div className="container mx-auto px-2">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="flex gap-5 xl:flex-row flex-col">
        {/* home left site */}
        <div>
          {/* banner section */}
          <Banner />
          {/* all posts section  */}
          <AllNews date={date} />
        </div>
        {/* home right site */}
        <Aside setDate={setDate} />
      </div>
      <div className="flex-col lg:flex-row flex items-center gap-4 py-4">
        <Advertisement selectedAd={adJatioCategoryTopLeft} />
        <Advertisement selectedAd={adJatioCategoryTopRight} />
      </div>
      <NewsContent />

      <div className="py-4">
        {adCenterOfHomePage ? (
          <img
            src={adCenterOfHomePage?.banner}
            alt="AdvertiseMent"
            className="w-full h-28"
          />
        ) : (
          <img src={fullImg} alt="Advertisement big" className="w-full h-28" />
        )}
      </div>
      {/* middle category section */}
      <MiddleCategorySec />

      <div className="flex-col lg:flex-row flex items-center gap-4 py-4">
        <Advertisement selectedAd={adBinodonCategoryTopLeft} />
        <Advertisement selectedAd={adBinodonCategoryTopRight} />
      </div>

      <EntertainmentSection />

      <div className="flex-col lg:flex-row flex items-center gap-4 py-4">
        <Advertisement selectedAd={adVideoSectionTopLeft} />
        <Advertisement selectedAd={adVideoSectionTopRight} />
      </div>

      <VideoNews />

      {/* <NewsContent /> */}

      <div className="flex-col lg:flex-row flex items-center gap-4 py-4">
        <Advertisement selectedAd={adVideoSectionBottomLeft} />
        <Advertisement selectedAd={adVideoSectionBottomRight} />
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="w-full md:w-2/3">
          <Gallery />
        </div>
        <div className="w-full md:w-full lg:w-1/3">
          <CategorizedNews
            secTitle={"ভ্রমণ"}
            news={publishedNationalNews}
            loading={nationalLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
