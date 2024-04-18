import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useUploadAnAdvertisementMutation } from "../../../redux/features/allApis/advertisementApi/advertisementApi";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";

const CreateAnAd = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [adLink, setAdLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [payableAmount, setPayableAmount] = useState(1000);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [priceError, setPriceError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const calculatePayableAmount = () => {
    let amount = 0; // Default amount
    // Calculate amount based on selected position
    switch (selectedPosition) {
      case "beside_top_logo":
        amount += 2500; // Additional amount for this position
        break;
      case "beside_news_slider_top_right_corner":
        amount += 2000; // Additional amount for this position
        break;
      case "jatio_category_top_left":
        amount += 1000; // Additional amount for this position
        break;
      case "jatio_category_top_right":
        amount += 1000; // Additional amount for this position
        break;
      case "binodon_category_top_left":
        amount += 1000; // Additional amount for this position
        break;
      case "binodon_category_top_right":
        amount += 1000; // Additional amount for this position
        break;
      case "video_section_top_left":
        amount += 1200; // Additional amount for this position
        break;
      case "video_section_top_right":
        amount += 1200; // Additional amount for this position
        break;
      case "video_section_bottom_left":
        amount += 1200; // Additional amount for this position
        break;
      case "video_section_bottom_right":
        amount += 1200; // Additional amount for this position
        break;
      case "center_home_page":
        amount += 2000; // Additional amount for this position
        break;
      // Add cases for other positions as needed
      default:
        break;
    }

    // Calculate amount based on selected duration
    switch (selectedDuration) {
      case "1":
        amount *= 1;
        break;
      case "3":
        amount *= 1.5;
        break;
      case "7":
        amount *= 2;
        break;
      case "10":
        amount *= 3;
        break;
      default:
        break;
    }

    setPayableAmount(amount);
  };

  useEffect(() => {
    calculatePayableAmount();
  }, [selectedDuration, selectedPosition]);

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

  const handleChangeDuration = (event) => {
    setSelectedDuration(event.target.value);
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
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        setSelectedImage(img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  const handleChange = (event) => {
    setSelectedPosition(event.target.value);
  };
  const now = new Date();
  const onSubmit = async (data) => {
    try {
      if (image) {
        let requiredWidth, requiredHeight;

        // Check if payable amount matches the entered price
        if (parseFloat(data.price) !== parseFloat(payableAmount)) {
          setPriceError("Entered price does not match the Payable amount.");
          setLoading(false);
          return;
        }

        // Determine required dimensions based on selected position
        switch (selectedPosition) {
          case "beside_top_logo":
            requiredWidth = 240;
            requiredHeight = 32;
            break;
          case "beside_news_slider_top_right_corner":
            requiredWidth = 250;
            requiredHeight = 250;
            break;
          case "jatio_category_top_left":
            requiredWidth = 240;
            requiredHeight = 32;
            break;
          case "jatio_category_top_right":
            requiredWidth = 240;
            requiredHeight = 32;
            break;
          case "binodon_category_top_left":
            requiredWidth = 240;
            requiredHeight = 32;
            break;
          case "binodon_category_top_right":
            requiredWidth = 240;
            requiredHeight = 32;
            break;
          case "video_section_top_left":
            requiredWidth = 240;
            requiredHeight = 32;
            break;
          case "video_section_top_right":
            requiredWidth = 240;
            requiredHeight = 32;
            break;
          case "video_section_bottom_left":
            requiredWidth = 240;
            requiredHeight = 32;
            break;
          case "video_section_bottom_right":
            requiredWidth = 240;
            requiredHeight = 32;
            break;
          case "center_home_page":
            requiredWidth = 1600;
            requiredHeight = 250;
            break;

          // Add cases for other positions as needed
          default:
            // Default dimensions if position is not specified
            requiredWidth = 240;
            requiredHeight = 32;
        }

        // Check image dimensions
        const imageWidth = selectedImage.width;
        const imageHeight = selectedImage.height;
        if (imageWidth !== requiredWidth || imageHeight !== requiredHeight) {
          toast.error(
            `Image dimensions must be ${requiredWidth} x ${requiredHeight} pixels for the selected position.`
          );
          return;
        }

        setLoading(true);
        const imageData = await imageUpload(image);
        data.banner = imageData.data.url;
        data.createdAt = now;
        data.position = selectedPosition;
        data.link = adLink;
        data.duration = selectedDuration;
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
    <div>
      <Helmet>
        <title>Sunwings | Create an Advertisement</title>
      </Helmet>
      <h1 className="text-black text-2xl mb-6">Create an Ad</h1>
      <div className="flex flex-col gap-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          {/* Select Ad Position */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="adPostion" className="text-black">
              Select Ad Position:
            </label>
            <select
              name=""
              id=""
              onChange={handleChange}
              value={selectedPosition}
              className="bg-white border border-gray-500 px-3 py-2 text-black w-full md:w-1/2"
            >
              <option value="">Select Position...</option>
              <option value="beside_top_logo"> Beside Top Logo</option>
              <option value="beside_news_slider_top_right_corner">
                Beside News Slider Top Right Corner
              </option>
              <option value="jatio_category_top_left">
                Jatio Category Top Left
              </option>
              <option value="jatio_category_top_right">
                Jatio Category Top Right
              </option>
              <option value="center_home_page">Center of Home Page</option>
              <option value="binodon_category_top_left">
                Binodon Category Top Left
              </option>
              <option value="binodon_category_top_right">
                Binodon Category Top Right
              </option>
              <option value="video_section_top_left">
                Video Section Top Left
              </option>
              <option value="video_section_top_right">
                Video Section Top Right
              </option>
              <option value="video_section_bottom_left">
                Video Section Bottom Left
              </option>
              <option value="video_section_bottom_right">
                Video Section Bottom Right
              </option>
            </select>
          </div>
          {/* Link */}
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
          {/* Ad Image */}
          <div className="flex flex-col md:w-1/2">
            <div className="flex flex-col gap-2">
              <label htmlFor="banner">
                Ad Image:{" "}
                {selectedPosition === "beside_top_logo" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 240 x 32 px **
                  </small>
                )}
                {selectedPosition === "jatio_category_top_left" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 240 x 32 px **
                  </small>
                )}
                {selectedPosition === "jatio_category_top_right" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 240 x 32 px **
                  </small>
                )}
                {selectedPosition === "binodon_category_top_left" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 240 x 32 px **
                  </small>
                )}
                {selectedPosition === "binodon_category_top_right" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 240 x 32 px **
                  </small>
                )}
                {selectedPosition === "video_section_top_left" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 240 x 32 px **
                  </small>
                )}
                {selectedPosition === "video_section_top_right" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 240 x 32 px **
                  </small>
                )}
                {selectedPosition === "video_section_bottom_left" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 240 x 32 px **
                  </small>
                )}
                {selectedPosition === "video_section_bottom_right" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 240 x 32 px **
                  </small>
                )}
                {selectedPosition === "beside_news_slider_top_right_corner" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 250 x 250 px **
                  </small>
                )}
                {selectedPosition === "center_home_page" && (
                  <small className="text-red-600 font-semibold">
                    ** File Size Must be 1600 x 250 px **
                  </small>
                )}
              </label>

              <div
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                className="border-dashed border-2 border-gray-300 rounded-lg text-center p-5 w-full flex flex-col items-center justify-center"
              >
                <input
                  type="file"
                  id="banner"
                  accept=".jpg, .jpeg, .png, .gif" // specify accepted file types
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      const file = e.target.files[0];
                      const fileName = file.name.toLowerCase(); // get the file name and convert to lowercase
                      const extensions = [".jpg", ".jpeg", ".png", ".gif"]; // allowed extensions

                      // Check if the file extension is valid
                      const isValidExtension = extensions.some((ext) =>
                        fileName.endsWith(ext)
                      );

                      if (!isValidExtension) {
                        toast.error(
                          "Invalid file type. Please select a file with .jpg, .jpeg, .png, or .gif extension."
                        );
                        return;
                      }

                      displayImage(file);
                      setImage(file);
                    }
                  }}
                />

                <p className="text-lg text-black leading-3">Drag & Drop</p>
                <p className="text-lg text-black">or</p>
                <button
                  onClick={handleSelectFile}
                  className="bg-orange-600 px-5 py-1 text-white text-base rounded-md"
                >
                  Select file
                </button>
                <div className="flex flex-col">
                  <p className="text-black font-semibold">
                    accepted file extensions are
                  </p>
                  <small className="text-black text-xs italic">
                    .jpeg, .jpg, .png, .gif
                  </small>
                </div>
              </div>
            </div>

            {selectedImage && (
              <div className="flex flex-col items-start gap-4 mt-10 md:w-full">
                <p className="text-black">Ad Image Preview: </p>
                <img
                  src={selectedImage.src}
                  alt="Selected file"
                  className="w-full"
                />
              </div>
            )}
          </div>
          {/* Ad Duration */}
          <div className="form-control">
            <label htmlFor="duration" className="text-black">
              Ad Duration:
            </label>
            <select
              name="duration"
              onChange={handleChangeDuration}
              value={selectedDuration}
              className="bg-white px-3 py-2 border border-gray-500 w-full md:w-1/2 text-black"
            >
              <option value="" disabled selected>
                Select Duration
              </option>
              <option value="1">One Day</option>
              <option value="3">Three Days</option>
              <option value="7">One Week</option>
              <option value="10">Ten Days</option>
            </select>
            {errors.duration && (
              <span className="text-red-600">Please select duration</span>
            )}
          </div>
          {/* Payable Amount */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-5 gap-2">
            <h1 className="text-black text-xl">Payable Amount: </h1>
            <div className="bg-orange-600 px-4 py-2">
              <p className="text-lg text-white">
                {payableAmount} <small className="text-xs">Tk</small>
              </p>
            </div>
          </div>

          <h1 className="text-black text-lg">Payment Info: </h1>
          {/* Method */}
          <div className="form-control">
            <label htmlFor="role" className="text-black">
              Method:
            </label>
            <select
              name="role"
              {...register("method", { required: true })}
              className="bg-white px-3 py-2 border border-gray-500 w-full md:w-1/2 text-black"
            >
              <option value="" disabled selected>
                Select Method
              </option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
              <option value="upay">Upay</option>
            </select>
            {errors.method && (
              <span className="text-red-600">Please select method</span>
            )}
          </div>
          {/* Client Name */}
          <div className="form-control">
            <label htmlFor="name" className="text-black">
              Client Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              {...register("name", { required: true })}
              placeholder="Enter client name"
              className="bg-white px-3 py-2 border border-gray-500 w-full md:w-1/2 text-black"
            />
            {errors.name && (
              <span className="text-red-600">Name field is required</span>
            )}
          </div>
          {/* Client Email */}
          <div className="form-control">
            <label htmlFor="email" className="text-black">
              Client Email:
            </label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              className="bg-white px-3 py-2 border border-gray-500 w-full md:w-1/2 text-black"
              placeholder="Enter client valid email"
            />
            {errors.email && (
              <span className="text-red-600">Enter valid email address</span>
            )}
          </div>
          {/* Phone Number */}
          <div className="form-control">
            <label htmlFor="phone" className="text-black">
              Phone Number:
            </label>
            <input
              type="text"
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^(?:\+?88|0088)?01[3-9]\d{8}$/,
                  message: "Enter a valid Bangladeshi phone number",
                },
              })}
              placeholder="Enter bKash/Nagad/Rocket/Upay number"
              className="bg-white px-3 py-2 border border-gray-500 w-full md:w-1/2 text-black"
            />
            {errors.phone && (
              <span className="text-red-600">{errors.phone.message}</span>
            )}
          </div>
          {/* Price */}
          <div className="form-control">
            <label htmlFor="price" className="text-black">
              Price:
            </label>
            <input
              type="text"
              {...register("price", {
                required: true,
                pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
              })}
              placeholder="Enter price you had paid"
              className="bg-white px-3 py-2 border border-gray-500 w-full md:w-1/2 text-black"
            />
            {errors.price && (
              <span className="text-red-600">Price is required</span>
            )}
            {priceError && <span className="text-red-600">{priceError}</span>}
          </div>
          {/* Transaction Id */}
          <div className="form-control">
            <label htmlFor="transactionId" className="text-black">
              Transaction id:
            </label>
            <input
              type="text"
              {...register("transactionId", { required: true })}
              placeholder="Enter transaction id"
              className="bg-white px-3 py-2 border border-gray-500 w-full md:w-1/2 text-black"
            />
            {errors.transactionId && (
              <span className="text-red-600">Transaction id is required</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-orange-600 px-5 py-1 text-white text-base rounded-md w-full md:w-1/2"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-1">
                <span className="loading loading-spinner loading-md"></span>{" "}
                Creating...
              </div>
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAnAd;
