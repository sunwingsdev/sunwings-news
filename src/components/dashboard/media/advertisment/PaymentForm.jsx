import { useForm } from "react-hook-form";
import { useAddPaymentInfoMutation } from "../../../../redux/features/allApis/paymentApi/paymentApi";
import toast from "react-hot-toast";

const PaymentForm = ({ closeModal }) => {
  const [addPaymentInfo] = useAddPaymentInfoMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await addPaymentInfo(data);
      console.log(result);
      if (result.data.insertedId) {
        toast.success("Payment added");
        closeModal();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  return (
    <div>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Method:
          </label>
          <select
            name="role"
            {...register("method", { required: true })}
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black placeholder:text-gray-500"
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

        <div className="form-control">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black placeholder:text-gray-500"
          />
          {errors.name && (
            <span className="text-red-600">Name field is required</span>
          )}
        </div>

        <div className="form-control">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
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
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black placeholder:text-gray-500"
            placeholder="Enter valid email"
          />
          {errors.email && (
            <span className="text-red-600">Enter valid email address</span>
          )}
        </div>

        <div className="form-control">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Number:
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
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black placeholder:text-gray-500"
          />
          {errors.phone && (
            <span className="text-red-600">{errors.phone.message}</span>
          )}
        </div>

        <div className="form-control">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            type="text"
            {...register("price", {
              required: true,
              pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
            })}
            placeholder="Enter price you had paid"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black placeholder:text-gray-500"
          />
          {errors.price && (
            <span className="text-red-600">Price is required</span>
          )}
        </div>

        <div className="form-control">
          <label
            htmlFor="transactionId"
            className="block text-sm font-medium text-gray-700"
          >
            Transaction id:
          </label>
          <input
            type="text"
            {...register("transactionId", { required: true })}
            placeholder="Enter transaction id"
            className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black placeholder:text-gray-500"
          />
          {errors.transactionId && (
            <span className="text-red-600">Transaction id is required</span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-info mt-2 w-full text-white text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
