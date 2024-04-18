import { DataGrid } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useGetPostsQuery } from "../../../redux/features/allApis/postApi/postApi";
import { AuthContext } from "../../../providers/AuthProvider";

const MyAllPosts = () => {
  const { user } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    status: "",
  });
  // console.log(filters);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useGetPostsQuery({
    category: "",
    subCategory: "",
  });

  const allPosts = data?.filter((post) => post.authorEmail === user.email);

  const handleFilterChange = (event) => {
    // console.log(event.target.name);
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = () => {
    let filteredRows = allPosts;
    if (filters.date) {
      // const publishDateFilter = `${filters.year}-${filters.month}`;
      filteredRows = filteredRows.filter(
        (row) => row.publishDate.split("T").slice(0, 1).join() === filters.date
      );
    }

    if (filters.category) {
      filteredRows = filteredRows.filter(
        (row) => row?.category === filters?.category
      );
    }

    if (filters.status) {
      filteredRows = filteredRows.filter(
        (row) => row.status === filters.status
      );
    }

    if (filters.author) {
      filteredRows = filteredRows.filter(
        (row) => row?.author === filters?.author
      );
    }

    setFilteredRows(filteredRows);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Handle search submission
    let filteredRows = allPosts;
    if (searchQuery) {
      filteredRows = filteredRows.filter((row) =>
        row.postTitle.includes(searchQuery)
      );
      setFilteredRows(filteredRows);
    }
  };
  const ActionButtons = ({ id }) => {
    return (
      <div className="flex justify-center items-center gap-2">
        <Link to={`/dashboard/edit-post/${id}`} className="text-blue-500">
          Edit
        </Link>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    return (
      (status === "published" && (
        <button className="inline-block px-2 py-1 rounded-md text-xs bg-green-500 text-white">
          {status}
        </button>
      )) ||
      (status === "pending" && (
        <button className="inline-block px-2 py-1 rounded-md text-xs bg-red-500 text-white">
          {status}
        </button>
      )) ||
      (status === "draft" && (
        <button className="inline-block px-2 py-1 rounded-md text-xs bg-yellow-500 text-white">
          {status}
        </button>
      ))
    );
  };

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

  const columns = [
    { field: "id", headerName: "Sl No", width: 20 },
    {
      field: "title",
      headerName: "Title",
      width: 270,
      renderCell: (params) => (
        <Link
          to={`/posts/${params.row.action}`}
          className="hover:text-blue-500 hover:underline"
        >
          {params.value || "---"}
        </Link>
      ),
    },
    {
      field: "category",
      headerName: "Categories",
      type: "text",
      width: 150,
      renderCell: (params) => (
        <div
          className="inline-block px-[6px] py-[2px] mr-1 rounded"
          style={{ backgroundColor: params.value ? "#F7D7B6" : "transparent" }}
        >
          {params.value || "---"}
        </div>
      ),
    },
    {
      field: "subCategory",
      headerName: "Sub Category",
      type: "text",
      width: 150,
      renderCell: (params) => (
        <div
          className="inline-block px-[6px] py-[2px] mr-1 rounded"
          style={{ backgroundColor: params.value ? "#F7D7B6" : "transparent" }}
        >
          {params.value || "---"}
        </div>
      ),
    },
    {
      field: "publishDate",
      headerName: "Publish Date",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => <StatusBadge status={params.value} />,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => <ActionButtons id={params.value} />,
      width: 150,
    },
  ];

  let rows = allPosts
    ? allPosts?.map((post, i) => ({
        _id: post?._id,
        id: i + 1,
        title: post?.postTitle,
        category: post?.category,
        subCategory: post?.subCategory,
        publishDate: formatDate(post?.publishDate),
        status: post.status,
        action: post._id,
        popular: { id: post._id, isPopular: post.isPopular },
      }))
    : [];

  if (filteredRows.length) {
    rows = filteredRows
      ? filteredRows?.map((post, i) => ({
          _id: post?._id,
          id: i + 1,
          title: post?.postTitle,
          category: post?.category,
          subCategory: post?.subCategory,
          publishDate: formatDate(post?.publishDate),
          status: post?.status,
          action: post._id,
          popular: { id: post._id, isPopular: post.isPopular },
        }))
      : [];
  }

  const categories = [
    { label: "জাতীয়", value: "জাতীয়" },
    { label: "রাজনীতি", value: "রাজনীতি" },
    { label: "আন্তর্জাতিক", value: "আন্তর্জাতিক" },
    { label: "খেলাধুলা", value: "খেলাধুলা" },
    { label: "বিনোদন", value: "বিনোদন" },
    { label: "তথ্যপ্রযুক্তি", value: "তথ্যপ্রযুক্তি" },
    { label: "সারাদেশ", value: "সারাদেশ" },
    { label: "ক্যাম্পাস", value: "ক্যাম্পাস" },
    { label: "আরো", value: "আরো" },
  ];
  const allPostLength = allPosts?.length;
  const publishedPostsLength = allPosts
    ? allPosts.filter((post) => post.status === "published").length
    : 0;
  const draftPostsLength = allPosts
    ? allPosts.filter((post) => post.status === "draft").length
    : 0;

  return (
    <div className="flex flex-col gap-3">
      <Helmet>
        <title>Sunwings | All Posts</title>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-3">
        <h1 className="text-black text-2xl">My Posts</h1>
        <Link to="/dashboard/add-new-post">
          <button className="bg-blue-100 px-4 py-1 border border-blue-500 rounded-sm text-blue-500 hover:bg-gray-100 transition-all duration-300 ease-in-out">
            Add New Post
          </button>
        </Link>
      </div>
      <div className="mt-5 flex items-center gap-1 text-lg  text-black">
        <p>
          All
          <span className="text-blue-500 hover:underline cursor-pointer">
            ({allPostLength || 0})
          </span>
        </p>
        |
        <p>
          Published
          <span className="text-blue-500 hover:underline cursor-pointer">
            ({publishedPostsLength})
          </span>
        </p>
        |
        <p>
          Draft
          <span className="text-blue-500 hover:underline cursor-pointer">
            ({draftPostsLength})
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <input
            type="date"
            name="date"
            id="date"
            onChange={handleFilterChange}
            className="block rounded-sm px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
          />

          <select
            name="category"
            onChange={handleFilterChange}
            className="block rounded-sm px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
          >
            <option value="" selected disabled>
              Select Category
            </option>
            {categories?.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <select
            name="status"
            onChange={handleFilterChange}
            className="block rounded-sm px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
          >
            <option value="" selected disabled>
              Status
            </option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <div>
            <button
              className="bg-blue-100 px-4 py-1 border border-blue-500 rounded-sm text-blue-500 hover:bg-gray-100 transition-all duration-300 ease-in-out flex flex-row items-center gap-1"
              onClick={handleFilterSubmit}
            >
              Filter
            </button>
          </div>
          <div>
            <button
              className="bg-blue-100 px-4 py-1 border border-blue-500 rounded-sm text-blue-500 hover:bg-gray-100 transition-all duration-300 ease-in-out flex flex-row items-center gap-1"
              onClick={() =>
                setFilters({
                  date: "",
                  category: "",
                  status: "",
                })
              }
            >
              Reset
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <input
            type="text"
            placeholder="Search Post..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="block rounded-sm px-2 border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
          />
          <div>
            <button
              className="bg-blue-100 px-4 py-1 border border-blue-500 rounded-sm text-blue-500 hover:bg-gray-100 transition-all duration-300 ease-in-out flex flex-row items-center gap-1"
              onClick={handleSearchSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[30rem]">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pcategories: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
        />
      </div>
    </div>
  );
};

export default MyAllPosts;
