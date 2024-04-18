import { FaXmark } from "react-icons/fa6";
import {
  useDeleteALogoMutation,
  useUpdateLogoSelectionMutation,
} from "../../../../redux/features/allApis/logoApi/logoApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const LogoCollection = ({ data }) => {
  const [updateLogoSelection] = useUpdateLogoSelectionMutation();
  const [deleteLogo] = useDeleteALogoMutation();

  const handleLogoClick = async (logoId) => {
    try {
      const selectedLogo = data.find((logo) => logo._id === logoId);
      if (!selectedLogo) return;

      // Update isSelected status for the selected logo
      await updateLogoSelection({ id: logoId, isSelected: true });

      // Update isSelected status for all other logos filtered by position desktop_logo
      for (const logo of data) {
        if (logo.position === "desktop_logo" && logo._id !== logoId) {
          await updateLogoSelection({ id: logo._id, isSelected: false });
        }
      }

      toast.success("Logo updated successfully!");
    } catch (error) {
      console.error("Error updating logo selection:", error);
      toast.error("Failed to update logo selection. Please try again later.");
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
          const result = await deleteLogo({ id: id });

          if (result.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "This Logo has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Failed to delete Logo",
            text: `${error}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 place-items-center gap-4">
        {data?.map((logo) => (
          <div key={logo._id} className="relative">
            <input
              type="checkbox"
              checked={logo.isSelected}
              onChange={(e) => handleLogoClick(logo._id, e.target.checked)}
              className="checkbox-md absolute top-1 left-1"
            />

            <button
              onClick={() => handleDelete(logo?._id)}
              className="absolute -top-4 -right-4 bg-white hover:bg-orange-600 size-10 border border-orange-600 text-black hover:text-white flex items-center justify-center rounded-full transition-all duration-500 ease-in-out"
            >
              <FaXmark className="text-2xl" />
            </button>

            <img
              src={logo.logo}
              alt="advertisement"
              className="w-56 border border-gray-500"
              onClick={() => handleLogoClick(logo._id, !logo.isSelected)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCollection;
