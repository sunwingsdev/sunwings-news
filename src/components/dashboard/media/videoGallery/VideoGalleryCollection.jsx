import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  useDeleteVideoMutation,
  useUpdateVideoSelectionMutation,
} from "../../../../redux/features/allApis/videoGalleryApi/videoGalleryApi";
import { useState } from "react";
import VideoContent from "./VideoContent";

const VideoGalleryCollection = ({ data }) => {
  const [clickedVideo, setClickedVideo] = useState(null);
  const [updateVideoSelection] = useUpdateVideoSelectionMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const handleVideo = async (vid) => {
    setClickedVideo(vid);
    document.getElementById("my_modal_3").showModal();
  };
  const handleVideoClick = async (adId, isChecked) => {
    try {
      //   Update isSelected status for the clicked video
      await updateVideoSelection({ id: adId, isSelected: isChecked });

      if (isChecked) {
        toast.success("Video selected successfully!");
      } else {
        toast.success("Video de-selected successfully!");
      }
    } catch (error) {
      console.error("Error during Video selection:", error);
      toast.error("Failed to select Video. Please try again later.");
    }
  };

  const handleLiveTvVideoClick = async (adId, isChecked) => {
    try {
      // Deselect all other Live TV videos before selecting the clicked video
      liveTvData.forEach(async (video) => {
        if (video._id !== adId && video.isSelected) {
          await updateVideoSelection({ id: video._id, isSelected: false });
        }
      });

      // Update isSelected status for the clicked video
      await updateVideoSelection({ id: adId, isSelected: isChecked });

      if (isChecked) {
        toast.success("Video selected successfully!");
      } else {
        toast.success("Video de-selected successfully!");
      }
    } catch (error) {
      console.error("Error during Video selection:", error);
      toast.error("Failed to select Video. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteVideo({ id: id });

          if (result.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "This Video has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Failed to delete Video",
            text: `${error}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const liveTvData = data?.filter((video) => video.category === "liveTv");
  const newsData = data?.filter((video) => video.category === "news");
  const entertainmentData = data?.filter(
    (video) => video.category === "entertainment"
  );
  const talkShowData = data?.filter((video) => video.category === "talk-show");

  // Function to close the modal

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-black text-2xl mb-5">
          <span className="leading-5">Video Gallery Collection</span>{" "}
        </h1>

        <div className="flex flex-col gap-10">
          <VideoContent
            categoryName="Live Tv"
            data={liveTvData}
            handleVideo={handleVideo}
            handleVideoClick={handleLiveTvVideoClick}
            handleDelete={handleDelete}
          />
          <VideoContent
            categoryName="News"
            data={newsData}
            handleVideo={handleVideo}
            handleVideoClick={handleVideoClick}
            handleDelete={handleDelete}
          />
          <VideoContent
            categoryName="Entertainment"
            data={entertainmentData}
            handleVideo={handleVideo}
            handleVideoClick={handleVideoClick}
            handleDelete={handleDelete}
          />
          <VideoContent
            categoryName="Talk Show"
            data={talkShowData}
            handleVideo={handleVideo}
            handleVideoClick={handleVideoClick}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-[98%] md:w-7/12 lg:w-7/12 xl:w-7/12 2xl:w-7/12 max-w-5xl bg-gray-300">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle bg-orange-600 absolute right-2 top-2 text-white border-0">
              ✕
            </button>
          </form>
          {/* modal content  */}
          <div>
            {clickedVideo?.category !== "liveTv" ? (
              <iframe
                src={clickedVideo?.link.replace(
                  "https://youtu.be/",
                  "https://www.youtube.com/embed/"
                )}
                frameBorder="0"
                className="w-full h-96"
              ></iframe>
            ) : (
              <iframe
                src={clickedVideo?.liveLink.replace(
                  "https://www.youtube.com/live/",
                  "https://www.youtube.com/embed/"
                )}
                frameBorder="0"
                className="w-full h-96"
              ></iframe>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default VideoGalleryCollection;
