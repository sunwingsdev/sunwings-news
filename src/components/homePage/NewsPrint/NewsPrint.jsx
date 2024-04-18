import { useRef } from "react";
import { useGetFooterQuery } from "../../../redux/features/allApis/footerApi/footerApi";
import Loader from "../../shared/Loader/Loader";
import { useReactToPrint } from "react-to-print";
import "./printStyles.css";
import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../../redux/features/allApis/postApi/postApi";
import { useGetAllLogoQuery } from "../../../redux/features/allApis/logoApi/logoApi";

const NewsPrint = () => {
  const { id } = useParams();
  const { data: singlePost, isLoading: singlePostLoading } =
    useGetPostByIdQuery({ id });
  const { data: allFooters, isLoading } = useGetFooterQuery();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const presentTime = new Date().toLocaleString("bn-BD", {
    timeZone: "Asia/Dhaka",
  }); // Get current time in Bangla
  const publishDate = new Date(singlePost?.publishDate);
  const banglaPublishDate = publishDate.toLocaleString("bn-BD", {
    timeZone: "Asia/Dhaka",
  });
  const footerInfo = allFooters[0];
  const renderContent = singlePost?.quill;

  const { data: allLogos } = useGetAllLogoQuery();

  const desktopLogos = allLogos
    ? allLogos.filter((logo) => logo.position === "desktop_logo")
    : [];

  const selectedDesktopLogo = desktopLogos
    ? desktopLogos.find((logo) => logo.isSelected === true)
    : null;

  if (isLoading && singlePostLoading) {
    return <Loader />;
  }

  return (
    <div className="px-40 py-20 bg-white">
      <button
        className="fixed top-4 right-4 px-5 py-2 bg-green-600 text-white"
        onClick={handlePrint}
      >
        Print
      </button>
      <div
        ref={componentRef}
        className="printable-content flex flex-col justify-center bg-white mx-auto border-2 px-6 py-2 border-green-700"
        id="printableArea"
      >
        <img
          className="h-36 my-2 px-14"
          src={selectedDesktopLogo?.logo}
          alt=""
        />
        <div
          className="text-white text-center w-full py-[5px] text-[18px]"
          style={{
            backgroundColor: "#106634",
            color: "white",
            "@media print": { backgroundColor: "#106634 !important" },
          }}
        >
          <span>প্রিন্ট এর তারিখঃ {presentTime} </span>||
          <span> প্রকাশের তারিখঃ {banglaPublishDate}</span>
        </div>

        <h1 className="text-center font-bold text-[34px] my-[30px] px-[4px]">
          {singlePost?.postTitle}
        </h1>

        {/* Use columns for Quill content */}
        <div className="columns-2">
          <div dangerouslySetInnerHTML={{ __html: renderContent }}></div>
        </div>

        <img
          className="w-[300px] mx-auto mt-4"
          src={selectedDesktopLogo?.logo}
          alt=""
        />
        <div className="bg-white text-center text-black text-[18px] m-[10px] font-semibold">
          <p>
            <span>সম্পাদক ও প্রকাশক: {footerInfo?.sompadokAndProkashok}</span>,
            <span> নির্বাহী সম্পাদক : {footerInfo?.nirbahiSompadok}</span>,
            <span> বার্তা সম্পাদক : {footerInfo?.bartaSompadok}</span>
          </p>
          <p>
            <span>মোবাইল : {footerInfo?.officeMobile}</span>,
            <span> ইমেইল : {footerInfo?.officeEmail}</span>,
            <span> web : https://sunwingsnews.com</span>
          </p>
        </div>
        <div className="container py-6 px-2 mx-auto">
          <div className="text-center flex flex-row gap-1 justify-center">
            <span>© 2024 Copyright:</span>
            <p className="font-semibold">{footerInfo?.copyrightText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPrint;
