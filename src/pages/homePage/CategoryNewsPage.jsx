import SinglePageLeft from "../../components/homePage/SinglePageLeft";
import CategoryTitle from "../../components/shared/CategoryTitle";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import moment from "moment";
import { useState } from "react";
import { useGetBodyThemeQuery } from "../../redux/features/allApis/bodyThemeApi/bodyThemeApi";
import { MdAccessTime } from "react-icons/md";

const CategoryNewsPage = () => {
  const { category } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];

  const { data: posts, error, isLoading } = useGetPostsQuery({ category });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="flex items-center justify-center text-xl">
        {error.data.message}
      </div>
    );
  }

  const timeAgo = (timestamp) => {
    const currentTime = moment();
    const postTime = moment(timestamp);
    const duration = moment.duration(currentTime.diff(postTime));

    if (duration.asSeconds() < 60) {
      return "a few seconds ago";
    } else if (duration.asMinutes() < 60) {
      return Math.floor(duration.asMinutes()) + " minutes ago";
    } else if (duration.asHours() < 24) {
      return Math.floor(duration.asHours()) + " hours ago";
    } else if (duration.asDays() < 2) {
      return "a day ago";
    } else if (duration.asDays() < 7) {
      return Math.floor(duration.asDays()) + " days ago";
    } else if (duration.asWeeks() < 4) {
      return Math.floor(duration.asWeeks()) + " weeks ago";
    } else if (duration.asMonths() < 12) {
      return Math.floor(duration.asMonths()) + " months ago";
    } else {
      return Math.floor(duration.asYears()) + " years ago";
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const textStyle = {
    fontSize: `${singleTheme?.newscardTitleFontSize}px`,
    color: isHovered ? "#0077cc" : singleTheme?.newscardTitleFontColor,
    transition: "color 0.3s", // Add transition for smooth color change
  };

  const cardStyle = {
    borderWidth: `${singleTheme?.newsCardBorderWidth}px`,
    borderStyle: singleTheme?.newsCardBorderStyle,
    borderColor: singleTheme?.newsCardBorderColor,
    backgroundColor: singleTheme?.newsCardBg,
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 container mx-auto">
      <Helmet>
        <title>Sunwings | Category News</title>
      </Helmet>
      {/* Render your component with data here */}
      <div className="grid md:grid-cols-3 grid-cols-2 grid-rows-4 gap-3 w-3/4">
        {posts?.map((post) => (
          <div
            key={post?._id}
            className="h-fit"
            style={
              singleTheme?.isNewsCardBorderd == "yes"
                ? cardStyle
                : { backgroundColor: singleTheme?.newsCardBg }
            }
          >
            <img
              src={post?.postThumbnail}
              alt=""
              className="h-36 md:h-44 max-h-48 w-full"
            />
            <div className="p-2">
              <Link to={`/posts/${post._id}`}>
                <p
                  className="text-base font-medium"
                  style={textStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {post?.postTitle}
                </p>
              </Link>
              <p className="flex items-center border-l-2 border-orange-500 gap-1 mt-2">
                <MdAccessTime className="text-orange-500 ml-2" />
                <span>{timeAgo(post?.publishDate)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/4">
        <CategoryTitle title={"সর্বশেষ সংবাদ"} />
        <SinglePageLeft />
      </div>
    </div>
  );
};

export default CategoryNewsPage;
