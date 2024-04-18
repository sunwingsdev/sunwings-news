import { Helmet } from "react-helmet-async";
import { IoIosSend } from "react-icons/io";
import { useSendEmailMutation } from "../../../redux/features/allApis/userSupportApi/userSupportApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Support = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [sendEmail] = useSendEmailMutation();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const result = await sendEmail(data);

      // Show toast based on response
      if (result.data) {
        reset();
        setLoading(false);
        toast.success("Message sent successfully.");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      setLoading(false);
      toast.error(`An error occurred: ${error}`);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Sunwings | Support</title>
      </Helmet>

      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl text-black font-semibold">How Can We Help?</h1>
        <p className="text-xl text-black">Contact Us.</p>
        <p className="text-lg text-black underline">Sunwings Group</p>
        <p className="text-base text-black">Website : www.sunwingsairfly.com</p>
        <p className="text-base text-black">
          Facebook : www.facebook.com/sunwingtourstravels
        </p>
        <p className="text-base text-black">Email : sunwingsgroup@gmail.com</p>
        <p className="text-base text-black">
          Mobile : +8801732-667364, +8801753-842842
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center mt-10">
        <h1 className="text-2xl text-black font-semibold">Need Support?</h1>
        <p className="text-lg text-black">
          We are here for 24 / 7 customer support.
        </p>
        <div className="w-full md:w-1/2 mb-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2"
          >
            <div className="form-control">
              {errors.name && (
                <p className="text-red-600 font-semibold text-xs">
                  Name is Required *
                </p>
              )}
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                className="px-2 py-1 border border-orange-600 outline-none bg-white text-black w-full"
                placeholder="Your Name"
              />
            </div>
            <div className="form-control">
              {errors.subject && (
                <p className="text-red-600 font-semibold text-xs">
                  Subject is Required *
                </p>
              )}
              <input
                type="text"
                name="subject"
                {...register("subject", { required: true })}
                className="px-2 py-1 border border-orange-600 outline-none bg-white text-black w-full"
                placeholder="Subject"
              />
            </div>
            <div className="form-control">
              {errors.email && (
                <p className="text-red-600 font-semibold text-xs">
                  Email is Required *
                </p>
              )}
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                className="px-2 py-1 border border-orange-600 outline-none bg-white text-black w-full"
                placeholder="Your Email"
              />
            </div>
            <div className="form-control">
              {errors.message && (
                <p className="text-red-600 font-semibold text-xs">
                  Message is Required *
                </p>
              )}
              <textarea
                name="message"
                {...register("message", { required: true })}
                cols="30"
                rows="5"
                className="px-2 py-1 border border-orange-600 outline-none bg-white text-black w-full"
                placeholder="Please Enter the Details Here"
              ></textarea>
            </div>
            <div className="form-control">
              <button
                type="submit"
                className="flex gap-1 justify-center px-2 py-1 border border-orange-600 bg-orange-600 text-black hover:bg-white transition-all ease-in-out duration-500"
              >
                {loading ? (
                  <span className="flex gap-1 items-center">
                    <span className="loading loading-spinner text-black"></span>{" "}
                    Sending...
                  </span>
                ) : (
                  <>
                    <IoIosSend className="text-lg" /> Send
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
