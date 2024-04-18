import NewsCard from "../../components/homePage/NewsCard";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";

const SearchedNewspage = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery({});
  const perPage = 6;
  // get item from local storage
  const search = localStorage.getItem("search");
  //   filtered search posts
  const filteredSearchPosts = posts?.filter((post) =>
    post.postTitle.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className={`py-2 ${filteredSearchPosts.length !==0?'grid grid-cols-2 md:grid-cols-3 gap-6':''}`}>
        {filteredSearchPosts.length !== 0 ? (
          filteredSearchPosts.map((post, i) => (
            <NewsCard
              key={i}
              post={post}
              isLoading={isLoading}
              error={isError}
            />
          ))
        ) : (
          <div className="text-lg font-medium md:text-2xl flex justify-center items-center min-h-96">No News available</div>
        )}
      </div>
    </div>
  );
};

export default SearchedNewspage;
