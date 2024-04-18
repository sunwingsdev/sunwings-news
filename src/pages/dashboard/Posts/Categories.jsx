import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import {
  useAddNewCategoryMutation,
  useDeleteSingleCategoryMutation,
  useGetCategoriesQuery,
} from "../../../redux/features/allApis/categoryApi/categoryApi";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { data: categories } = useGetCategoriesQuery();
  const [addNewCategory] = useAddNewCategoryMutation();
  const [deleteSingleCategory] = useDeleteSingleCategoryMutation();

  // add new category
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    addNewCategory(data)
      .then((data) => {
        console.log(data);
        if (data.data.insertedId) {
          toast.success("Category added");
          setLoading(false), reset();
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
        setLoading(false);
      });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Handle search submission
  };

  const ActionButtons = ({ id }) => {
    return (
      <div className="flex justify-center items-center gap-2">
        <button className="text-red-500" onClick={() => handleDelete(id)}>
          Delete
        </button>
      </div>
    );
  };

  const handleDelete = (id) => {
    const selectedCategory = categories.find((item, i) => i + 1 === id);

    // Handle delete action
    deleteSingleCategory(selectedCategory._id)
      .then((data) => {
        if (data.data.deletedCount) {
          toast.success("Category Deleted successfully");
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Sl No", width: 80 },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 150,
    },
    {
      field: "subCategoryName",
      headerName: "Sub Category Name",
      width: 150,
      renderCell: (params) => (
        <Link to="#" className="hover:text-blue-500 hover:underline">
          {params.value}
        </Link>
      ),
    },

    {
      field: "slug",
      headerName: "Slug",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => <ActionButtons id={params.row.id} />,
    },
  ];

  const rows = categories
    ? categories.map((category, i) => ({
        id: i + 1,
        categoryName: category.categoryName,
        subCategoryName: category?.subCategoryName,
        slug: category?.slug,
      }))
    : [];
  const categoriesList = [
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
  return (
    <div className="h-fit md:h-screen">
      <Helmet>
        <title>Sunwings | Categories</title>
      </Helmet>
      <div className="flex flex-col gap-3">
        <h1 className="text-black text-2xl mb-4">Categories</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <h1 className="text-lg font-medium text-black mb-2">
              Add new Category
            </h1>
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="form-control">
                  <label htmlFor="categoryName" className="mb-2  text-black">
                    Category Name:{" "}
                  </label>
                  <select
                    name=""
                    id=""
                    className="bg-white border border-gray-400 py-1 px-2 text-black"
                    {...register("categoryName", { required: true })}
                  >
                    {categoriesList?.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label htmlFor="categoryName" className="mb-2  text-black">
                    Sub-category Name:{" "}
                  </label>
                  <input
                    type="text"
                    id="subCategoryName"
                    name="subCategoryName"
                    {...register("subCategoryName", { required: true })}
                    placeholder="Enter sub-category name"
                    className="bg-white border border-gray-400 py-1 px-2 text-black"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="slug" className="mb-2 text-black">
                    Slug:{" "}
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    {...register("slug", {
                      required: true,
                      pattern: /^[^\sA-Z]*-?[^\sA-Z]*$/,
                    })}
                    placeholder="Enter slug(only lower case letters, numbers and hyphens.No space)"
                    className="bg-white border border-gray-400 py-1 px-2 text-black"
                  />
                </div>
                {errors.slug && (
                  <span className="text-red-600">
                    {errors.slug.type === "pattern" &&
                      "Slug contains only letters(lower case), numbers, and hyphens.Do not use space"}
                  </span>
                )}
                <div>
                  <button
                    type="submit"
                    className="px-4 py-1 border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white transition-all ease-in-out duration-300"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-1">
                        <span className="loading loading-spinner loading-md"></span>{" "}
                        Uploading Category...
                      </div>
                    ) : (
                      "Add to Category list"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* table */}
          <div className="md:w-2/3">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-end mb-5">
              <input
                type="text"
                placeholder="Search Category..."
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
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pcategories: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
