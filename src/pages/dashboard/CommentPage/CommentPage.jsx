import { useState, useEffect } from "react";
import { useGetAllCommentsQuery } from "../../../redux/features/allApis/commentApi/commentApi";
import moment from "moment";
import { Link } from "react-router-dom";

const CommentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const { data: apiComments, isLoading } = useGetAllCommentsQuery({
    page: currentPage,
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (apiComments) {
      const sortedComments = [...apiComments];
      if (sortBy === "asc") {
        sortedComments.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (sortBy === "desc") {
        sortedComments.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      setComments(sortedComments);
    }
  }, [apiComments, sortBy]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const hasMorePages = !isLoading && apiComments?.length === 10;

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <label htmlFor="sortBy" className="mr-2 font-bold">
          Sort By Date:
        </label>
        <select
          id="sortBy"
          className="px-2 py-1 border rounded"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="" disabled selected>
            Select
          </option>
          <option value="asc">Oldest</option>
          <option value="desc">Newest</option>
        </select>
      </div>
      <table className="table-auto w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-800">News</th>
            <th className="px-4 py-2 text-gray-800">Name</th>
            <th className="px-4 py-2 text-gray-800">Email</th>
            <th className="px-4 py-2 text-gray-800">Date</th>
            <th className="px-4 py-2 text-gray-800">Comment</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            comments.map((item, index) => (
              <tr key={index}>
                <Link to={`/posts/${item?.newsId}`} className="text-center">
                  <td className="px-4 py-2 underline text-blue-400 hover:text-blue-500">
                    {item?.newsTitle?.slice(0, 10)}...
                  </td>
                </Link>

                <td className="border px-4 py-2 capitalize">{item?.name}</td>
                <td className="border px-4 py-2">{item?.email || "---"}</td>
                <td className="border px-4 py-2">
                  {moment(item?.date).format("MMMM Do YYYY, h:mm a")}
                </td>
                <td className="border px-4 py-2">{item?.comment}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r ${
            !hasMorePages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={nextPage}
          disabled={!hasMorePages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CommentPage;
