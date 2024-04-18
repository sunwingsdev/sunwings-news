import { useForm } from "react-hook-form";
import { useState } from "react";
import { imageUpload } from "../../../../api/utils";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  useGetAllInstagramQuery,
  useUpdateInstagramMutation,
} from "../../../../redux/features/allApis/socialMediaApi/instagramApi";
import img1 from "../../../../assets/1.png";
import logo from "../../../../assets/user-square.png";

const Instagram = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();

  const { data: allInstagram } = useGetAllInstagramQuery();
  const [updateInstagram] = useUpdateInstagramMutation();
  const id = allInstagram?.[0]._id;
  const singleInstagram = allInstagram?.[0];
  const onSubmit = async (data) => {
    const profileImage = watch("profilePhoto");
    const coverImage = watch("coverPhoto");
    try {
      setLoading(true);
      const imageData1 = await imageUpload(profileImage[0]);
      const imageData2 = await imageUpload(coverImage[0]);
      data.profilePhoto = imageData1.data.display_url;
      data.coverPhoto = imageData2.data.display_url;
      const result = await updateInstagram({
        id: id,
        data: data,
      });
      if (result.data.modifiedCount > 0) {
        setLoading(false);
        reset();
        Swal.fire({
          title: "Instagram Updated Successfully!",
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
        title: `Error Updating Instagram: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <h1 className="text-black text-xl mb-2">Instagram</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 md:w-1/2"
        >
          <div className="form-control">
            <label htmlFor="title" className="text-black mb-2 text-lg">
              Instagram Id Title:
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
            <label htmlFor="link" className="text-black mb-2 text-lg">
              Id Link:
            </label>
            <input
              type="text"
              name="link"
              {...register("link")}
              className="bg-white border border-gray-400 px-3 py-2 text-black"
              placeholder="Enter Link..."
            />
          </div>

          <div className="form-control">
            <label htmlFor="profilePhoto" className="text-black mb-2 text-lg">
              Profile Photo:
            </label>
            <input
              type="file"
              name="profilePhoto"
              {...register("profilePhoto")}
              className="bg-white border border-gray-400 px-3 py-2 text-black"
            />
          </div>

          <div className="form-control">
            <label htmlFor="coverPhoto" className="text-black mb-2 text-lg">
              Cover Photo:
            </label>
            <input
              type="file"
              name="coverPhoto"
              {...register("coverPhoto")}
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
              "Update Instagram"
            )}
          </button>
        </form>
        {singleInstagram && (
          <div className="bg-gray-200 w-full md:w-[50%] xl:w-[40%]">
            <div className="relative pb-14">
              <img
                className="w-full h-52"
                src={
                  singleInstagram?.coverPhoto
                    ? singleInstagram?.coverPhoto
                    : img1
                }
                alt="Cover Photo"
              />
              <img
                className="w-32 absolute top-1/1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 rounded-full"
                src={
                  singleInstagram?.profilePhoto
                    ? singleInstagram?.profilePhoto
                    : logo
                }
                alt="Profile Photo"
              />
            </div>
            <h1 className="text-xl mt-4 px-6">{singleInstagram?.title}</h1>
            <Link to={singleInstagram?.link} className="text-blue-600">
              <h2 className="text-base px-6">{singleInstagram?.link}</h2>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instagram;
