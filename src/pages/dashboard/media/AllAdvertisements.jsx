import AdvertisementCollection from "../../../components/dashboard/media/advertisment/AdvertisementCollection";
import { useGetAllAdvertisementQuery } from "../../../redux/features/allApis/advertisementApi/advertisementApi";

const generateAdvertisementSection = (title, ads) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-transform transform hover:scale-105">
    <h2 className="text-gray-800 text-xl font-semibold mb-4 border-b pb-2">
      {title}
    </h2>
    <AdvertisementCollection data={ads} />
  </div>
);

const AllAdvertisements = () => {
  const { data } = useGetAllAdvertisementQuery();

  const beside_top_logo_ads = data?.filter(
    (ad) => ad.position === "beside_top_logo"
  );
  const beside_news_slider_top_right_corner_ads = data?.filter(
    (ad) => ad.position === "beside_news_slider_top_right_corner"
  );
  const center_home_page_ads = data?.filter(
    (ad) => ad.position === "center_home_page"
  );
  const video_section_top_right_ads = data?.filter(
    (ad) => ad.position === "video_section_top_right"
  );
  const video_section_bottom_left_ads = data?.filter(
    (ad) => ad.position === "video_section_bottom_left"
  );
  const video_section_bottom_right_ads = data?.filter(
    (ad) => ad.position === "video_section_bottom_right"
  );
  const jatio_category_top_left_ads = data?.filter(
    (ad) => ad.position === "jatio_category_top_left"
  );
  const jatio_category_top_right_ads = data?.filter(
    (ad) => ad.position === "jatio_category_top_right"
  );
  const binodon_category_top_left_ads = data?.filter(
    (ad) => ad.position === "binodon_category_top_left"
  );
  const binodon_category_top_right_ads = data?.filter(
    (ad) => ad.position === "binodon_category_top_right"
  );

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      {generateAdvertisementSection(
        "Beside Top Logo Advertisements",
        beside_top_logo_ads
      )}
      {generateAdvertisementSection(
        "Center Home Page Advertisements",
        center_home_page_ads
      )}
      {generateAdvertisementSection(
        "Video Section Top Right Advertisements",
        video_section_top_right_ads
      )}
      {generateAdvertisementSection(
        "Video Section Bottom Left Advertisements",
        video_section_bottom_left_ads
      )}
      {generateAdvertisementSection(
        "Video Section Bottom Right Advertisements",
        video_section_bottom_right_ads
      )}
      {generateAdvertisementSection(
        "Beside News Slider Top Right Corner Advertisements",
        beside_news_slider_top_right_corner_ads
      )}
      {generateAdvertisementSection(
        "Jatio Category Top Left Advertisements",
        jatio_category_top_left_ads
      )}
      {generateAdvertisementSection(
        "Jatio Category Top Right Advertisements",
        jatio_category_top_right_ads
      )}
      {generateAdvertisementSection(
        "Binodon Category Top Left Advertisements",
        binodon_category_top_left_ads
      )}
      {generateAdvertisementSection(
        "Binodon Category Top Right Advertisements",
        binodon_category_top_right_ads
      )}
    </div>
  );
};

export default AllAdvertisements;
