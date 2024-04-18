import { useState } from "react";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";
import CategoryTitle from "../shared/CategoryTitle";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";
import { HiChevronDoubleRight } from "react-icons/hi2";

const EntertainmentSection = () => {
  const { data, isLoading } = useGetPostsQuery({ category: "বিনোদন" });
  const [showFullContent, setShowFullContent] = useState(false);
  const posts = data?.filter((post) => post.status === "published");
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Function to toggle showing full content
  const handleToggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  // Render only the first 150 words if showFullContent is false
  const renderContent = showFullContent
    ? posts[0].quill
    : posts[0].quill
        .split(" ")
        .slice(0, 150)
        .join(" ")
        .replace(
          /<img/g,
          '<img style="max-width:100%;width:100%;height:auto;"'
        );

  const newArray = posts?.slice(1, 5);

  return (
    <div className="">
      <CategoryTitle title="বিনোদন" />
      <div className="flex gap-4 flex-col md:flex-row my-2">
        {/* Render the main content */}
        <div className="md:w-4/6 w-full">
          {/* Check if posts exist */}
          {posts && posts.length > 0 && (
            <>
              {/* Render content using dangerouslySetInnerHTML */}
              <p
                dangerouslySetInnerHTML={{ __html: renderContent }}
                className="text-black max-w-full text-justify"
              ></p>
              {/* Render the "Details" button */}
              {posts[0].quill.length > 150 && (
                <button
                  className="text-blue-500 mt-2 underline"
                  onClick={handleToggleContent}
                >
                  {showFullContent ? "কম প্রদর্শন" : "বিস্তারিত"}
                </button>
              )}
            </>
          )}
        </div>
        {/* Render two more NewsCard components */}
        <div className="w-full md:w-2/6">
          <div className="grid grid-cols-2 gap-4">
            {newArray?.map((post, i) => (
              <NewsCard key={i} post={post} />
            ))}
          </div>
          <Link to={`/category/বিনোদন`}>
            <button className="flex mx-auto justify-center items-center gap-1  text-black cursor-pointer underline hover:text-blue-600 py-2 px-4 rounded mt-4">
              আরো খবর
              <HiChevronDoubleRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentSection;
