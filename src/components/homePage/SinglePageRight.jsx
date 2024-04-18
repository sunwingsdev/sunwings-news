import { useGetBodyThemeQuery } from "../../redux/features/allApis/bodyThemeApi/bodyThemeApi";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";
import { Link } from "react-router-dom";

const SinglePageRight = () => {
  const { data: posts, isLoading } = useGetPostsQuery({});
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];
  const filteredPosts = posts?.filter((post) => post?.isPopular === true);
  const popularPosts = filteredPosts?.slice(0, 5);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 my-3">
      {popularPosts?.map((post) => (
        <div
          key={post?._id}
          className=""
          style={{ backgroundColor: singleTheme?.popularNewsCardBg }}
        >
          <img className="" src={post?.postThumbnail} alt="" />
          <Link to={`/posts/${post._id}`}>
            <p
              className="px-2 py-1 pb-2"
              style={{
                fontSize: `${singleTheme?.popularNewsCardFontSize}px`,
                color: singleTheme?.popularNewsCardFontColor,
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

export default SinglePageRight;
