import DetailsCategoryNews from "./DetailsCategoryNews";
import ShortCategoryNews from "./ShortCategoryNews";
const NewsContent = () => {
  return (
    <div>
      <div className="container mx-auto flex gap-5 lg:flex-row flex-col justify-between">
        {/* home mid left side */}
        <DetailsCategoryNews />

        {/* home mid right side */}
        <ShortCategoryNews />
      </div>
    </div>
  );
};

export default NewsContent;
