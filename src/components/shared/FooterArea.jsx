import { Link } from "react-router-dom";
import footerLogo from "../../assets/logo1.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useGetFooterQuery } from "../../redux/features/allApis/footerApi/footerApi";
import { useGetAllFacebookQuery } from "../../redux/features/allApis/socialMediaApi/facebookApi";
import { useGetAllInstagramQuery } from "../../redux/features/allApis/socialMediaApi/instagramApi";
import { useGetAllYoutubeQuery } from "../../redux/features/allApis/socialMediaApi/youtubeApi";
import { useGetAllTwitterQuery } from "../../redux/features/allApis/socialMediaApi/twitterApi";

const FooterArea = () => {
  const { data: allFooters } = useGetFooterQuery();
  const { data: allFacebook } = useGetAllFacebookQuery();
  const { data: allInstagram } = useGetAllInstagramQuery();
  const { data: allYoutube } = useGetAllYoutubeQuery();
  const { data: allTwitter } = useGetAllTwitterQuery();

  const singleFooter = allFooters?.[0];
  const singleFacebook = allFacebook?.[0];
  const singleInstagram = allInstagram?.[0];
  const singleYoutube = allYoutube?.[0];
  const singleTwitter = allTwitter?.[0];

  const dynamicBgColorStyle = singleFooter
    ? { backgroundColor: singleFooter.bgColor }
    : { backgroundColor: "#454444" };

  const dynamicTextColorStyle = singleFooter
    ? { color: singleFooter.textColor }
    : { color: "#ffff" };
  const dynamicIconColorStyle = singleFooter
    ? { color: singleFooter.iconColor }
    : { color: "#ffff" };

  return (
    <footer
      className="container mx-auto py-4 px-2  text-center text-surface/75 lg:text-left"
      style={{ ...dynamicBgColorStyle, ...dynamicTextColorStyle }}
    >
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 lg:justify-between">
        <div className="me-12 hidden lg:block">
          <span className="text-lg">
            Get connected with us on social networks:
          </span>
        </div>
        {/* <!-- Social network icons container --> */}
        <div className="flex justify-center items-center text-gray-300">
          <Link to={singleFacebook?.link} className="me-4">
            <div
              className="border rounded-full size-8 flex items-center justify-center"
              style={{ ...dynamicIconColorStyle }}
            >
              <FaFacebookF />
            </div>
          </Link>
          <Link to={singleTwitter?.link} className="me-4">
            <div
              className="border rounded-full size-8 flex items-center justify-center"
              style={{ ...dynamicIconColorStyle }}
            >
              <FaTwitter />
            </div>
          </Link>
          <Link to={singleYoutube?.channelLink} className="me-4">
            <div
              className="border rounded-full size-8 flex items-center justify-center"
              style={{ ...dynamicIconColorStyle }}
            >
              <FaYoutube />
            </div>
          </Link>
          <Link to={singleInstagram?.link} className="me-4">
            <div
              className="border rounded-full size-8 flex items-center justify-center"
              style={{ ...dynamicIconColorStyle }}
            >
              <FaInstagram />
            </div>
          </Link>
        </div>
      </div>

      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-cols-1 justify-center items-start grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* <!-- TW Elements section --> */}
          <Link
            to="/"
            className="flex flex-col gap-6 justify-center items-center"
          >
            {singleFooter ? (
              <img
                src={singleFooter?.footerLogo}
                alt="footer logo"
                className="w-56"
              />
            ) : (
              <img src={footerLogo} alt="footer logo" className="w-56" />
            )}
            <p className="text-center">{singleFooter?.about}</p>
          </Link>

          {/* সম্পাদকীয় section */}
          <div className="flex flex-col gap-4">
            <h1 className=" font-semibold underline underline-offset-8">
              সম্পাদকীয়
            </h1>
            <div>
              <p>সম্পাদক ও প্রকাশক : {singleFooter?.sompadokAndProkashok}</p>
              <p>নির্বাহী সম্পাদক : {singleFooter?.nirbahiSompadok}</p>
              <p>বার্তা সম্পাদক : {singleFooter?.bartaSompadok}</p>
            </div>
          </div>
          {/* <!-- Useful links section --> */}
          <div className="flex flex-col gap-4">
            <h1 className=" font-semibold underline underline-offset-8">
              Useful links
            </h1>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/about-us" className="hover:underline">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline ">
                  সাইটম্যাপ
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline ">
                  ভিডিও গ্যালারী
                </Link>
              </li>
              <li>
                <Link to="/footer-gallery" className="hover:underline ">
                  ফটোগ্যালারী
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline ">
                  আমাদের পরিবার
                </Link>
              </li>
            </ul>
          </div>
          {/* <!-- Contact section --> */}
          <div className="flex flex-col gap-4">
            <h1 className=" font-semibold underline underline-offset-8">
              অফিস
            </h1>
            <div>
              <p>অফিস : {singleFooter?.officeAddress}</p>
              <p>ইমেইল : {singleFooter?.officeEmail}</p>
              <p>মোবাইল : {singleFooter?.officeMobile}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterArea;
