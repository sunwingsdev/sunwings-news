import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadALogoMutation } from "../../../../redux/features/allApis/logoApi/logoApi";
import { imageUpload } from "../../../../api/utils";
import toast from "react-hot-toast";

const UploadLogo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { handleSubmit } = useForm();

  const [uploadLogo] = useUploadALogoMutation();

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Display the dropped image
      displayImage(file);
    }
  };

  const handleSelectFile = (e) => {
    e.preventDefault(); // Prevent default behavior of the button click
    const fileInput = document.getElementById("logo");
    if (fileInput) {
      fileInput.value = null; // Reset file input
      fileInput.click();
    }
  };

  const displayImage = (file) => {
    setSelectedImage(URL.createObjectURL(file));
  };
  const now = new Date();
  const onSubmit = async (data) => {
    try {
      if (image) {
        setLoading(true);
        const imageData = await imageUpload(image);
        data.logo = imageData.data.display_url;
        data.position = "desktop_logo";
        data.createdAt = now;
        const response = await uploadLogo(data);

        if (response.data.insertedId) {
          toast.success("Logo Upload Successfully!");
          setLoading(false);
        } else {
          toast.error("Logo Upload Failed!");
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error(`Error Uploading Logo ${error.message}`);
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row w-full"
    >
      <div
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="border-dashed border-2 border-gray-300 rounded-lg text-center p-12 md:w-1/2 flex flex-col items-center justify-center"
      >
        <input
          type="file"
          id="logo"
          //   accept=".jpg, .jpeg, .png, .gif"

          className="hidden"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              const file = e.target.files[0];
              displayImage(file);
              setImage(file);
            }
          }}
        />
        <p className="text-xl text-black">Drop files to upload </p>
        <p className="mb-4 text-lg text-black">or</p>
        <button
          onClick={handleSelectFile}
          className="bg-blue-600 px-5 py-2 text-white text-2xl rounded-md"
        >
          Select file
        </button>
      </div>
      {selectedImage && (
        <div className="flex flex-col items-center gap-4 mt-10 md:w-1/2">
          <img src={selectedImage} alt="Selected file" className="w-80" />
          <button
            type="submit"
            className="bg-blue-600 px-5 py-2 text-white text-2xl rounded-md"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-1">
                <span className="loading loading-spinner loading-md"></span>{" "}
                Uploading...
              </div>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      )}
    </form>
  );
};

export default UploadLogo;
