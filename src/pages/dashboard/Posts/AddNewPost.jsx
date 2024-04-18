import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useAddNewPostMutation } from "../../../redux/features/allApis/postApi/postApi";
import Swal from "sweetalert2";
import { singleCategory } from "../../../api/fetch";
import { AuthContext } from "../../../providers/AuthProvider";
import { useGetUserByUidQuery } from "../../../redux/features/allApis/usersApi/usersApi";
import { imageUpload } from "../../../api/utils";
import { Helmet } from "react-helmet-async";

const AddNewPost = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [daftLoading, setDraftLoading] = useState(false);
  const [quillValue, setQuillValue] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [publishAccordionOpen, setPublishAccordionOpen] = useState(true);
  const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [subcategories, setSubcategories] = useState([]);

  const { register, handleSubmit, reset, watch } = useForm();

  useEffect(() => {
    if (selectedCategories) {
      singleCategory(selectedCategories.value).then((data) => {
        const subcategoryNames = data?.map((item) => item.subCategoryName);
        setSubcategories(subcategoryNames || []);
      });
    }
  }, [selectedCategories]);

  const categoriesList = [
    { label: "জাতীয়", value: "জাতীয়" },
    { label: "রাজনীতি", value: "রাজনীতি" },
    { label: "আন্তর্জাতিক", value: "আন্তর্জাতিক" },
    { label: "খেলাধূলা", value: "খেলাধূলা" },
    { label: "বিনোদন", value: "বিনোদন" },
    { label: "তথ্যপ্রযুক্তি", value: "তথ্যপ্রযুক্তি" },
    { label: "সারাদেশ", value: "সারাদেশ" },
    { label: "ক্যাম্পাস", value: "ক্যাম্পাস" },
    { label: "আরো", value: "আরো" },
  ];

  const handleQuillChange = (content, _, __, editor) => {
    setQuillValue(content);
    const text = editor.getText().trim();
    const words = text.split(/\s+/);
    const count = words.filter((word) => word !== "").length;
    setWordCount(count);
  };

  const togglePublishAccordion = () => {
    setPublishAccordionOpen(!publishAccordionOpen);
  };

  const toggleCategoryAccordion = () => {
    setCategoryAccordionOpen(!categoryAccordionOpen);
  };

  const [createPost] = useAddNewPostMutation();
  const { data: singleUser } = useGetUserByUidQuery(user?.uid);

  const now = new Date();

  const handleSubCategoryChange = (selectedOption) => {
    setSelectedSubCategory(selectedOption.value);
  };

  const onSubmit = async (data, status) => {
    data.author = singleUser?.name;
    data.authorImage = singleUser?.image;
    data.authorEmail = singleUser?.email;
    data.postTitle = watch("postTitle");
    data.category = selectedCategories?.value;
    data.subCategory = selectedSubCategory;
    data.quill = quillValue;
    data.publishDate = now;
    data.updateDate = "";
    data.updateAuthor = "";
    data.updateAuthorImage = "";
    data.updateAuthorEmail = "";
    data.status = status;
    const thumbnailImage = watch("postThumbnail");

    try {
      if (status === "draft") {
        setDraftLoading(true); // Set draft loading
      } else {
        setLoading(true); // Set main loading
      }

      const imageData = await imageUpload(thumbnailImage[0]);

      data.postThumbnail = imageData.data.display_url;
      const result = await createPost(data);
      if (result.data) {
        Swal.fire({
          title: `${
            status === "draft"
              ? "Post Saved to Draft Successfully!"
              : "Post Published Successfully!"
          }`,
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      } else {
        Swal.fire({
          title: "Failed to Publish Post.",
          text: "Press OK to continue",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "An unexpected error occurred",
        text: `${error}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Reset main loading
      setDraftLoading(false); // Reset draft loading
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Helmet>
        <title>Sunwings | Add New Post</title>
      </Helmet>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <h1 className="text-black text-2xl ">Add New Post</h1>
          <Link to="/dashboard/all-posts">
            <button className="bg-blue-100 px-4 py-1 border border-blue-500 rounded-sm text-blue-500 hover:bg-gray-100 transition-all duration-300 ease-in-out">
              All Posts
            </button>
          </Link>
        </div>
        <div>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data, "draft"))}
            className="flex flex-col md:flex-row gap-9"
          >
            {/* Add Title & React Quill */}

            <div className="flex flex-col gap-6 md:w-2/3">
              <div className="form-control">
                <label htmlFor="postTitle" className="text-xl text-black mb-2">
                  Post Title:
                </label>
                <input
                  type="text"
                  name="postTitle"
                  {...register("postTitle")}
                  className="py-3 bg-white border border-gray-300 px-2 placeholder:text-2xl text-2xl placeholder:text-gray-500 text-black rounded-sm"
                  placeholder="Add title"
                />
              </div>

              <div className="form-control">
                <label
                  htmlFor="postThumbnail"
                  className="text-xl text-black mb-2"
                >
                  Thumbnail:
                </label>
                <input
                  type="file"
                  name="postThumbnail"
                  {...register("postThumbnail")}
                  className="py-3 bg-white border border-gray-300 px-2 placeholder:text-2xl text-2xl placeholder:text-gray-500 text-black rounded-sm"
                  placeholder="Add thumbnail"
                />
              </div>

              <div>
                <div className="text-red-600 flex items-center gap-1 pl-2">
                  <p className="text-black">Word Count:</p> {wordCount}
                </div>
                <ReactQuill
                  theme="snow"
                  value={quillValue}
                  onChange={handleQuillChange}
                  className="h-96 bg-white text-black"
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ color: [] }],
                      [{ align: [] }],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                />
              </div>
            </div>

            <div className="md:w-1/3 flex flex-col gap-3">
              <div
                className={`collapse-arrow w-full rounded-none select-none ${
                  categoryAccordionOpen ? "collapse-open" : "collapse-close"
                }`}
              >
                <div
                  onClick={toggleCategoryAccordion}
                  className="collapse-title text-xl font-medium bg-white border border-gray-400"
                >
                  <h1 className="text-black">Categories</h1>
                </div>
                <div
                  className={`collapse-content border border-gray-400 ${
                    categoryAccordionOpen ? "open" : ""
                  }`}
                >
                  <div className="mt-4">
                    <div className="mb-2 text-black">
                      <Select
                        className="z-30"
                        name="categories"
                        onChange={setSelectedCategories}
                        options={categoriesList}
                        classNamePrefix="text-black"
                        placeholder="Select Your Categories..."
                      />
                    </div>
                    <div className="p-2 bg-gray-200 mt-4">
                      <Link
                        to="/dashboard/categories"
                        className="hover:underline underline-offset-4"
                      >
                        <h1 className="text-blue-500 text-lg">
                          All Categories
                        </h1>
                      </Link>
                    </div>
                    {selectedCategories !== null &&
                      subcategories.length !== 0 && (
                        <div className="form-control">
                          <label
                            htmlFor="subCategoryName"
                            className="mb-2 mt-4 text-black"
                          >
                            Sub Category Name:{" "}
                          </label>
                          <Select
                            {...register("subCategory")}
                            onChange={handleSubCategoryChange}
                            options={subcategories.map((subcategory) => ({
                              value: subcategory,
                              label: subcategory,
                            }))}
                            className="text-black bg-white border border-gray-300"
                          />
                        </div>
                      )}
                    {subcategories.length === 0 && (
                      <span className="text-red-600 mt-4">
                        Selected category has no sub-category
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`collapse-arrow w-full rounded-none select-none ${
                  publishAccordionOpen ? "collapse-open" : "collapse-close"
                }`}
              >
                <div
                  onClick={togglePublishAccordion}
                  className="collapse-title text-xl font-medium bg-white border border-gray-400"
                >
                  <h1 className="text-black">Publish</h1>
                </div>
                <div
                  className={`collapse-content border border-gray-400 ${
                    publishAccordionOpen ? "open" : ""
                  }`}
                >
                  <div className="flex flex-row justify-between mt-4">
                    <button
                      type="button"
                      className="px-4 py-1 border border-green-600 bg-transparent hover:bg-green-600 text-green-600 hover:text-white font-medium"
                      onClick={() => onSubmit({}, "draft")}
                    >
                      {daftLoading ? "Saving..." : "Save Draft"}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSubmit({}, "pending")}
                      className="px-4 py-1 border border-blue-600 bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white font-medium"
                    >
                      {loading ? "Posting..." : "Add post"}
                    </button>

                    {/* <button className="px-4 py-1 border border-red-600 bg-transparent hover:bg-red-600 text-red-600 hover:text-white font-medium">
                      Move to Trash
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-10 w-1/2 max-w-4xl">
        <h1 className="text-xl text-black my-5">Your Post Preview:</h1>
        <div
          dangerouslySetInnerHTML={{ __html: quillValue }}
          className="md:max-w-4xl text-black"
        />
      </div>
    </div>
  );
};

export default AddNewPost;
