import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import CategoryTitle from "../shared/CategoryTitle";
import SocialShare from "../shared/SocialShare";
import { useGetAllAdvertisementQuery } from "../../redux/features/allApis/advertisementApi/advertisementApi";
import ad250x250Img from "../../assets/testad2.jpg";
import { useGetAllFacebookQuery } from "../../redux/features/allApis/socialMediaApi/facebookApi";
import { useGetAllTwitterQuery } from "../../redux/features/allApis/socialMediaApi/twitterApi";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { Link } from "react-router-dom";

const Aside = ({ setDate }) => {
  const { data: allAds } = useGetAllAdvertisementQuery();
  const { data: allFacebook } = useGetAllFacebookQuery();
  const { data: allTwitter } = useGetAllTwitterQuery();

  const singleFacebook = allFacebook?.[0];
  const singleTwitter = allTwitter?.[0];

  // filter posts by date function
  const handleDateSubmit = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    // console.log(date);
    setDate(date);
  };

  const adBesideNewsSwiper = allAds
    ? allAds.find(
        (ad) =>
          ad.isSelected === true &&
          ad.position === "beside_news_slider_top_right_corner"
      )
    : null;

  return (
    <div className="flex-none xl:w-72 text-white">
      <div className="grid grid-cols-2 md:grid-cols-1 lg:max-xl:grid-cols-4 md:max-lg:grid-cols-4 content-between gap-4">
        {adBesideNewsSwiper ? (
          <Link to={adBesideNewsSwiper?.link ? adBesideNewsSwiper?.link : null}>
            <img
              src={adBesideNewsSwiper?.banner}
              alt="Advertisement"
              className="w-full"
            />
          </Link>
        ) : (
          <img src={ad250x250Img} alt="ad 250 x 250" />
        )}

        {/* ফেসবুকে আমরা */}
        <div className="space-y-4">
          <CategoryTitle title="ফেসবুকে আমরা" />
          <SocialShare
            title={singleFacebook?.title}
            socialUrl={singleFacebook?.link}
            cardImage={singleFacebook?.coverPhoto}
            icon={FaFacebookSquare}
            profileImage={singleFacebook?.profilePhoto}
            shareUrl={singleFacebook?.link}
            shareButton={FacebookShareButton}
          />
        </div>

        {/* টুইটারে আমরা */}
        <div className="space-y-4">
          <CategoryTitle title="টুইটারে আমরা" />
          <SocialShare
            title={singleTwitter?.title}
            socialUrl={singleTwitter?.link}
            cardImage={singleTwitter?.coverPhoto}
            icon={FaTwitterSquare}
            profileImage={singleTwitter?.profilePhoto}
            shareUrl={singleTwitter?.link}
            shareButton={TwitterShareButton}
          />
        </div>

        {/* পুরাতন সংবাদ */}
        <div className="col-span-2 md:col-span-1">
          <CategoryTitle title="পুরাতন সংবাদ" />
          <div className="">
            <form onSubmit={handleDateSubmit}>
              <input
                id="date"
                type="date"
                placeholder="Type here"
                className="bg-white input input-bordered w-full text-black p-2 border border-gray-500 my-4"
              />
              <input
                type="submit"
                value="খুজুন"
                className="w-full bg-orange-500 p-2 text-center hover:bg-orange-400"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
