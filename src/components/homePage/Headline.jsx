import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../../redux/features/allApis/postApi/postApi";
import { useGetBodyThemeQuery } from "../../redux/features/allApis/bodyThemeApi/bodyThemeApi";

const Headline = () => {
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];
  const { data, isLoading } = useGetPostsQuery({});
  const posts = data?.filter((post) => post.status === "published");
  if (!isLoading) {
    const slicedPosts = posts?.slice(0, 4);
    return (
      <div
        className="flex flex-row justify-center items-center py-1"
        style={{ color: singleTheme?.marqueTitleFontColor }}
      >
        {slicedPosts?.map((post, i) => (
          <Link to={`/posts/${post._id}`} key={i}>
            <p
              className="hover:text-blue-500 hover:cursor-pointer hover:underline mx-10"
              style={{ fontSize: `${singleTheme?.marqueTitleFontSize}px` }}
            >
              {post?.postTitle}
            </p>
          </Link>
        ))}
      </div>
    );
  }
};

export default Headline;
