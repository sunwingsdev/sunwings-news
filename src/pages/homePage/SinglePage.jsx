import { useNavigate, useParams } from "react-router-dom";
// import SinglePageLeft from "../../components/homePage/SinglePageLeft";
import SinglePageRight from "../../components/homePage/SinglePageRight";
import CategoryTitle from "../../components/shared/CategoryTitle";
import { useGetPostByIdQuery } from "../../redux/features/allApis/postApi/postApi";
import SinglePageLeft from "../../components/homePage/SinglePageLeft";
import moment from "moment/moment";
import { Helmet } from "react-helmet-async";
import CommentSection from "./CommentSection";
import { useGetBodyThemeQuery } from "../../redux/features/allApis/bodyThemeApi/bodyThemeApi";
import { FaPrint } from "react-icons/fa6";
import Loader from "../../components/shared/Loader/Loader";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const SinglePage = () => {
  const { id } = useParams();
  const { data: singlePost, isLoading } = useGetPostByIdQuery({ id });
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];
  const navigate = useNavigate();

  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
  ReactGA.initialize(trackingId);
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: document.location.pathname,
      title: singlePost?.postTitle,
    });
  }, [singlePost]);

  const handlePrintButton = () => {
    navigate(`/print-news/${singlePost?._id}`);
  };

  const currentPageUrl = window.location.href;

  const renderContent =
    singlePost?.quill &&
    singlePost?.quill
      .split(" ")
      .join(" ")
      .replace(
        /<p/g,
        '<p style="max-width:100%;width:100%;height:auto;display:inline;"'
      );
  const styledRenderContent = `<div style="color: ${singleTheme?.singlePostQuillFontColor}; font-size: ${singleTheme?.singlePostQuillFontSize}px;">${renderContent}</div>`;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className="flex flex-col md:flex-row m-auto container px-2 gap-4"
      style={{ backgroundColor: singleTheme?.singlePostBg }}
    >
      <Helmet>
        <title>Sunwings | News Details</title>
      </Helmet>
      <div className="md:w-1/6 space-y-4 order-2 md:order-1">
        <CategoryTitle title={"সর্বশেষ সংবাদ"} />
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <SinglePageLeft />
        </div>
      </div>
      <div className="md:w-4/6 space-y-2 order-1 md:order-2 my-4">
        <h3
          className="font-semibold"
          style={{
            fontSize: `${singleTheme?.singlePostTitleFontSize}px`,
            color: singleTheme?.singlePostTitleFontColor,
          }}
        >
          {singlePost?.postTitle}
        </h3>
        <div className="flex flex-row justify-between gap-2 items-center">
          <div className="flex flex-row gap-2">
            <img
              src={singlePost?.authorImage}
              className="rounded-full"
              style={{
                width: `${singleTheme?.singlePostAuthorImageSize}px`,
                height: `${singleTheme?.singlePostAuthorImageSize}px`,
              }}
            />
            <p
              style={{
                fontSize: singleTheme?.singlePostAuthorFontSize,
                color: singleTheme?.singlePostAuthorFontColor,
              }}
            >
              {singlePost?.author}
            </p>
          </div>
          <p
            style={{
              fontSize: `${singlePost?.singlePostPublishDateFontSize}px`,
              color: singlePost?.singlePostPublishDateFontColor,
            }}
          >
            {moment(singlePost?.publishDate).format("MMMM Do YYYY, h:mm a ")}
          </p>
        </div>

        <p dangerouslySetInnerHTML={{ __html: styledRenderContent }}></p>
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <div onClick={handlePrintButton} className="inline-block">
              <div className="my-2 flex flex-row gap-2 items-center justify-center bg-blue-700 text-white text-xl px-4 py-2">
                <span>প্রিন্ট করুন : </span>
                <FaPrint />
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div>
                <p className="text-lg text-black">Share To: </p>
              </div>
              <FacebookShareButton
                // url={currentPageUrl}
                hashtag={"#sunwings_tours_and_travels"}
                url={`${import.meta.env.VITE_SITE_URL}/posts/${id}`}
              >
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={currentPageUrl}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <LinkedinShareButton url={currentPageUrl}>
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
            </div>
          </div>

          {singlePost?.updateAuthor && (
            <p className="text-xl">
              নিউজটি আপডেট করেছেন : {singlePost?.updateAuthor}
            </p>
          )}

          <CommentSection
            newsId={singlePost?._id}
            newsTitle={singlePost?.postTitle}
          />
        </div>
      </div>
      <div className="md:w-1/6 order-3">
        <CategoryTitle title={"আলোচিত সংবাদ"} />
        <SinglePageRight />
      </div>
    </div>
  );
};

export default SinglePage;
