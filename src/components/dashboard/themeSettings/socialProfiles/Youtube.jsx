import { useForm } from "react-hook-form";
import { useState } from "react";
import { imageUpload } from "../../../../api/utils";
import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
import {
  useGetAllYoutubeQuery,
  useUpdateYoutubeMutation,
} from "../../../../redux/features/allApis/socialMediaApi/youtubeApi";

const Youtube = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();

  const { data: allYoutube } = useGetAllYoutubeQuery();
  const [updateYoutube] = useUpdateYoutubeMutation();
  const id = allYoutube?.[0]._id;
  const singleYoutube = allYoutube?.[0];
  const onSubmit = async (data) => {
    const thumbnailImage = watch("thumbnail");
    try {
      setLoading(true);
      const imageData = await imageUpload(thumbnailImage[0]);

      data.thumbnail = imageData.data.display_url;

      const result = await updateYoutube({
        id: id,
        data: data,
      });
      if (result.data.modifiedCount > 0) {
        setLoading(false);
        reset();
        Swal.fire({
          title: "Youtube Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error Updating Youtube: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <h1 className="text-black text-xl mb-2">Youtube</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 md:w-1/2"
        >
          <div className="form-control">
            <label htmlFor="title" className="text-black mb-2 text-lg">
              Youtube Channel Title:
            </label>
            <input
              type="text"
              name="title"
              {...register("title")}
              className="bg-white border border-gray-400 px-3 py-2 text-black"
              placeholder="Enter Title..."
            />
          </div>
          <div className="form-control">
            <label htmlFor="videoTitle" className="text-black mb-2 text-lg">
              Video Title:
            </label>
            <input
              type="text"
              name="videoTitle"
              {...register("videoTitle")}
              className="bg-white border border-gray-400 px-3 py-2 text-black"
              placeholder="Enter Video Title..."
            />
          </div>

          <div className="form-control">
            <label htmlFor="embedLink" className="text-black mb-2 text-lg">
              Video Embed Link:
            </label>
            <input
              type="text"
              name="embedLink"
              {...register("embedLink")}
              className="bg-white border border-gray-400 px-3 py-2 text-black"
              placeholder="Enter Embed Link..."
            />
          </div>

          <div className="form-control">
            <label htmlFor="channelLink" className="text-black mb-2 text-lg">
              Channel Link:
            </label>
            <input
              type="text"
              name="channelLink"
              {...register("channelLink")}
              className="bg-white border border-gray-400 px-3 py-2 text-black"
              placeholder="Enter Youtube Channel Link..."
            />
          </div>

          <div className="form-control">
            <label htmlFor="thumbnail" className="text-black mb-2 text-lg">
              Thumbnail Photo:
            </label>
            <input
              type="file"
              name="thumbnail"
              {...register("thumbnail")}
              className="bg-white border border-gray-400 px-3 py-2 text-black"
            />
          </div>

          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 text-white font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-1">
                <span className="loading loading-spinner loading-md"></span>{" "}
                Updating...
              </div>
            ) : (
              "Update Youtube"
            )}
          </button>
        </form>
        {singleYoutube && (
          <div className="md:w-1/2 h-fit flex flex-col gap-3 border border-gray-500">
            <div className="relative">
              <iframe
                src="https://www.youtube.com/embed/NgrljB7UU34?si=a3TEPOJILUy3OKV2"
                frameBorder="0"
                className="w-full h-96"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Youtube;
