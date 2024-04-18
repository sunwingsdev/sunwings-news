import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetFooterQuery,
  useUpdateFooterMutation,
} from "../../../../redux/features/allApis/footerApi/footerApi";
import Swal from "sweetalert2";
import { imageUpload } from "../../../../api/utils";

const FooterContent = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: allFooters } = useGetFooterQuery();
  const [updateFooter] = useUpdateFooterMutation();
  const id = allFooters?.[0]._id;
  const singleFooter = allFooters?.[0];

  const onSubmit = async (data) => {
    const footerImage = data?.footerLogo;

    try {
      setLoading(true);

      const imageData = await imageUpload(footerImage[0]);
      console.log(imageData);
      data.footerLogo = imageData.data.display_url;

      const result = await updateFooter({
        id: id,
        data: data,
      });
      if (result.data.modifiedCount > 0) {
        setLoading(false);
        reset();
        Swal.fire({
          title: "Footer Updated Successfully!",
          text: "Press OK to continue",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error Updating Footer: ${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-3">
        <h1 className="text-black text-lg">Footer Content</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="form-control text-black flex flex-col ">
          <label htmlFor="footerLogo" className="text-lg">
            Footer Logo :{" "}
            {errors.footerLogo && (
              <span className="text-red-600">
                ** ঘরটি অবশ্যই পূরণ করতে হবে **
              </span>
            )}
          </label>
          <input
            type="file"
            name="footerLogo"
            {...register("footerLogo", { required: true })}
            // defaultValue={singleFooter?.about}
            className="bg-white border border-gray-400 p-1"
          />
        </div>

        <div className="form-control text-black flex flex-col ">
          <label htmlFor="about" className="text-lg">
            Footer about :{" "}
            {errors.about && (
              <span className="text-red-600">
                ** ঘরটি অবশ্যই পূরণ করতে হবে **
              </span>
            )}
          </label>
          <textarea
            name="about"
            id=""
            cols="30"
            rows="5"
            {...register("about", { required: true })}
            defaultValue={singleFooter?.about}
            className="bg-white border border-gray-400 p-1"
          ></textarea>
        </div>

        <div className="form-control text-black flex flex-col gap-2 ">
          <label
            htmlFor="sompadok"
            className="text-lg underline underline-offset-4"
          >
            সম্পাদকীয়
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="sompadokAndProkashok">
                সম্পাদক ও প্রকাশক :{" "}
                {errors.sompadokAndProkashok && (
                  <span className="text-red-600">
                    ** ঘরটি অবশ্যই পূরণ করতে হবে **
                  </span>
                )}
              </label>
              <input
                type="text"
                name="sompadokAndProkashok"
                {...register("sompadokAndProkashok", { required: true })}
                defaultValue={singleFooter?.sompadokAndProkashok}
                className="bg-white border border-gray-400 px-2 py-1"
                placeholder="আব্দুল হাসিম চৌধুরী"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="nirbahiSompadok">
                নির্বাহী সম্পাদক :{" "}
                {errors.nirbahiSompadok && (
                  <span className="text-red-600">
                    ** ঘরটি অবশ্যই পূরণ করতে হবে **
                  </span>
                )}
              </label>
              <input
                type="text"
                name="nirbahiSompadok"
                {...register("nirbahiSompadok", { required: true })}
                defaultValue={singleFooter?.nirbahiSompadok}
                className="bg-white border border-gray-400 px-2 py-1"
                placeholder="আবু রায়হান"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="bartaSompadok">
                বার্তা সম্পাদক :{" "}
                {errors.bartaSompadok && (
                  <span className="text-red-600">
                    ** ঘরটি অবশ্যই পূরণ করতে হবে **
                  </span>
                )}
              </label>
              <input
                type="text"
                name="bartaSompadok"
                {...register("bartaSompadok", { required: true })}
                defaultValue={singleFooter?.bartaSompadok}
                className="bg-white border border-gray-400 px-2 py-1"
                placeholder="আবু হুরায়রা চৌধুরী"
              />
            </div>
          </div>
        </div>

        <div className="form-control text-black flex flex-col gap-2 ">
          <label
            htmlFor="office"
            className="text-lg underline underline-offset-4"
          >
            অফিস
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="officeAddress">
                অফিস Address:{" "}
                {errors.officeAddress && (
                  <span className="text-red-600">
                    ** ঘরটি অবশ্যই পূরণ করতে হবে **
                  </span>
                )}
              </label>
              <input
                type="text"
                name="officeAddress"
                {...register("officeAddress", { required: true })}
                defaultValue={singleFooter?.officeAddress}
                className="bg-white border border-gray-400 px-2 py-1"
                placeholder="মিরপুর, ঢাকা, বাংলাদেশ-১২১৬"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="officeEmail">
                অফিস Email :{" "}
                {errors.officeEmail && (
                  <span className="text-red-600">
                    ** ঘরটি অবশ্যই পূরণ করতে হবে **
                  </span>
                )}
              </label>
              <input
                type="text"
                name="officeEmail"
                {...register("officeEmail", { required: true })}
                defaultValue={singleFooter?.officeEmail}
                className="bg-white border border-gray-400 px-2 py-1"
                placeholder="vismodeb2000@gamil.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="officeMobile">
                অফিস Mobile :{" "}
                {errors.officeMobile && (
                  <span className="text-red-600">
                    ** ঘরটি অবশ্যই পূরণ করতে হবে **
                  </span>
                )}
              </label>
              <input
                type="text"
                name="officeMobile"
                {...register("officeMobile", { required: true })}
                defaultValue={singleFooter?.officeMobile}
                className="bg-white border border-gray-400 px-2 py-1"
                placeholder="01737351549"
              />
            </div>
          </div>
        </div>

        <div className="form-control text-black flex flex-col gap-1 ">
          <label htmlFor="copyrightLink">
            Copyright Owner Text :{" "}
            {errors.copyrightText && (
              <span className="text-red-600">
                ** ঘরটি অবশ্যই পূরণ করতে হবে **
              </span>
            )}
          </label>
          <input
            type="text"
            name="copyrightText"
            {...register("copyrightText", { required: true })}
            defaultValue={singleFooter?.copyrightText}
            className="bg-white border border-gray-400 px-2 py-1"
            placeholder="Sunwings Group"
          />
        </div>

        <div className="form-control text-black flex flex-col gap-1 ">
          <label htmlFor="copyrightLink">
            Copyright link :{" "}
            {errors.copyrightLink && (
              <span className="text-red-600">
                ** ঘরটি অবশ্যই পূরণ করতে হবে **
              </span>
            )}
          </label>
          <input
            type="text"
            name="copyrightLink"
            {...register("copyrightLink", { required: true })}
            defaultValue={singleFooter?.copyrightLink}
            className="bg-white border border-gray-400 px-2 py-1"
            placeholder="www.example.com"
          />
        </div>

        <button
          type="submit"
          className="py-1 bg-blue-600 text-white font-semibold "
        >
          {loading ? (
            <div className="flex items-center justify-center gap-1">
              <span className="loading loading-spinner loading-md"></span>{" "}
              Updating...
            </div>
          ) : (
            "Update Footer Content"
          )}
        </button>
      </div>
    </form>
  );
};

export default FooterContent;
