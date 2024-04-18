import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import bannerBg from "../../assets/social-media.webp";
import userProfile from "../../assets/user-square.png";

const SocialShare = ({
  title,
  cardImage,
  profileImage,
  socialUrl,
  shareUrl,
  icon: Icon,
  shareButton: ShareButton,
}) => {
  return (
    <div className="">
      <div className="relative group">
        {cardImage ? (
          <img src={cardImage} alt="banner image" className="h-44" />
        ) : (
          <img src={bannerBg} alt="banner image demo" className="h-44" />
        )}
        <div className="absolute top-0 w-full pl-2 bg-white/30 backdrop-blur-sm">
          <Link
            to={socialUrl}
            target="_blank"
            className="flex items-center gap-2 p-1"
          >
            {profileImage ? (
              <img
                className="size-10 rounded-full"
                src={profileImage}
                alt="profile image"
              />
            ) : (
              <img
                src={userProfile}
                alt="profile image demo"
                className="size-10 rounded-full"
              />
            )}
            <h3 className="cursor-pointer text-black text-base font-semibold hover:underline">
              {title}
            </h3>
          </Link>
        </div>
        <div className="absolute flex justify-around w-full bottom-0 group-hover:bottom-4 transition-all ease-in-out duration-500">
          <Link
            to={socialUrl}
            className="bg-white/30 backdrop-blur-sm flex items-center py-1 px-2 gap-1 font-semibold"
          >
            <Icon className="text-blue-800" />
            <span className="text-black">Follow</span>
          </Link>
          <ShareButton url={shareUrl}>
            <div className="bg-white/30 backdrop-blur-sm flex items-center py-1 px-2 text-black gap-1 font-semibold">
              <FaShare />
              <span>share</span>
            </div>
          </ShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
