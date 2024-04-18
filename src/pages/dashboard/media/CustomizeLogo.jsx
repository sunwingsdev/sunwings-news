import { useState } from "react";
import LogoCollection from "../../../components/dashboard/media/customizeLogo/LogoCollection";
import UploadLogo from "../../../components/dashboard/media/customizeLogo/UploadLogo";
import { Helmet } from "react-helmet-async";
import UploadMobileLogo from "../../../components/dashboard/media/customizeLogo/UploadMobileLogo";
import MobileLogoCollection from "../../../components/dashboard/media/customizeLogo/MobileLogoCollection";
import { useGetAllLogoQuery } from "../../../redux/features/allApis/logoApi/logoApi";

const CustomizeLogo = () => {
  const [selectedPosition, setSelectedPosition] = useState("");
  const { data: allLogos } = useGetAllLogoQuery();
  const handleChange = (event) => {
    setSelectedPosition(event.target.value);
  };
  const filteredLogoDesktop = allLogos?.filter(
    (lo) => lo.position === "desktop_logo"
  );
  const filteredLogoMobile = allLogos?.filter(
    (lo) => lo.position === "mobile_logo"
  );
  return (
    <div className="flex flex-col gap-3">
      <Helmet>
        <title>Sunwings | Customize Logo</title>
      </Helmet>
      <h1 className="text-black text-2xl mb-5">Customize logo</h1>
      <select
        name=""
        id=""
        onChange={handleChange}
        value={selectedPosition}
        className="bg-white border border-gray-500 px-3 py-2 text-black w-full md:w-1/2"
      >
        <option value="">Select Logo Category...</option>
        <option value="desktop_logo"> Desktop Logo</option>
        <option value="mobile_logo">Mobile Logo</option>
      </select>
      <div>
        {selectedPosition === "desktop_logo" && (
          <div className="flex flex-col gap-5">
            <h1 className="text-xl mt-5">Desktop Logo</h1>
            <UploadLogo />
            <h1 className="text-black text-2xl mb-5">
              Desktop Logo Collections
            </h1>
            {filteredLogoDesktop?.length ? (
              <LogoCollection data={filteredLogoDesktop} />
            ) : (
              <p className="text-xl text-black">No data available</p>
            )}
          </div>
        )}
        {selectedPosition === "mobile_logo" && (
          <div className="flex flex-col gap-5">
            <h1 className="text-xl mt-5">Mobile Logo</h1>
            <UploadMobileLogo />
            <h1 className="text-black text-2xl mb-5">
              Mobile Logo Collections
            </h1>
            {filteredLogoMobile?.length ? (
              <MobileLogoCollection data={filteredLogoMobile} />
            ) : (
              <p className="text-xl text-black">No data available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizeLogo;
