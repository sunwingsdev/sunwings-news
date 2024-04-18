import { Link } from "react-router-dom";
import homeSliderImg from "../../assets/1.png";

const SmallNewsCard = ({ post, isLoading }) => {
  // console.log(post);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  // const id = item?._id;
  const postTitle = post?.postTitle;
  const postThumbnail = post?.postThumbnail;
  return (
    <div>
      <div className="flex-none w-full">
        <div className="flex gap-2">
          <div className="w-1/3">
            <img
              src={postThumbnail || homeSliderImg}
              alt=""
              className="max-h-24 md:max-h-16 w-full"
            />
          </div>
          <Link to={`/posts/${post._id}`} className="text-base w-2/3">
            <p className="text-black font-medium hover:text-blue-500">
              {postTitle}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallNewsCard;
