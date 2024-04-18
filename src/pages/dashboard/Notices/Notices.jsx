import NoticeCard from "../../../components/dashboard/NoticeCard/NoticeCard";
import { useGetGetNoticeQuery } from "../../../redux/features/allApis/noticeApi/noticeApi";

const Notices = () => {
  const { data: notices } = useGetGetNoticeQuery();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notices?.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
};

export default Notices;
