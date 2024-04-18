import { Link } from "react-router-dom";
import { useGetFooterQuery } from "../../redux/features/allApis/footerApi/footerApi";

const FooterCopyright = () => {
  const { data: allFooters } = useGetFooterQuery();
  const singleFooter = allFooters?.[0];
  const dynamicBgColorStyle = singleFooter
    ? { backgroundColor: singleFooter.copyrightBgColor }
    : { backgroundColor: "#454444" };

  const dynamicTextColorStyle = singleFooter
    ? { color: singleFooter.copyrightTextColor }
    : { color: "#ffff" };

  const currentYear = new Date().getFullYear();
  return (
    <div
      className="container py-6 px-2 mx-auto"
      style={{ ...dynamicBgColorStyle, ...dynamicTextColorStyle }}
    >
      <div className="text-center flex flex-row gap-1 justify-center">
        <span>© {currentYear} Copyright:</span>
        <Link className="font-semibold" to={singleFooter?.copyrightLink}>
          {singleFooter?.copyrightText}
        </Link>
      </div>
    </div>
  );
};

export default FooterCopyright;
