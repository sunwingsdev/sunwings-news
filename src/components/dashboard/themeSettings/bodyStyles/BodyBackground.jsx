import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetBodyThemeQuery } from "../../../../redux/features/allApis/bodyThemeApi/bodyThemeApi";

const BodyBackground = ({
  onSubmit,
  labelH1,
  subLabel,
  BgColor,
  Bglabel,
  TextFontSize,
  TextFontColor,
  TextFontSizeLabel,
  TextFontColorLabel,
  ImageSizeLabel,
  ImageSize,
  Border,
  BorderLabel,
  BorderColor,
  BorderColorLabel,
  BorderWidth,
  BorderWidthLabel,
  BorderStyle,
  BorderStyleLabel,
  loading,
}) => {
  const [bgColor, setBgColor] = useState("");
  const [textColorValue, setTextColorValue] = useState("");
  const [fontSizeValue, setFontSizeValue] = useState("");
  const [imageSizeValue, setImageSizeValue] = useState("");
  const [borderValue, setBorderValue] = useState("");
  const [borderColorValue, setBorderColorValue] = useState("");
  const [borderWidthValue, setBorderWidthValue] = useState("");
  const [borderStyleValue, setBorderStyleValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { data: bodyThemes } = useGetBodyThemeQuery();

  useEffect(() => {
    if (bodyThemes) {
      // Set default background color
      setBgColor(bodyThemes[0]?.[BgColor] || "");

      // Set default text color
      setTextColorValue(bodyThemes[0]?.[TextFontColor] || "");

      // Set default font size
      setFontSizeValue(bodyThemes[0]?.[TextFontSize] || "");

      // Set default Image size
      setImageSizeValue(bodyThemes[0]?.[ImageSize] || "");

      // Set default Border
      setBorderValue(bodyThemes[0]?.[Border] || "");

      // Set default Border Color
      setBorderColorValue(bodyThemes[0]?.[BorderColor] || "");

      // Set default Border Width
      setBorderWidthValue(bodyThemes[0]?.[BorderWidth] || "");

      // Set default Border Style
      setBorderStyleValue(bodyThemes[0]?.[BorderStyle] || "");
    }
  }, [
    bodyThemes,
    BgColor,
    TextFontColor,
    TextFontSize,
    ImageSize,
    Border,
    BorderColor,
    BorderWidth,
    BorderStyle,
  ]);

  const handleBgColorChange = (color) => {
    setValue(BgColor, color);
    setBgColor(color);
  };

  const handleTextColorChange = (color) => {
    setValue(TextFontColor, color);
    setTextColorValue(color);
  };

  const handleFontSizeChange = (e) => {
    setValue(TextFontSize, e.target.value);
    setFontSizeValue(e.target.value);
  };

  const handleImageSizeChange = (e) => {
    setValue(ImageSize, e.target.value);
    setImageSizeValue(e.target.value);
  };

  const handleBorderChange = (e) => {
    setValue(Border, e.target.value);
    setBorderValue(e.target.value);
  };
  console.log(borderValue);
  const handleBorderColorChange = (color) => {
    setValue(BorderColor, color);
    setBorderColorValue(color);
  };

  const handleBorderWidthChange = (e) => {
    setValue(BorderWidth, e.target.value);
    setBorderWidthValue(e.target.value);
  };

  const handleBorderStyleChange = (e) => {
    setValue(BorderStyle, e.target.value);
    setBorderStyleValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex flex-col gap-1 w-full ">
        <label htmlFor="" className="flex flex-col items-start ">
          <span className="text-xl leading-3">{labelH1}:</span>
          <span className="text-sm text-orange-600 italic ">{subLabel}</span>
        </label>

        <div className="flex flex-col gap-1">
          {errors.BgColor && (
            <p className="text-red-600 text-sm italic">
              <span className="font-semibold">BgColor</span> is Required **
            </p>
          )}
          {errors[TextFontSize] && (
            <p className="text-red-600 text-sm italic">
              <span className="font-semibold">Font Size</span> is Required **
            </p>
          )}
          {errors.TextFontColor && (
            <p className="text-red-600 text-sm italic">
              <span className="font-semibold">Font Color</span> is Required **
            </p>
          )}
          {errors.ImageSize && (
            <p className="text-red-600 text-sm italic">
              <span className="font-semibold">Image Size</span> is Required **
            </p>
          )}
          {errors.Border && (
            <p className="text-red-600 text-sm italic">
              <span className="font-semibold">Border</span> is Required **
            </p>
          )}
          {errors.BorderColor && (
            <p className="text-red-600 text-sm italic">
              <span className="font-semibold">Border Color</span> is Required **
            </p>
          )}
          {errors.BorderWidth && (
            <p className="text-red-600 text-sm italic">
              <span className="font-semibold">Border Width</span> is Required **
            </p>
          )}
          {errors.BorderStyle && (
            <p className="text-red-600 text-sm italic">
              <span className="font-semibold">Border Style</span> is Required **
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row items-start md:items-start lg:items-start xl:items-end 2xl:items-end gap-3 w-full ">
          {BgColor && (
            <div className="flex flex-row md:flex-row lg:flex-row xl:flex-row items-end gap-3 w-full md:w-full lg:w-4/12 xl:w-56">
              <div className="form-control w-full">
                <label htmlFor={BgColor} className="text-lg">
                  {Bglabel} :
                </label>
                <input
                  type="text"
                  name={BgColor}
                  {...register(BgColor, {
                    required: true,
                  })}
                  defaultValue={bgColor}
                  onChange={handleFontSizeChange}
                  placeholder="Ex. #ffff"
                  className="px-2 py-1 bg-white border border-orange-600 w-full"
                />
              </div>
              <input
                type="color"
                name="color"
                {...register("takenBgColor")}
                onChange={(e) => handleBgColorChange(e.target.value)}
                className="h-8 "
              />
            </div>
          )}
          {TextFontSize && (
            <div className="flex flex-row md:flex-row lg:flex-row xl:flex-row items-end gap-3 w-full md:w-full lg:w-4/12 xl:w-32">
              <div className="form-control w-full">
                <label htmlFor={TextFontSize} className="text-lg">
                  {TextFontSizeLabel}:
                </label>
                <input
                  type="number"
                  name={TextFontSize}
                  {...register(TextFontSize, { required: true })}
                  defaultValue={fontSizeValue}
                  placeholder="Only Number"
                  className="px-2 py-1 bg-white border border-orange-600 w-full"
                />
              </div>
            </div>
          )}
          {TextFontColor && (
            <div className="flex flex-row md:flex-row lg:flex-row xl:flex-row items-end gap-3 w-full md:w-full lg:w-4/12 xl:w-56">
              <div className="form-control w-full">
                <label htmlFor={TextFontColor} className="text-lg">
                  {TextFontColorLabel}:
                </label>
                <input
                  type="text"
                  name={TextFontColor}
                  {...register(TextFontColor, { required: true })}
                  defaultValue={textColorValue}
                  placeholder="Ex. #ffff"
                  className="px-2 py-1 bg-white border border-orange-600 w-full"
                />
              </div>
              <input
                type="color"
                {...register("takenTextColor")}
                onChange={(e) => handleTextColorChange(e.target.value)}
                className="h-8"
              />
            </div>
          )}

          {ImageSize && (
            <div className="flex flex-row md:flex-row lg:flex-row xl:flex-row items-end gap-3 w-full md:w-full lg:w-4/12 xl:w-56">
              <div className="form-control w-full">
                <label htmlFor={ImageSize} className="text-lg">
                  {ImageSizeLabel}:
                </label>
                <input
                  type="number"
                  name={ImageSize}
                  {...register(ImageSize, { required: true })}
                  defaultValue={imageSizeValue}
                  onChange={handleImageSizeChange}
                  placeholder="Only Number"
                  className="px-2 py-1 bg-white border border-orange-600 w-full"
                />
              </div>
            </div>
          )}

          {Border && (
            <div className="flex flex-row md:flex-row lg:flex-row xl:flex-row items-end gap-3 w-full md:w-full lg:w-4/12 xl:w-56">
              <div className="form-control w-full">
                <label htmlFor={Border} className="text-lg">
                  {BorderLabel}:
                </label>
                <select
                  name={Border}
                  {...register(Border, { required: true })}
                  defaultValue={borderValue}
                  onChange={handleBorderChange}
                  className="px-2 py-2 bg-white border border-orange-600 w-full"
                >
                  <option value="">Select One.</option>
                  <option value="no">No Border</option>
                  <option value="yes">Border</option>
                </select>
              </div>
            </div>
          )}

          {BorderWidth && (
            <div className="flex flex-row md:flex-row lg:flex-row xl:flex-row items-end gap-3 w-full md:w-full lg:w-4/12 xl:w-44 2xl:w-48">
              <div className="form-control w-full">
                <label htmlFor={BorderWidth} className="text-lg">
                  {BorderWidthLabel}:
                </label>
                <input
                  type="number"
                  name={BorderWidth}
                  {...register(BorderWidth, { required: true })}
                  defaultValue={borderWidthValue}
                  onChange={handleBorderWidthChange}
                  placeholder="Only Number"
                  className="px-2 py-1 bg-white border border-orange-600 w-full"
                />
              </div>
            </div>
          )}
          {BorderStyle && (
            <div className="flex flex-row md:flex-row lg:flex-row xl:flex-row items-end gap-3 w-full md:w-full lg:w-4/12 xl:w-44 2xl:w-48">
              <div className="form-control w-full">
                <label htmlFor={BorderStyle} className="text-lg">
                  {BorderStyleLabel}:
                </label>
                <select
                  name={BorderStyle}
                  {...register(BorderStyle, { required: true })}
                  defaultValue={borderStyleValue}
                  onChange={handleBorderStyleChange}
                  className="px-2 py-2 bg-white border border-orange-600 w-full"
                >
                  <option value="">Select One.</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="double">Double</option>
                  <option value="solid">Solid</option>
                  <option value="groove">Groove</option>
                  <option value="hidden">hidden</option>
                  <option value="inherit">Inherit</option>
                  <option value="initial">Initial</option>
                  <option value="inset">Inset</option>
                  <option value="none">None</option>
                  <option value="outset">Outset</option>
                  <option value="ridge">Ridge</option>
                  <option value="unset">Unset</option>
                </select>
              </div>
            </div>
          )}

          {BorderColor && (
            <div className="flex flex-row md:flex-row lg:flex-row xl:flex-row items-end gap-3 w-full md:w-full lg:w-4/12 xl:w-60">
              <div className="form-control w-full">
                <label htmlFor={BorderColor} className="text-lg">
                  {BorderColorLabel}:
                </label>
                <input
                  type="text"
                  name={BorderColor}
                  {...register(BorderColor, { required: true })}
                  defaultValue={borderColorValue}
                  placeholder="Ex. #ffff"
                  className="px-2 py-1 bg-white border border-orange-600 w-full"
                />
              </div>
              <input
                type="color"
                {...register("takenTextColor")}
                onChange={(e) => handleBorderColorChange(e.target.value)}
                className="h-8"
              />
            </div>
          )}

          <div>
            <button type="submit" className="px-4 py-1 bg-orange-600">
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BodyBackground;
