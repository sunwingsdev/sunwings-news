import { Link, useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SmallNewsCard from "../../components/shared/SmallNewsCard";
import { Helmet } from "react-helmet-async";
import { useGetBodyThemeQuery } from "../../redux/features/allApis/bodyThemeApi/bodyThemeApi";
import { useState } from "react";
import { MdAccessTime } from "react-icons/md";
import moment from "moment";

const SubCategoryNews = () => {
  const { subCategory } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];

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

  const { data: posts, error, isLoading } = useGetPostsQuery({ subCategory });

  const { data: allPosts } = useGetPostsQuery({});
  const popularNews = allPosts?.filter((post) => post.isPopular === true);

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

  const tabList = [
    { label: "সর্বশেষ সংবাদ", value: "" },
    { label: "আলোচিত সংবাদ", value: "" },
  ];

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

  //   console.log(posts);

  return (
    <div className="flex flex-col md:flex-row gap-4 container mx-auto">
      <Helmet>
        <title>Sunwings | Sub Category News</title>
      </Helmet>
      {/* Render your component with data here */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4 md:w-2/3 px-2 md:px-0">
        {posts.length !== 0 &&
          posts?.map((post) => (
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
      <div className="md:w-1/3 text-black text-sm md:text-lg px-2 md:px-0">
        {/* need to change the selected border radius */}
        <Tabs
          defaultFocus={false}
          selectedTabClassName="bg-[#022831] text-white border-[#046279] rounded-none"
        >
          <TabList
            className={
              "flex flex-row justify-center items-center text-[#022831] bg-[#ddd] text-[17px]"
            }
          >
            {tabList.map((tab, i) => (
              <Tab
                className="p-[10px] w-full flex items-center justify-center border-t-[3px] border-solid border-[#022940] rounded-none cursor-pointer"
                key={i}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
          <div className="h-96">
            <div className="h-80 overflow-y-scroll">
              <TabPanel className={"space-y-2"}>
                {allPosts?.map((post, i) => (
                  <SmallNewsCard post={post} key={i} />
                ))}
              </TabPanel>
              <TabPanel>
                {popularNews?.map((post, i) => (
                  <SmallNewsCard post={post} key={i} />
                ))}
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SubCategoryNews;
