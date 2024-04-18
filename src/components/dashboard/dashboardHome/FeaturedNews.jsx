import { useGetPostsQuery } from "../../../redux/features/allApis/postApi/postApi";

const FeaturedNews = () => {
  const perPage = 6;
  const { data: posts, isLoading: loading } = useGetPostsQuery({});

  if (loading) {
    return (
      <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(perPage)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="skeleton w-full md:w-56 h-80 md:h-36 rounded-2xl"></div>
            <div className="py-4 flex flex-col gap-3">
              <div className="skeleton h-5 w-96 md:w-36 rounded-2xl"></div>
              <div className="skeleton h-5 w-48 md:w-28 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const popularNews = posts?.filter((post) => post.isPopular === true);
  
  return (
    <div className="mt-8 flex flex-col">
      <h1 className="font-serif text-xl mb-4">Featured News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {popularNews?.map((pNews) => (
          <div
            key={pNews?._id}
            className="bg-gray-300 flex flex-col items-start rounded-t-2xl"
          >
            {loading || !pNews ? (
              <div className="flex flex-col gap-2">
                <div className="skeleton w-full md:w-56 h-80 md:h-36 rounded-2xl"></div>
                <div className="py-4 flex flex-col gap-3">
                  <div className="skeleton h-5 w-96 md:w-36 rounded-2xl"></div>
                  <div className="skeleton h-5 w-48 md:w-28 rounded-2xl"></div>
                </div>
              </div>
            ) : (
              <img
                src={pNews?.postThumbnail}
                alt="news image"
                className="w-full rounded-2xl"
              />
            )}

            <div className="p-3">
              <h1 className="text-lg">{pNews?.postTitle}</h1>
              {/* If you want to add something, you can do here */}
            </div>
          </div>
        ))}
      </div>
      <div className="self-end mt-4">
        <h1 className="text-lg">See All...</h1>
      </div>
    </div>
  );
};

export default FeaturedNews;
