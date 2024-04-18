import Facebook from "../../../../components/dashboard/themeSettings/socialProfiles/Facebook";
import Instagram from "../../../../components/dashboard/themeSettings/socialProfiles/Instagram";
import Twitter from "../../../../components/dashboard/themeSettings/socialProfiles/Twitter";
import Youtube from "../../../../components/dashboard/themeSettings/socialProfiles/Youtube";
import { Helmet } from "react-helmet-async";
const SocialProfiles = () => {
  return (
    <div className="flex flex-col gap-3">
      <Helmet>
        <title>Sunwings | Social Profiles</title>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-3">
        <h1 className="text-black text-2xl">Social Profiles</h1>
      </div>
      <div className="flex flex-col gap-4">
        <Facebook />
        <Twitter />
        <Instagram />
        <Youtube />
      </div>
    </div>
  );
};

export default SocialProfiles;
