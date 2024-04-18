import { useState } from "react";
import { useForm } from "react-hook-form";

import { imageUpload } from "../../../../api/utils";
import toast from "react-hot-toast";
import { useUploadAVideoMutation } from "../../../../redux/features/allApis/videoGalleryApi/videoGalleryApi";

const VideoGalleryUpload = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const [uploadVideo] = useUploadAVideoMutation();

  const now = new Date();

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.thumbnail[0];
    try {
      const imageData = await imageUpload(image);
      data.thumbnail = imageData.data.display_url;
      data.createdAt = now;
      const response = await uploadVideo(data);

      if (response.data.insertedId) {
        toast.success("Video Upload Successfully!");
        setLoading(false);
        reset();
      } else {
        toast.error("Video Upload Failed!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(`Error Uploading Video ${error.message}`);
      setLoading(false);
    }
  };

  const selectedCategory = watch("category");

  return (
    <div className="bg-gray-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-col lg:flex-row items-start md:items-start lg:items-end justify-evenly gap-4 px-5 py-3 w-full "
      >
        <div className="form-control w-full md:w-full lg:w-1/5">
          <label
            htmlFor="title"
            className="text-lg text-black flex flex-col items-baseline"
          >
            Video Title:{" "}
            {errors.title && (
              <p className="text-red-600 text-sm">Title is Required. **</p>
            )}
          </label>
          <input
            type="text"
            name="title"
            {...register("title", { required: true })}
            placeholder="Type video title..."
            className="px-2 py-2.5 bg-white border border-gray-400 w-full "
          />
        </div>
        {selectedCategory === "liveTv" ? (
          <div className="form-control w-full md:w-full lg:w-1/5">
            <label
              htmlFor="link"
              className="text-lg text-black flex flex-col items-baseline"
            >
              YouTube Live Tv / Video Link:
              {errors.liveLink && (
                <p className="text-red-600 text-sm">
                  Live Tv / Video Link is Required. **
                </p>
              )}
            </label>
            <input
              type="text"
              name="liveLink"
              {...register("liveLink", { required: true })}
              placeholder="Ex. https://www.youtube.com/live/rv374Afy8G0?si=IqBf5WZ4CzlEXKon"
              className="px-2 py-2 bg-white border border-gray-400 w-full"
            />
          </div>
        ) : (
          <div className="form-control w-full md:w-full lg:w-1/5">
            <label
              htmlFor="link"
              className="text-lg text-black flex flex-col items-baseline"
            >
              YouTube Video Link:{" "}
              {errors.link && (
                <p className="text-red-600 text-sm">
                  Video Link is Required. **
                </p>
              )}
            </label>
            <input
              type="text"
              name="link"
              {...register("link", { required: true })}
              placeholder="Ex. https://youtu.be/-AtfFUeeuIs?si=vhMwkmjn-eYjpdiy"
              className="px-2 py-2 bg-white border border-gray-400 w-full"
            />
          </div>
        )}

        <div className="form-control w-full md:w-full lg:w-1/5">
          <label
            htmlFor="thumbnail"
            className="text-lg text-black flex flex-col items-baseline"
          >
            Video Thumbnail:{" "}
            {errors.thumbnail && (
              <p className="text-red-600 text-sm">Thumbnail is Required. **</p>
            )}
          </label>
          <input
            type="file"
            name="thumbnail"
            {...register("thumbnail", { required: true })}
            className="px-2 py-1.5 bg-white border border-gray-400 w-full "
          />
        </div>

        <div className="form-control w-full md:w-full lg:w-1/5">
          <label
            htmlFor="category"
            className="text-lg text-black flex flex-col items-baseline"
          >
            Video category:
            {errors.category && (
              <p className="text-red-600 text-sm">
                Video Category is Required. **
              </p>
            )}
          </label>
          <select
            name="category"
            {...register("category", { required: true })}
            className="px-2 py-3 bg-white border border-gray-400 w-full"
          >
            <option value="">Select One</option>
            <option value="news">News</option>
            <option value="liveTv">Live Tv</option>
            <option value="entertainment">Entertainment</option>
            <option value="talk-show">Talk Show</option>
          </select>
        </div>

        <div className="flex items-center w-full md:w-full lg:w-1/5">
          <button
            type="submit"
            className="bg-orange-600 border border-orange-600 hover:bg-white transition-all ease-in duration-300 py-1.5 px-4 md:self-start text-lg w-full"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-1">
                <span className="loading loading-spinner loading-md"></span>{" "}
                Uploading...
              </div>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoGalleryUpload;
