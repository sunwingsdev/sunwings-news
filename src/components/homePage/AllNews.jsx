import { useState } from "react";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";
import NewsCard from "./NewsCard";
import { HiChevronDoubleRight } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useGetBodyThemeQuery } from "../../redux/features/allApis/bodyThemeApi/bodyThemeApi";

const AllNews = ({ date }) => {
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];
  const { data, isLoading, isError } = useGetPostsQuery({});
  const [showCount, setShowCount] = useState(6); // Initial count to show
  const perPage = 6; // Number of posts to show per click

  const posts = data?.filter((post) => post?.status === "published");
  // filter post by date
  const filteredPosts = posts?.filter(
    (post) => post.publishDate.split("T").slice(0, 1).join() === date
  );

  let visiblePosts =
    filteredPosts?.length !== 0
      ? filteredPosts?.slice(0, showCount)
      : posts?.slice(0, showCount);

  if (filteredPosts?.length === 0 && date) {
    visiblePosts = [...posts];
    toast.error("No news has been posted in this date");
  }

  // Function to increment showCount by perPage
  const handleShowMore = () => {
    setShowCount(showCount + perPage);
  };

  if (isError) {
    return <div>Fetching error occurred.</div>;
  }

  if (isLoading) {
    return (
      <div className="py-6 grid grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(perPage)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4 w-52">
            <div className="skeleton h-48 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="py-6 grid grid-cols-2 md:grid-cols-3 gap-6">
        {visiblePosts.length !== 0 ? (
          visiblePosts.map((post, i) => (
            <NewsCard
              key={i}
              post={post}
              isLoading={isLoading}
              error={isError}
            />
          ))
        ) : (
          <div className="text-lg md:text-2xl">No News available</div>
        )}
      </div>
      {/* Show More button */}
      {posts && showCount < posts.length && (
        <button
          onClick={handleShowMore}
          className="flex mx-auto justify-center items-center gap-1  text-black cursor-pointer underline hover:text-blue-600 py-2 px-4 rounded mt-4"
          style={{
            fontSize: `${singleTheme?.moreNewsTitleFontSize}px`,
            color: singleTheme?.moreNewsTitleFontColor,
          }}
        >
          আরো খবর
          <HiChevronDoubleRight />
        </button>
      )}
    </div>
  );
};

export default AllNews;
