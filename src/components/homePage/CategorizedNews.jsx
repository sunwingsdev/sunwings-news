import SmallNewsCard from "../shared/SmallNewsCard";
import card from "../../assets/home-slider.jpg";
import CategoryTitle from "../shared/CategoryTitle";
import { HiChevronDoubleRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const CategorizedNews = ({ secTitle, news, loading }) => {
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  const newArray = news?.slice(1, 3);

  return (
    <div>
      <CategoryTitle title={secTitle} />
      <div className="bg-slate-100 mb-4 min-h-[16rem] md:min-h-[19rem] lg:min-h-[20rem] xl:min-h-[23rem]">
        <img src={news[0]?.postThumbnail || card} alt="post thumbnail" />
        <Link to={`/posts/${news[0]?._id}`}>
          <p className="text-black no-underline font-medium hover:text-blue-500 text-xl py-4 px-2">
            {news[0]?.postTitle}
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {newArray?.map((item, i) => (
          <SmallNewsCard key={i} post={item} isLoading={loading} />
        ))}
        <Link to={`/category/${secTitle}`}>
          <button className="flex mx-auto justify-center items-center gap-1  text-black cursor-pointer underline hover:text-blue-600 py-2 px-4 rounded mt-4">
            আরো খবর
            <HiChevronDoubleRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategorizedNews;
