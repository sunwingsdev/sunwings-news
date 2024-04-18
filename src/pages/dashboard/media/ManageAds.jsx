import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Modal from "../../../components/shared/Modal/Modal";
import ManageAdsView from "../../../components/dashboard/media/advertisment/ManageAdsView";
import {
  useDeleteAnAdMutation,
  useGetAllAdvertisementQuery,
  useUpdateAdStatusMutation,
} from "../../../redux/features/allApis/advertisementApi/advertisementApi";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageAds = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [approveLoading, setApproveLoading] = useState(false);
  const [deniedLoading, setDeniedLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState({});

  const { data: allAds } = useGetAllAdvertisementQuery();
  const [deleteAnAd] = useDeleteAnAdMutation();
  const [updateAdStatus] = useUpdateAdStatusMutation();

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = allAds?.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleChangeEntriesPerPage = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(advertisementData) {
    setIsOpen(true);
    setModalData(advertisementData);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return `${formattedDate}`;
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteAnAd({ id: id });

          if (result.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "This Advertisement has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Failed to delete Advertisement",
            text: `${error}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      if (status === "approved") {
        setApproveLoading(true);
        setDeniedLoading(false); // Reset deniedLoading state
      } else if (status === "denied") {
        setDeniedLoading(true);
        setApproveLoading(false); // Reset approveLoading state
      }

      const result = await updateAdStatus({ id: id, status: status });
      console.log(result);
      if (result.data.modifiedCount > 0) {
        toast.success("Advertisement status has been updated.");
      }
    } catch (error) {
      toast.error("Failed to update Advertisement status");
    } finally {
      // Reset loading states after update operation completes
      setTimeout(() => {
        setApproveLoading(false);
        setDeniedLoading(false);
      }, 1000);
    }
  };

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    let formattedTime = "";
    if (days > 0) {
      formattedTime += `${days} day${days > 1 ? "s" : ""} `;
    }
    if (hours > 0) {
      formattedTime += `${hours} hr${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes} min${minutes > 1 ? "s" : ""} `;
    }
    formattedTime += `${remainingSeconds} sec${
      remainingSeconds > 1 ? "s" : ""
    }`;

    return formattedTime.trim();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Update remaining time for each advertisement with approved status
      const updatedRemainingTime = {};
      currentEntries.forEach((ad) => {
        if (ad?.duration && ad?.status === "approved") {
          const remainingSeconds =
            ad.duration * 24 * 60 * 60 -
            Math.floor((Date.now() - new Date(ad.createdAt).getTime()) / 1000);

          // Check if remaining time is less than or equal to 0
          if (remainingSeconds <= 0) {
            // If remaining time is zero, update status to "finished"
            handleUpdateStatus(ad._id, "finished");
          } else {
            // Otherwise, update remaining time
            updatedRemainingTime[ad._id] = remainingSeconds;
          }
        }
      });
      setRemainingTime(updatedRemainingTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentEntries]);

  return (
    <div>
      <Helmet>
        <title>Sunwings News | Manage All Advertisement</title>
      </Helmet>
      <h1 className="text-black text-2xl mb-6">Manage All Ads</h1>
      <div className="mt-4 overflow-y-scroll border border-black">
        <table className="table table-zebra ">
          <thead>
            <tr className="table-row">
              <th className="text-black">#</th>
              <th className="text-black">Ad Image</th>
              <th className="text-black">Created At</th>
              <th className="text-black">Counter</th>
              <th className="text-black">Name</th>
              <th className="text-black">Phone</th>
              <th className="text-black">Status</th>
              <th className="text-black">Positon</th>
              <th className="text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries?.map((ad, i) => (
              <tr key={ad?._id} className="table-row">
                <td className="text-black">{i + 1}</td>
                <td>
                  <img src={ad?.banner} alt="Ad image" className="w-20" />
                </td>
                <td className="text-black text-nowrap">
                  {formatDate(ad?.createdAt)}
                </td>
                <td className="text-black text-nowrap">
                  {remainingTime[ad._id] && (
                    <p className="badge badge-ghost badge-outline">
                      {formatTime(remainingTime[ad._id])}
                    </p>
                  )}
                </td>
                <td className="text-black text-nowrap">
                  {ad?.name ? ad?.name : "--"}
                </td>
                <td className="text-black">{ad?.phone ? ad?.phone : "--"}</td>
                <td className="text-black">
                  {ad?.status === "pending" ? (
                    <div className="badge badge-warning text-sm py-2 px-4 text-white">
                      Pending
                    </div>
                  ) : ad?.status === "approved" ? (
                    <div className="badge badge-success text-sm py-2 px-4 text-white">
                      Approved
                    </div>
                  ) : ad?.status === "denied" ? (
                    <div className="badge bg-red-600 border-0 text-sm py-2 px-4 text-white">
                      Denied
                    </div>
                  ) : (
                    "--"
                  )}
                </td>
                <td className="text-black">
                  {ad?.position ? ad?.position : "--"}
                </td>
                <td>
                  <div className="flex flex-row items-center gap-2">
                    <button
                      onClick={() => openModal(ad)}
                      className="bg-orange-600 px-3 py-1"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(ad?._id)}
                      className="bg-red-600 px-3 py-1 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <Modal isOpen={isOpen} closeModal={closeModal}>
              <ManageAdsView
                advertisementData={modalData}
                handleUpdateStatus={handleUpdateStatus}
                approveLoading={approveLoading}
                deniedLoading={deniedLoading}
              />
            </Modal>
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <select
            value={entriesPerPage}
            onChange={handleChangeEntriesPerPage}
            className="bg-white border border-gray-400 rounded px-2 py-1"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
          </select>
        </div>
        <div className="flex flex-row">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 mr-2 bg-orange-600 text-white flex items-center"
          >
            <FiChevronsLeft /> Prev
          </button>
          <ul className="flex">
            {Array.from(
              { length: Math.ceil(allAds?.length / entriesPerPage) },
              (_, i) => i + 1
            ).map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => paginate(pageNumber)}
                  className={`px-3 py-1 mr-2 bg-orange-500 text-white ${
                    currentPage === pageNumber ? "bg-orange-700" : ""
                  }`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(allAds?.length / entriesPerPage)
            }
            className="px-3 py-1 ml-2 bg-orange-600 text-white flex items-center"
          >
            Next <FiChevronsRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAds;
