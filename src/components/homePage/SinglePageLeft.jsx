import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";
import { useGetBodyThemeQuery } from "../../redux/features/allApis/bodyThemeApi/bodyThemeApi";

const SinglePageLeft = () => {
  const { data, isLoading } = useGetPostsQuery("");
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];
  const posts = data?.filter((post) => post?.status === "published");
  const slicedPosts = posts?.slice(0, 4);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 my-3">
      {slicedPosts?.map((post) => (
        <div
          key={post?._id}
          className="p-4 rounded shadow-sm"
          style={{ backgroundColor: singleTheme?.latestNewsCardBg }}
        >
          <img src={post?.postThumbnail} alt={post?.postTitle} />
          <Link to={`/posts/${post._id}`}>
            <p
              className="px-2 py-1 pb-2"
              style={{
                color: singleTheme?.latestNewsCardFontColor,
                fontSize: `${singleTheme?.latestNewsCardFontSize}px`,
              }}
            >
              {post?.postTitle}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SinglePageLeft;
