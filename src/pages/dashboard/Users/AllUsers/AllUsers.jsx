import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddRoleToUserMutation,
  useDeleteSingleUserMutation,
  useGetAllUsersQuery,
} from "../../../../redux/features/allApis/usersApi/usersApi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [uid, setUid] = useState("");
  // get all users
  const { data: users } = useGetAllUsersQuery();
  const [filteredRows, setFilteredRows] = useState([]);
  const [deleteSingleUser] = useDeleteSingleUserMutation();
  const [addRoleToUser] = useAddRoleToUserMutation();
  // table data
  const [filters, setFilters] = useState({
    role: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterSubmit = () => {
    // Handle filter submission, you can apply your filtering logic here
    let filteredRows = users;
    if (filters.role) {
      filteredRows = filteredRows.filter((row) => row.role === filters.role);
      setFilteredRows(filteredRows);
      if (!filteredRows) {
        setFilteredRows([]);
      }
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Handle search submission
    let filteredRows = users;
    if (searchQuery) {
      filteredRows = users.filter((user) => user.name.includes(searchQuery));
      setFilteredRows(filteredRows);
    }
  };

  const ActionButtons = () => {
    // console.log("uid...", uid);
    return (
      <div className="flex justify-center items-center gap-2">
        <button className="text-red-500" onClick={() => handleDelete(uid)}>
          Delete
        </button>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    return (
      <span
        className={`inline-block px-2 py-1 rounded-full text-xs ${
          status === "published" && "bg-green-500 text-white"
        } ${status === "draft" && "bg-red-500 text-white"}`}
      >
        {status}
      </span>
    );
  };

  const SetRole = () => {
    // console.log("uid...", uid);
    const handleRoleSubmit = (e) => {
      e.preventDefault();
      const role = e.target.role.value;
      // console.log('uid role',uid, role);
      addRoleToUser({ uid, role })
        .then((result) => {
          if (result.data.modifiedCount > 0) {
            toast.success("Role added");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    return (
      <div>
        <form onSubmit={handleRoleSubmit} action="" className="flex flex-row">
          <select name="role" id="">
            <option value="" selected disabled>
              Select
            </option>
            <option value="journalist">Journalist/Reporter</option>
            <option value="editor">Editor</option>
            <option value="administrator">Administrator</option>
          </select>
          <input
            className="px-2 py-1 bg-green-700 text-white"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    );
  };

  const columns = [
    { field: "id", headerName: "Sl No", width: 80 },
    {
      field: "name",
      headerName: "Name",
      width: 270,
      renderCell: (params) => (
        <Link to="#" className="hover:text-blue-500 hover:underline">
          {params.value}
        </Link>
      ),
    },
    { field: "email", headerName: "Email", width: 180 },

    {
      field: "role",
      headerName: "Role",
      width: 140,
      renderCell: (params) => <StatusBadge status={params.value} />,
    },
    {
      field: "giveRole",
      headerName: "Give Role",
      width: 240,
      renderCell: () => <SetRole />,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: () => <ActionButtons />,
      width: 150,
    },
  ];

  let rows = users
    ? users.map((user, i) => ({
        id: i + 1,
        name: user.name,
        email: user?.email,
        role: user.role,
        uid: user.uid,
      }))
    : [];

  if (filteredRows.length === 0 && filters.role) {
    rows = [];
  }

  if (filteredRows.length) {
    rows = filteredRows
      ? filteredRows?.map((user, i) => ({
          id: i + 1,
          name: user.name,
          email: user?.email,
          role: user.role,
          uid: user.uid,
        }))
      : [];
  }

  const filterRows = () => {
    if (!searchQuery) {
      return rows;
    }

    const query = searchQuery.toLowerCase();
    return rows?.filter((row) => {
      return Object.values(row).some((value) =>
        value?.toString()?.toLowerCase()?.includes(query)
      );
    });
  };

  const handleDelete = (uid) => {
    // Handle delete action

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
          const result = await deleteSingleUser(uid);
          console.log("result", result);
          if (result.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "This user has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Failed to delete user",
            text: error,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <Helmet>
        <title>Sunwings | All Users</title>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-3">
        <h1 className="text-black text-2xl">All Users</h1>
        {/* <Link to="/dashboard/add-new-post">
          <button className="bg-blue-100 px-4 py-1 border border-blue-500 rounded-sm text-blue-500 hover:bg-gray-100 transition-all duration-300 ease-in-out">
            Give role
          </button>
        </Link> */}
      </div>
      <div className="mt-5 flex items-center gap-1 text-xs">
        <p className="text-xs">All ({users?.length}) </p>
        {/* <p className="text-xs">Published (300)</p>|
        <p className="text-xs"> Draft (44)</p> */}
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <select
            name="role"
            onChange={handleFilterChange}
            className="block rounded-sm px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
          >
            <option value="" disabled selected>
              Select
            </option>
            <option value="journalist">Journalist/Reporter</option>
            <option value="editor">Editor</option>
            <option value="administrator">Administrator</option>
          </select>
          <div>
            <button
              className="bg-blue-100 px-4 py-1 border border-blue-500 rounded-sm text-blue-500 hover:bg-gray-100 transition-all duration-300 ease-in-out flex flex-row items-center gap-1"
              onClick={handleFilterSubmit}
            >
              Filter
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <input
            type="text"
            placeholder="Search User..."
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
          rows={filterRows()}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pcategories: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          onRowClick={(params) => {
            setUid(params.row.uid);
          }}
        />
      </div>
    </div>
  );
};

export default AllUsers;
