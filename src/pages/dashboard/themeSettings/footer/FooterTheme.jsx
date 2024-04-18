import { useRef, useState } from "react";
import { ChromePicker } from "react-color";
import { useForm } from "react-hook-form";
import { FaPalette } from "react-icons/fa";
import "./FooterTheme.css";
import { useUpdateFooterThemeMutation } from "../../../../redux/features/allApis/footerApi/footerThemeApi";
import Swal from "sweetalert2";
import { useGetFooterQuery } from "../../../../redux/features/allApis/footerApi/footerApi";
const FooterTheme = () => {
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#000000");
  const [iconColor, setIconColor] = useState("#000000");
  const [copyrightBgColor, setCopyrightBgColor] = useState("#000000");
  const [copyrightTextColor, setCopyrightTextColor] = useState("#000000");

  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showIconColorPicker, setShowIconColorPicker] = useState(false);
  const [showCopyrightBgColorPicker, setShowCopyrightBgColorPicker] =
    useState(false);
  const [showCopyrightTextColorPicker, setShowCopyrightTextColorPicker] =
    useState(false);

  const bgPickerRef = useRef(null);
  const textPickerRef = useRef(null);
  const iconPickerRef = useRef(null);
  const copyrightBgPickerRef = useRef(null);
  const copyrightTextPickerRef = useRef(null);

  const { handleSubmit, setValue } = useForm();

  const [updateFooterTheme] = useUpdateFooterThemeMutation();
  const { data: allFooters } = useGetFooterQuery();

  const singleFooter = allFooters?.[0];

  const id = allFooters?.[0]._id;

  const handleBgColorChange = (color) => {
    setValue("bgColor", color.hex);
    setBgColor(color.hex);
  };
  const handleTextColorChange = (color) => {
    setValue("textColor", color.hex);
    setTextColor(color.hex);
  };
  const handleIconColorChange = (color) => {
    setValue("iconColor", color.hex);
    setIconColor(color.hex);
  };
  const handleCopyrightBgColorChange = (color) => {
    setValue("copyrightBgColor", color.hex);
    setCopyrightBgColor(color.hex);
  };
  const handleCopyrightTextColorChange = (color) => {
    setValue("copyrightTextColor", color.hex);
    setCopyrightTextColor(color.hex);
  };

  const toggleBgColorPicker = () => {
    setShowBgColorPicker(!showBgColorPicker);
    setShowTextColorPicker(false);
    setShowIconColorPicker(false);
    setShowCopyrightBgColorPicker(false);
  };
  const toggleTextColorPicker = () => {
    setShowTextColorPicker(!showTextColorPicker);
    setShowBgColorPicker(false);
    setShowIconColorPicker(false);
    setShowCopyrightBgColorPicker(false);
    setShowCopyrightTextColorPicker(false);
  };

  const toggleIconColorPicker = () => {
    setShowIconColorPicker(!showIconColorPicker);
    setShowTextColorPicker(false);
    setShowBgColorPicker(false);
    setShowCopyrightBgColorPicker(false);
    setShowCopyrightTextColorPicker(false);
  };
  const toggleCopyrightBgColorPicker = () => {
    setShowCopyrightBgColorPicker(!showCopyrightBgColorPicker);
    setShowIconColorPicker(false);
    setShowTextColorPicker(false);
    setShowBgColorPicker(false);
    setShowCopyrightTextColorPicker(false);
  };
  const toggleCopyrightTextColorPicker = () => {
    setShowCopyrightTextColorPicker(!showCopyrightTextColorPicker);
    setShowCopyrightBgColorPicker(false);
    setShowIconColorPicker(false);
    setShowTextColorPicker(false);
    setShowBgColorPicker(false);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const result = await updateFooterTheme({ id: id, data: data });
      setLoading(false); // Ensure loading state is set to false
      if (result.data && result.data.modifiedCount > 0) {
        Swal.fire({
          title: "Footer Theme Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to update footer theme.",
          text: "No modifications made.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      setLoading(false); // Ensure loading state is set to false
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error during update footer theme.",
        text: `${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-black text-lg flex flex-col md:flex-row gap-1 md:gap-2">
          <span>Footer Theme</span>
          <small className="italic text-red-600">
            Click the Icon to pick a color **
          </small>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="form-control flex flex-col gap-2">
            <label
              htmlFor="footerBgColor"
              className="text-lg flex items-center gap-3"
            >
              <span>Footer Background Color:</span>
              <FaPalette
                className="cursor-pointer text-fuchsia-600"
                onClick={toggleBgColorPicker}
                title="Click here to pick a color"
              />
            </label>
            <input
              type="text"
              className="py-2 px-1 border border-orange-600 bg-white"
              defaultValue={
                bgColor !== "#000000" ? bgColor : singleFooter?.bgColor
              }
            />
            {showBgColorPicker && (
              <div ref={bgPickerRef} className="">
                <ChromePicker
                  className="text-black"
                  color={bgColor}
                  onChangeComplete={(color) => handleBgColorChange(color)}
                />
              </div>
            )}
          </div>

          <div className="form-control flex flex-col gap-2">
            <label
              htmlFor="footerBg"
              className="text-lg flex items-center gap-3"
            >
              <span>Footer Text Color:</span>
              <FaPalette
                className="cursor-pointer text-fuchsia-600"
                onClick={toggleTextColorPicker}
                title="Click here to pick a color"
              />
            </label>
            <input
              type="text"
              className="py-2 px-1 border border-orange-600 bg-white"
              defaultValue={
                textColor !== "#000000" ? textColor : singleFooter?.textColor
              }
            />
            {showTextColorPicker && (
              <div className="">
                <ChromePicker
                  ref={textPickerRef}
                  color={textColor}
                  onChangeComplete={(color) => handleTextColorChange(color)}
                />
              </div>
            )}
          </div>

          <div className="form-control flex flex-col gap-2">
            <label
              htmlFor="footerBg"
              className="text-lg flex items-center gap-3"
            >
              <span>Footer Icons Color:</span>
              <FaPalette
                className="cursor-pointer text-fuchsia-600"
                onClick={toggleIconColorPicker}
                title="Click here to pick a color"
              />
            </label>
            <input
              type="text"
              className="py-2 px-1 border border-orange-600 bg-white"
              defaultValue={
                iconColor !== "#000000" ? iconColor : singleFooter?.iconColor
              }
            />
            {showIconColorPicker && (
              <div className="">
                <ChromePicker
                  ref={iconPickerRef}
                  color={iconColor}
                  onChangeComplete={(color) => handleIconColorChange(color)}
                />
              </div>
            )}
          </div>

          <div className="form-control flex flex-col gap-2">
            <label
              htmlFor="copyrightBg"
              className="text-lg flex items-center gap-3"
            >
              <span>Footer Copyright Background Color:</span>
              <FaPalette
                className="cursor-pointer text-fuchsia-600"
                onClick={toggleCopyrightBgColorPicker}
                title="Click here to pick a color"
              />
            </label>
            <input
              type="text"
              className="py-2 px-1 border border-orange-600 bg-white"
              defaultValue={
                copyrightBgColor !== "#000000"
                  ? copyrightBgColor
                  : singleFooter?.copyrightBgColor
              }
            />
            {showCopyrightBgColorPicker && (
              <div className="">
                <ChromePicker
                  ref={copyrightBgPickerRef}
                  color={copyrightBgColor}
                  onChangeComplete={(color) =>
                    handleCopyrightBgColorChange(color)
                  }
                />
              </div>
            )}
          </div>

          <div className="form-control flex flex-col gap-2">
            <label
              htmlFor="copyrightTextColor"
              className="text-lg flex items-center gap-3"
            >
              <span>Footer Copyright Text Color:</span>
              <FaPalette
                className="cursor-pointer text-fuchsia-600"
                onClick={toggleCopyrightTextColorPicker}
                title="Click here to pick a color"
              />
            </label>
            <input
              type="text"
              className="py-2 px-1 border border-orange-600 bg-white"
              defaultValue={
                copyrightTextColor !== "#000000"
                  ? copyrightTextColor
                  : singleFooter?.copyrightTextColor
              }
            />

            {showCopyrightTextColorPicker && (
              <div className="">
                <ChromePicker
                  ref={copyrightTextPickerRef}
                  color={copyrightTextColor}
                  onChangeComplete={(color) =>
                    handleCopyrightTextColorChange(color)
                  }
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="py-1 bg-blue-600 text-white font-semibold w-full"
            >
              {loading ? "Updating..." : "Update Footer Color"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FooterTheme;
