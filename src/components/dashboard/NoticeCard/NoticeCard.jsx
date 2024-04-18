import { MdDelete } from "react-icons/md";
import { useDeleteNoticeMutation } from "../../../redux/features/allApis/noticeApi/noticeApi";
import moment from "moment";
import Swal from "sweetalert2";
const NoticeCard = ({ notice }) => {
  const [deleteNotice] = useDeleteNoticeMutation();

  // time ago function

  const timeAgo = (timestamp) => {
    const currentTime = moment();
    const postTime = moment(timestamp);
    const duration = moment.duration(currentTime.diff(postTime));

    if (duration.asSeconds() < 60) {
      return "a few seconds ago";
    } else if (duration.asMinutes() < 60) {
      return Math.floor(duration.asMinutes()) + " minutes ago";
    } else if (duration.asHours() < 24) {
      return Math.floor(duration.asHours()) + " hours ago";
    } else if (duration.asDays() < 2) {
      return "a day ago";
    } else if (duration.asDays() < 7) {
      return Math.floor(duration.asDays()) + " days ago";
    } else if (duration.asWeeks() < 4) {
      return Math.floor(duration.asWeeks()) + " weeks ago";
    } else if (duration.asMonths() < 12) {
      return Math.floor(duration.asMonths()) + " months ago";
    } else {
      return Math.floor(duration.asYears()) + " years ago";
    }
  };

  // handle notice delete
  const handleNoticeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNotice(id)
          .then((result) => {
            if (result.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "This notice has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Failed to delete notice",
              text: error,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg relative">
      <h2 className="text-lg font-bold text-success capitalize mb-2">
        {notice?.subject}
      </h2>
      <p className="text-gray-600 mb-4">{notice?.details}</p>
      <div className="flex justify-between items-center text-gray-500">
        <span>{timeAgo(notice?.createdAt)}</span>
        {/* You can add additional actions here */}
      </div>
      <div
        onClick={() => handleNoticeDelete(notice?._id)}
        className="absolute top-0 right-0 bg-gray-200 rounded-full border-red-500 border-2 w-10 h-10 flex items-center justify-center"
      >
        <MdDelete className=" text-red-600 hover:text-7xl text-3xl duration-300" />
      </div>
    </div>
  );
};

export default NoticeCard;
