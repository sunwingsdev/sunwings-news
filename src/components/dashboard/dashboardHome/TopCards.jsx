import { IoMdListBox } from "react-icons/io";
import { useGetPostsQuery } from "../../../redux/features/allApis/postApi/postApi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useGetAllCommentsQuery } from "../../../redux/features/allApis/commentApi/commentApi";
import { useGetCategoriesQuery } from "../../../redux/features/allApis/categoryApi/categoryApi";
import { AiOutlineSend } from "react-icons/ai";
import {
  useAddIsOpenedMutation,
  useAddNoticeMutation,
  useGetGetNoticeQuery,
} from "../../../redux/features/allApis/noticeApi/noticeApi";
import toast from "react-hot-toast";
import { FcAdvertising } from "react-icons/fc";
import { useGetUserByUidQuery } from "../../../redux/features/allApis/usersApi/usersApi";
import { GrTextWrap } from "react-icons/gr";
import { MdCircleNotifications } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";

const TopCards = () => {
  const { user } = useContext(AuthContext);
  const [addNotice] = useAddNoticeMutation();
  const { data: lastNotice, isLoading: noticeLoading } = useGetGetNoticeQuery();
  const { data: allPosts, isLoading: postLoading } = useGetPostsQuery({});
  const [addIsOpened] = useAddIsOpenedMutation();
  const { data: allComments, isLoading: commentLoading } =
    useGetAllCommentsQuery();
  const { data: allCategories, isLoading: categoryLoading } =
    useGetCategoriesQuery({});
  const { data: loggedUser } = useGetUserByUidQuery(user.uid);

  const authorName = user?.displayName;
  const userSpecificPosts = allPosts?.filter(
    (post) => post?.author === authorName
  );

  const isOpenedEmail =
    lastNotice && lastNotice.length > 0
      ? lastNotice[0]?.isOpened.filter((item) => item === user.email)
      : [];

  let yourValue = 0;
  if (isOpenedEmail?.length === 0) {
    yourValue = 1;
  }

  const handleModalClicked = async () => {
    document.getElementById("my_modal_3").showModal();
    // handle open
    if (loggedUser?.role !== "administrator") {
      try {
        const result = await addIsOpened(user?.email);
        console.log(result.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // handle notice submit
  const handleSubmitNotice = async (e) => {
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const details = form.details.value;
    const createdAt = new Date();
    const isOpened = [];
    const notice = { subject, details, createdAt, isOpened };
    if (notice) {
      try {
        const result = await addNotice(notice);
        if (result.data.insertedId) {
          toast.success("Notice sent successfully");
          form.subject.value = "";
          form.details.value = "";
          document.getElementById("my_modal_3").close();
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (noticeLoading || postLoading || commentLoading || categoryLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-10">
      <div className="flex flex-row items-center justify-between border p-4 border-l-[12px] border-l-orange-500 hover:bg-gray-100 shadow-md">
        <div>
          <h1 className="text-2xl font-sans font-bold">
            {postLoading ? (
              <p className="font-normal">
                <span className="loading loading-spinner loading-sm"></span>
              </p>
            ) : (
              allPosts?.length || 0
            )}
          </h1>
          <Link to="/dashboard/all-posts">
            <p className="text-base hover:text-blue-600 hover:underline">
              All Posts
            </p>
          </Link>
        </div>
        <IoMdListBox className="text-3xl text-gray-700" />
      </div>

      <div className="flex flex-row items-center justify-between border p-4 border-l-[12px] border-l-orange-500 hover:bg-gray-100 shadow-md">
        <div>
          <h1 className="text-2xl font-sans font-bold">
            {postLoading ? (
              <p className="font-normal">
                <span className="loading loading-spinner loading-sm"></span>
              </p>
            ) : (
              userSpecificPosts?.length || 0
            )}
          </h1>
          <p className="text-base">My All Posts</p>
        </div>
        <IoMdListBox className="text-3xl text-gray-700" />
      </div>

      <div className="flex flex-row items-center justify-between border p-4 border-l-[12px] border-l-orange-500 hover:bg-gray-100 shadow-md">
        <div>
          <h1 className="text-2xl">0</h1>
          <p className="text-base">My All Ads</p>
        </div>
        <GrTextWrap className="text-2xl text-gray-700" />
      </div>

      <div
        onClick={handleModalClicked}
        className="relative flex flex-row items-center justify-between border border-l-orange-500 p-4 cursor-pointer border-l-[12px] hover:bg-gray-100 shadow-md"
      >
        {yourValue == 1 && loggedUser?.role !== "administrator" && (
          <div
            className={`absolute -top-2 -right-2 size-5 bg-red-600 rounded-full ${
              yourValue > 0 ? "animate-ping" : ""
            }`}
          >
            <p className="text-center text-white">
              {yourValue == 1 ? "!!!" : ""}
            </p>
          </div>
        )}

        <div>
          <p className="text-lg font-semibold">
            {loggedUser?.role === "administrator"
              ? "Create A Notice"
              : "Admin Notice"}
          </p>
        </div>
        <MdCircleNotifications className="text-3xl text-gray-700" />

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-white">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </button>
            </form>
            {/* modal contents */}
            <div className="px-3 py-4">
              {loggedUser?.role === "administrator" ? (
                <form onSubmit={handleSubmitNotice}>
                  <label className="input input-bordered flex items-center gap-2 bg-white border-orange-600">
                    <FcAdvertising />
                    <input
                      type="text"
                      name="subject"
                      className="grow bg-white"
                      placeholder="Subject"
                      required
                    />
                  </label>

                  <textarea
                    name="details"
                    className="textarea textarea-bordered w-full my-2 bg-white border-orange-600"
                    placeholder="Details"
                  ></textarea>
                  <div className="items-end">
                    <button
                      type="submit"
                      className="btn btn-info text-white font-normal w-full flex flex-row"
                    >
                      <span>Send</span>
                      <AiOutlineSend size={20} />
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h1 className="text-center text-lg font-bold text-success">
                    {lastNotice[0]?.subject}
                  </h1>
                  <hr />
                  <p className="text-center py-4">{lastNotice[0]?.details}</p>
                </>
              )}
            </div>
          </div>
        </dialog>
      </div>

      <div className="flex flex-row items-center justify-between border p-4 border-l-[12px] border-l-orange-500 hover:bg-gray-100 shadow-md">
        <div>
          <h1 className="text-2xl font-sans font-bold">
            {commentLoading ? (
              <p className="font-normal">
                <span className="loading loading-spinner loading-sm"></span>
              </p>
            ) : (
              allComments?.length || 0
            )}
          </h1>
          <p className="text-base">All Comments</p>
        </div>
        <FaRegCommentDots className="text-3xl text-gray-700" />
      </div>

      <div className="flex flex-row items-center justify-between border p-4 border-l-[12px] border-l-orange-500 hover:bg-gray-100 shadow-md">
        <div>
          <h1 className="text-2xl font-sans font-bold">
            {categoryLoading ? (
              <p className="font-normal">
                <span className="loading loading-spinner loading-sm"></span>
              </p>
            ) : (
              allCategories?.length || 0
            )}
          </h1>
          <p className="text-base">All Categories</p>
        </div>
        <TbCategoryPlus className="text-3xl text-gray-700" />
      </div>
    </div>
  );
};

export default TopCards;
