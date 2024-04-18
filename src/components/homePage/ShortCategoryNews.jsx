import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";
import CategoryTitle from "../shared/CategoryTitle";
import SmallNewsCard from "../shared/SmallNewsCard";
import { HiChevronDoubleRight } from "react-icons/hi2";

const ShortCategoryNews = () => {
  const { data, isLoading, isError } = useGetPostsQuery({
    category: "রাজনীতি",
  });
  const posts = data?.filter((post) => post.status === "published").slice(0, 4);
  // Handling loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handling error state
  if (isError) {
    return <div>Error occurred while fetching posts.</div>;
  }

  return (
    <div className="flex-none lg:w-1/4 w-full text-black">
      <CategoryTitle title={"রাজনীতি"} />
      <div className="grid md:grid-cols-2 lg:grid-cols-1 md:gap-4 gap-2">
        {posts?.map((post, i) => (
          <SmallNewsCard key={i} post={post} isLoading={isLoading} />
        ))}
      </div>
      <Link to={`/category/রাজনীতি`}>
        <button
          // onClick={handleShowMore}
          className="flex mx-auto justify-center items-center gap-1  text-black cursor-pointer underline hover:text-blue-600 py-2 px-4 rounded mt-4"
        >
          আরো খবর
          <HiChevronDoubleRight />
        </button>
      </Link>
    </div>
  );
};

export default ShortCategoryNews;
