import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../api/utils";
import { useUploadAPhotoMutation } from "../../../../redux/features/allApis/photoGalleryApi/photoGalleryApi";
import toast from "react-hot-toast";
import { useState } from "react";

const PhotoGalleryUpload = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [uploadPhoto] = useUploadAPhotoMutation();

  const now = new Date();

  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.photo[0];
    try {
      const imageData = await imageUpload(image);
      data.photo = imageData.data.display_url;
      data.createdAt = now;
      const response = await uploadPhoto(data);

      if (response.data.insertedId) {
        toast.success("Image Upload Successfully!");
        setLoading(false);
        reset();
      } else {
        toast.error("Image Upload Failed!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(`Error Uploading Image ${error.message}`);
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-col lg:flex-row items-start md:items-start lg:items-end justify-evenly gap-4 px-5 py-3 w-full "
      >
        <div className="form-control w-full md:w-full lg:w-1/3">
          <label
            htmlFor="title"
            className="text-lg text-black flex flex-row items-baseline gap-2"
          >
            Image Title:{" "}
            {errors.title && (
              <p className="text-red-600 text-sm">Title is Required. **</p>
            )}
          </label>
          <input
            type="text"
            name="title"
            {...register("title", { required: true })}
            placeholder="Type image title..."
            className="px-2 py-2.5 bg-white border border-gray-400 w-full "
          />
        </div>

        <div className="form-control w-full md:w-full lg:w-1/3">
          <label
            htmlFor="photo"
            className="text-lg text-black flex flex-row items-baseline gap-2"
          >
            Image:{" "}
            {errors.photo && (
              <p className="text-red-600 text-sm">Image is Required. **</p>
            )}
          </label>
          <input
            type="file"
            name="photo"
            {...register("photo", { required: true })}
            className="px-2 py-2 bg-white border border-gray-400 w-full"
          />
        </div>
        <div className="flex items-center w-full md:w-full lg:w-1/3">
          <button
            type="submit"
            className="bg-orange-600 border border-orange-600 hover:bg-white transition-all ease-in duration-300 py-2 px-4 md:self-start text-lg w-full"
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

export default PhotoGalleryUpload;
