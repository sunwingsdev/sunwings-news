import { FaCirclePlay } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";

const VideoContent = ({
  categoryName,
  data,
  handleVideo,
  handleVideoClick,
  handleDelete,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-black text-lg mb-5 flex flex-col items-start">
        <span className="leading-5">Category: {categoryName}</span>
        <small className="text-sm text-red-600 italic">
          You Need to Select a Video to show them on Home Page Video Gallery
          Live Tv. ***
        </small>
      </h1>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-6 lg:px-6 xl:px-6 2xl:px-6">
          {data?.map((vid) => (
            <div key={vid?._id} className="relative">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
                <FaCirclePlay
                  onClick={() => handleVideo(vid)}
                  className="text-5xl text-orange-600 border-2 border-white rounded-full bg-white mb-14 cursor-pointer"
                />
              </div>
              <input
                type="checkbox"
                checked={vid.isSelected}
                onChange={(e) => handleVideoClick(vid?._id, e.target.checked)}
                className="checkbox checkbox-success checkbox-lg absolute top-2 left-2 border-2"
              />
              <div
                onClick={() => handleDelete(vid?._id)}
                className="bg-orange-600 hover:bg-white border-2 border-orange-600 text-white hover:text-orange-600 transition-all ease-in duration-300 w-fit h-fit p-2 rounded-full cursor-pointer absolute -top-4 -right-4"
              >
                <HiXMark className="text-2xl" />
              </div>
              <img
                src={vid?.thumbnail}
                alt="Gallery Image"
                className="w-full"
              />
              <p className="text-black">{vid?.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-red-600 text-lg italic">
            *** No Data Available ***
          </h1>
        </div>
      )}
    </div>
  );
};

export default VideoContent;
