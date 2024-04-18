import HeaderTop from "../components/shared/HeaderTop";
import HeaderLogo from "../components/shared/HeaderLogo";
import HeaderMenu from "../components/shared/HeaderMenu";
import FooterArea from "../components/shared/FooterArea";
import FooterCopyright from "../components/shared/FooterCopyright";
import { Outlet } from "react-router-dom";
import { useGetBodyThemeQuery } from "../redux/features/allApis/bodyThemeApi/bodyThemeApi";

const MainLayout = () => {
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];
  return (
    <div style={{ background: singleTheme?.bodyBg }}>
      {/* header top */}
      <HeaderTop />
      {/* header logo */}
      <HeaderLogo />
      {/* header manu */}
      <HeaderMenu />
      {/* outlet */}
      <Outlet />
      {/* footer area */}
      <FooterArea />
      {/* footer copyright */}
      <FooterCopyright />
    </div>
  );
};

export default MainLayout;
