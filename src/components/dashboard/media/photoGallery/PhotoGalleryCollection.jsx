import { HiXMark } from "react-icons/hi2";
import {
  useDeletePhotoMutation,
  useUpdatePhotoSelectionMutation,
} from "../../../../redux/features/allApis/photoGalleryApi/photoGalleryApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PhotoGalleryCollection = ({ data }) => {
  const [updatePhotoSelection] = useUpdatePhotoSelectionMutation();
  const [deletePhoto] = useDeletePhotoMutation();

  const handlePhotoClick = async (adId, isChecked) => {
    try {
      // Update isSelected status for the clicked ad
      await updatePhotoSelection({ id: adId, isSelected: isChecked });

      if (isChecked) {
        toast.success("Photo selected successfully!");
      } else {
        toast.success("Photo de-selected successfully!");
      }
    } catch (error) {
      console.error("Error during Photo selection:", error);
      toast.error("Failed to select Photo. Please try again later.");
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
          const result = await deletePhoto({ id: id });
          console.log("result", result);
          if (result.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "This photo has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Failed to delete photo",
            text: `${error}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-black text-2xl mb-5 flex flex-col items-start">
        <span className="leading-5">Photo Gallery Collection</span>{" "}
        <small className="text-sm text-red-600 italic">
          You Need to Select Multiple Images to show them on Home Page Photo
          Gallery. ***
        </small>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-6 lg:px-6 xl:px-6 2xl:px-6">
        {data?.map((photo) => (
          <div key={photo?._id} className="relative">
            <input
              type="checkbox"
              checked={photo.isSelected}
              onChange={(e) => handlePhotoClick(photo?._id, e.target.checked)}
              className="checkbox checkbox-success checkbox-lg absolute top-2 left-2 border-2"
            />
            <div
              onClick={() => handleDelete(photo?._id)}
              className="bg-orange-600 hover:bg-white border-2 border-orange-600 text-white hover:text-orange-600 transition-all ease-in duration-300 w-fit h-fit p-2 rounded-full cursor-pointer absolute -top-4 -right-4"
            >
              <HiXMark className="text-2xl" />
            </div>
            <img src={photo?.photo} alt="Gallery Image" className="w-full" />
            <p className="text-black">{photo?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGalleryCollection;
