import toast from "react-hot-toast";
import { useUpdateAdSelectionMutation } from "../../../../redux/features/allApis/advertisementApi/advertisementApi";

const AdvertisementCollection = ({ data }) => {
  const [updateAdSelection] = useUpdateAdSelectionMutation();

  const handleAdClick = async (adId, isChecked) => {
    try {
      // Update isSelected status for the clicked ad
      await updateAdSelection({ id: adId, isSelected: isChecked });

      toast.success("Ad updated successfully!");
    } catch (error) {
      console.error("Error updating Ad selection:", error);
      toast.error("Failed to update Ad selection. Please try again later.");
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 place-items-center gap-4">
        {data?.map((ad) => (
          <div key={ad._id} className="relative">
            <input
              type="checkbox"
              checked={ad.isSelected}
              onChange={(e) => handleAdClick(ad._id, e.target.checked)}
              className="checkbox-md absolute top-1 left-1"
            />

            <img
              src={ad.banner}
              alt="advertisement"
              className="w-56 border border-gray-500"
              onClick={() => handleAdClick(ad._id, !ad.isSelected)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementCollection;
