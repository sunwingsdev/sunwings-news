import toast from "react-hot-toast";
import {
  useAddCommentMutation,
  useGetCommentByIdQuery,
} from "../../redux/features/allApis/commentApi/commentApi";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import moment from "moment";

const CommentSection = ({ newsId, newsTitle }) => {
  const { user } = useContext(AuthContext);
  const [addComment] = useAddCommentMutation();
  const { data: comments } = useGetCommentByIdQuery(newsId);

  const [sortBy, setSortBy] = useState("newest"); // State to track sorting option

  // Function to sort comments based on selected option
  const sortedComments = () => {
    if (!comments) {
      return []; // Return an empty array if comments is undefined or null
    }

    if (sortBy === "oldest") {
      return [...comments].sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "newest") {
      return [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      return comments;
    }
  };

  //   add comment to server
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const commentInfo = {
      newsId: newsId,
      newsTitle: newsTitle,
      name: user?.displayName || "anonymous",
      image: user?.photoURL || "",
      email: user?.email || "",
      comment: comment,
      date: new Date(),
    };
    addComment(commentInfo)
      .then((result) => {
        if (result.data.insertedId) {
          toast.success("Comment added");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  //   time ago function
  const timeAgo = (timestamp) => {
    const currentTime = moment();
    const postTime = moment(timestamp);
    const duration = moment.duration(currentTime.diff(postTime));

    if (duration.asSeconds() < 60) {
      return "a few seconds ago";
    } else if (duration.asMinutes() < 60) {
      return Math.floor(duration.asMinutes()) + " minutes ago";
    } else if (duration.asHours() < 24) {
      return Math.floor(duration.asHours()) + " hours ago";
    } else if (duration.asDays() < 2) {
      return "a day ago";
    } else if (duration.asDays() < 7) {
      return Math.floor(duration.asDays()) + " days ago";
    } else if (duration.asWeeks() < 4) {
      return Math.floor(duration.asWeeks()) + " weeks ago";
    } else if (duration.asMonths() < 12) {
      return Math.floor(duration.asMonths()) + " months ago";
    } else {
      return Math.floor(duration.asYears()) + " years ago";
    }
  };

  //
  return (
    <div className="w-full">
      <p className="py-4 text-xl">কমেন্ট বক্স </p>
      <hr />
      <div className="flex flex-row justify-between items-center py-4">
        <p className="text-lg">{comments?.length} comments</p>
        <div className="text-lg">
          <label className="pe-2">Sort by:</label>
          <select
            className="capitalize px-3 py-2 space-y-2"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">newest</option>
            <option value="oldest">oldest</option>
          </select>
        </div>
      </div>
      <hr />
      <div className="py-4">
        {comments?.length !== 0 ? (
          sortedComments().map((comment) => (
            <div key={comment?._id} className="flex items-start mb-4">
              <img
                src={comment?.image || "https://placehold.co/80x75"}
                alt="Author Avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="flex items-center mb-2">
                  <strong className="mr-2 capitalize">{comment?.name}</strong>
                  <span className="text-gray-500">
                    {timeAgo(comment?.date)}
                  </span>
                </div>
                <p>{comment?.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-lg text-center">No comments</div>
        )}
      </div>
      <div className="flex flex-row justify-between items-start gap-3 py-2">
        <img
          src={user?.photoURL || "https://placehold.co/80x75"}
          alt=""
          className="w-1/12 rounded-full"
        />
        <form
          onSubmit={handleCommentSubmit}
          className="w-11/12 flex flex-col gap-2 items-end justify-center"
        >
          <textarea
            name="comment"
            id=""
            className="w-full  px-3 py-4 border border-gray-400"
            placeholder="Add a comment"
          />
          <button
            type="submit"
            className="bg-orange-400 text-white inline-block py-2 px-4"
          >
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
