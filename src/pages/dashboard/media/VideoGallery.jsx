import { Helmet } from "react-helmet-async";
import VideoGalleryUpload from "../../../components/dashboard/media/videoGallery/VideoGalleryUpload";
import { useGetAllVideoQuery } from "../../../redux/features/allApis/videoGalleryApi/videoGalleryApi";
import VideoGalleryCollection from "../../../components/dashboard/media/videoGallery/VideoGalleryCollection";

const VideoGallery = () => {
  const { data: allVideos } = useGetAllVideoQuery();
  return (
    <div className="flex flex-col gap-3">
      <Helmet>
        <title>Sunwings | Video Gallery</title>
      </Helmet>
      <h1 className="text-black text-2xl mb-5">Video Gallery</h1>
      <div className="flex flex-col gap-16 w-full">
        <VideoGalleryUpload />
        <VideoGalleryCollection data={allVideos} />
      </div>
    </div>
  );
};

export default VideoGallery;
