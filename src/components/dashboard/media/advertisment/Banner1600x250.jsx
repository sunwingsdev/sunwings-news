import { useState } from "react";
import { useUploadAnAdvertisementMutation } from "../../../../redux/features/allApis/advertisementApi/advertisementApi";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../api/utils";
import toast from "react-hot-toast";

const Banner1600x250 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [adLink, setAdLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { handleSubmit } = useForm();

  const [uploadAdvertisement] = useUploadAnAdvertisementMutation();

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
    const fileInput = document.getElementById("banner");
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
        data.banner = imageData.data.url;
        data.createdAt = now;
        data.position = "center_home_page";
        data.link = adLink;
        const response = await uploadAdvertisement(data);

        if (response.data.insertedId) {
          toast.success("Advertise Upload Successfully!");
          setLoading(false);
        } else {
          toast.error("Advertise Upload Failed!");
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error(`Error Uploading Advertise ${error.message}`);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2">
        <label htmlFor="adLink" className="text-black">
          Link:
        </label>
        <input
          type="text"
          name="adLink"
          placeholder="Advertisement Link if needed..."
          className="bg-white px-3 py-2 border border-gray-500 w-full md:w-1/2 text-black"
          onChange={(e) => {
            const linkVal = e.target.value;
            setAdLink(linkVal);
          }}
        />
      </div>
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
            id="banner"
            accept=".jpg, .jpeg, .png, .gif"
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
          <div className="mt-5 flex flex-col gap-2">
            <p className="text-black font-semibold">
              accepted file extensions are
            </p>
            <small className="text-black text-xs italic">
              .jpeg, .jpg, .png, .gif
            </small>
            <p className="text-red-600 font-semibold">
              ** Advertisement Size Must be 1600 x 250 px **
            </p>
          </div>
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
    </div>
  );
};

export default Banner1600x250;
