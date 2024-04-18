import { useEffect, useState } from "react";
import bkash from "../../../../assets/bKash.png";
import nagad from "../../../../assets/nagad.png";
import rocket from "../../../../assets/rocket.png";
import upay from "../../../../assets/upay.png";
import { Link } from "react-router-dom";
const ManageAdsView = ({
  advertisementData,
  handleUpdateStatus,
  approveLoading,
  deniedLoading,
}) => {
  const [loadingText, setLoadingText] = useState("");
  const [loading2Text, setLoading2Text] = useState("");
  const [statusBadge, setStatusBadge] = useState(null);

  useEffect(() => {
    if (approveLoading) {
      setLoadingText("Approving...");
    } else if (advertisementData?.status === "approved") {
      setLoadingText("Approved");
    } else {
      setLoadingText("Approve");
    }
  }, [approveLoading, advertisementData?.status]);

  useEffect(() => {
    if (deniedLoading) {
      setLoading2Text("Denying...");
    } else if (advertisementData?.status === "denied") {
      setLoading2Text("Denied");
    } else {
      setLoading2Text("Deny");
    }
  }, [deniedLoading, advertisementData?.status]);

  useEffect(() => {
    // Set status badge based on advertisement status
    if (advertisementData?.status === "pending") {
      setStatusBadge(
        <div className="badge badge-warning text-sm py-2 px-4 text-white">
          Pending
        </div>
      );
    } else if (advertisementData?.status === "approved") {
      setStatusBadge(
        <div className="badge badge-success text-sm py-2 px-4 text-white">
          Approved
        </div>
      );
    } else if (advertisementData?.status === "denied") {
      setStatusBadge(
        <div className="badge bg-red-600 border-0 text-sm py-2 px-4 text-white">
          Denied
        </div>
      );
    }
  }, [advertisementData?.status]);

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

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div>
        <img src={advertisementData?.banner} alt="ad image" className="w-48" />
        <div className="w-full mt-3">
          <table className="table-xs border border-black w-full">
            <thead>
              <tr>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="w-full flex flex-row items-center justify-between">
                    <button
                      onClick={() =>
                        handleUpdateStatus(advertisementData?._id, "approved")
                      }
                      className={`px-3 py-1 ${
                        advertisementData?.status === "approved"
                          ? "text-green-600 bg-white border border-green-600"
                          : "text-white bg-green-600 border border-green-600"
                      }`}
                      disabled={approveLoading}
                    >
                      {loadingText}
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(advertisementData?._id, "denied")
                      }
                      className={`px-3 py-1 ${
                        advertisementData?.status === "denied"
                          ? "text-red-600 bg-white border border-red-600"
                          : "text-white bg-red-600 border border-red-600"
                      }`}
                      disabled={deniedLoading}
                    >
                      {loading2Text}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="w-full mt-3">
          <table className="table-xs border border-black w-full">
            <thead>
              <tr>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="w-full flex flex-row items-center justify-between">
                    <button className="px-3 py-1 bg-green-600 text-white">
                      Select
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white">
                      Deselect
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
      <div>
        <table className="table-sm border border-black">
          <tbody>
            <tr className=" border border-black">
              <td>Client Name: </td>
              <td className="text-nowrap">{advertisementData?.name}</td>
            </tr>
            <tr className=" border border-black">
              <td>Client Email: </td>
              <td className="text-nowrap">{advertisementData?.email}</td>
            </tr>
            <tr className=" border border-black">
              <td>Client Phone: </td>
              <td className="text-nowrap">{advertisementData?.phone}</td>
            </tr>
            <tr className=" border border-black">
              <td>Date: </td>
              <td className="text-nowrap">
                {formatDate(advertisementData?.createdAt)}
              </td>
            </tr>
            <tr className=" border border-black">
              <td>Position: </td>
              <td className="text-nowrap">{advertisementData?.position}</td>
            </tr>
            <tr className=" border border-black">
              <td>Duration: </td>
              <td className="text-nowrap">
                {advertisementData?.duration === "1"
                  ? `${advertisementData?.duration} Day`
                  : `${advertisementData?.duration} Days`}
              </td>
            </tr>
            <tr className=" border border-black">
              <td>Method: </td>
              <td className="text-nowrap">
                {advertisementData?.method === "bkash" ? (
                  <img src={bkash} alt="method image" className="w-20" />
                ) : advertisementData?.method === "nagad" ? (
                  <img src={nagad} alt="method image" className="w-20" />
                ) : advertisementData?.method === "rocket" ? (
                  <img src={rocket} alt="method image" className="w-20" />
                ) : (
                  <img src={upay} alt="method image" className="w-20" />
                )}
              </td>
            </tr>
            <tr className=" border border-black">
              <td>Price: </td>
              <td className="text-nowrap">
                {advertisementData?.price} <small>Tk</small>
              </td>
            </tr>
            <tr className=" border border-black">
              <td>Transaction Id: </td>
              <td className="text-nowrap text-lg">
                {advertisementData?.transactionId}
              </td>
            </tr>
            <tr className=" border border-black">
              <td> Link: </td>
              <td className="text-nowrap">
                <Link to={advertisementData?.link}>
                  {advertisementData?.link}
                </Link>
              </td>
            </tr>
            <tr className=" border border-black">
              <td> Status: </td>
              <td className="text-nowrap">{statusBadge}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdsView;
