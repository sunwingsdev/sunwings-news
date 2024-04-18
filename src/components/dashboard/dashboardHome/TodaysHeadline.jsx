import { useGetPostsQuery } from "../../../redux/features/allApis/postApi/postApi";

const TodaysHeadline = () => {
  const perPage = 6;
  const { data: posts, isLoading: postLoading } = useGetPostsQuery({});

  if (postLoading) {
    return (
      <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(perPage)].map((_, i) => (
          <div key={i} className="flex flex-row gap-4">
            <div className="skeleton w-1/2 md:w-32 h-36 md:h-32 rounded-2xl"></div>
            <div className="py-4 flex flex-col gap-3 w-1/2">
              <div className="skeleton h-5 w-56 md:w-36 rounded-2xl"></div>
              <div className="skeleton h-5 w-28 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const slicedPosts = posts?.slice(0, 4);

  return (
    <div className="mt-8 flex flex-col">
      <h1 className="font-serif text-xl mb-4">Today&apos;s Headline</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {slicedPosts?.map((post) => (
          <div
            key={post?._id}
            className=" flex items-start gap-5 rounded-2xl border border-gray-500"
          >
            {postLoading || !post ? (
              <div className="flex flex-row gap-4">
                <div className="skeleton w-1/2 md:w-32 h-36 md:h-32 rounded-2xl"></div>
                <div className="py-4 flex flex-col gap-3 w-1/2">
                  <div className="skeleton h-5 w-56 md:w-36 rounded-2xl"></div>
                  <div className="skeleton h-5 w-28 rounded-2xl"></div>
                </div>
              </div>
            ) : (
              <img
                src={post?.postThumbnail}
                alt="news image"
                className="w-32 h-full rounded-2xl"
              />
            )}

            <div className="py-3">
              <h1 className="text-lg">{post?.postTitle}</h1>
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

export default TodaysHeadline;
