import AdvertisementCollection from "../../../components/dashboard/media/advertisment/AdvertisementCollection";
import { useGetAllAdvertisementQuery } from "../../../redux/features/allApis/advertisementApi/advertisementApi";

const AllAdvertisements = () => {
  const { data } = useGetAllAdvertisementQuery();
  const beside_top_logo_ads = data?.filter(
    (ad) => ad.position === "beside_top_logo"
  );
  const jatio_category_top_left_ads = data?.filter(
    (ad) => ad.position === "jatio_category_top_left"
  );

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-black text-lg font-bold mb-2">
          Beside Top Logo Advertisements
        </h2>
        <AdvertisementCollection data={beside_top_logo_ads} />
      </div>
      <div>
        <h2 className="text-black text-lg font-bold mb-2">
          Jatio Category Top Left Advertisements
        </h2>
        <AdvertisementCollection data={jatio_category_top_left_ads} />
      </div>
    </div>
  );
};

export default AllAdvertisements;
