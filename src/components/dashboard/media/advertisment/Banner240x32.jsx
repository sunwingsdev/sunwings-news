import { useState } from "react";
import { useUploadAnAdvertisementMutation } from "../../../../redux/features/allApis/advertisementApi/advertisementApi";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../api/utils";

const Banner240x32 = () => {
  return <div className="flex flex-col gap-4"></div>;
};

export default Banner240x32;
