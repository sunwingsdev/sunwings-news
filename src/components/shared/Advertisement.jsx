import { Link } from "react-router-dom";
import customImg from "../../assets/HomeBanner1.png";

const Advertisement = ({ selectedAd }) => {
  return (
    <div>
      <Link to={selectedAd?.link ? selectedAd?.link : null}>
        {selectedAd ? (
          <img
            src={selectedAd.banner}
            alt="AdvertiseMent"
            className="w-full h-28"
          />
        ) : (
          <img src={customImg} alt="" className="w-full h-28" />
        )}
      </Link>
    </div>
  );
};

export default Advertisement;
