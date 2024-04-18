import { useGetBodyThemeQuery } from "../../redux/features/allApis/bodyThemeApi/bodyThemeApi";

const CategoryTitle = ({ title }) => {
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];
  console.log(singleTheme);

  const categoryTitleStyle = {
    borderLeftWidth: `${singleTheme?.categoryBorderWidth}px`,
    borderLeftStyle: singleTheme?.categoryBorderStyle,
    borderLeftColor: singleTheme?.categoryBorderColor,
    backgroundColor: singleTheme?.categoryBg,
    color: singleTheme?.categoryTitleFontColor,
    fontSize: singleTheme?.categoryTitleFontSize,
  };

  return (
    <div
      style={
        singleTheme?.isCategoryBordered == "yes"
          ? categoryTitleStyle
          : {
              backgroundColor: singleTheme?.categoryBg,
              color: singleTheme?.categoryTitleFontColor,
              fontSize: singleTheme?.categoryTitleFontSize,
            }
      }
      className=" font-semibold mb-3"
    >
      <p className="text-base ml-1 p-2">{title}</p>
    </div>
  );
};

export default CategoryTitle;
