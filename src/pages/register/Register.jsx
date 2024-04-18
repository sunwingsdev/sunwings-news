import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";
import { useAddNewUserMutation } from "../../redux/features/allApis/usersApi/usersApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, setUser, updateUserProfile, loading, setLoading, user } =
    useContext(AuthContext);
  const [addNewUser] = useAddNewUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);

    // image upload
    const image = data.photo[0];
    imageUpload(image).then((imageData) => {
      const imageUrl = imageData?.data?.display_url;
      createUser(data.email, data.password)
        .then((result) => {
          updateUserProfile(data.name, imageUrl).then(() => {
            setUser({
              ...user,
              displayName: data.name,
              photoUrl: imageUrl,
            });
            const userInfo = {
              uid: result.user?.uid,
              name: data.name,
              image: imageUrl,
              email: data.email,
              role: data.role,
            };
            addNewUser(userInfo)
              .then((result) => {
                console.log("data", result);
                if (result.data) {
                  setLoading(false);
                  console.log(data);
                  toast.success("Registration Successful!");
                  reset();
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error("Registration Failed!");
              });
          });
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.message);
        });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>Sunwings | Add New User</title>
      </Helmet>
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Add New User
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Photo:
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              {...register("photo")}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black placeholder:text-gray-500"
            />
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
              {...register("email", { required: true })}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black placeholder:text-gray-500"
              placeholder="Enter your email"
            />
            {errors.name && (
              <span className="text-red-600">Email field is required</span>
            )}
          </div>
          <div className="form-control">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role:
            </label>
            <select
              name="role"
              {...register("role", { required: true })}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black placeholder:text-gray-500"
            >
              <option disabled value="">
                Select a role
              </option>
              <option value="journalist">Journalist/Reporter</option>
              <option value="editor">Editor</option>
              <option value="administrator">Administrator</option>
            </select>
          </div>
          <div className="form-control">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <div className="flex items-center w-full bg-white p-1 border rounded-md focus:ring focus:outline-none focus:border-blue-500">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                className="mt-1 p-3 w-full bg-white text-black placeholder:text-gray-500"
                placeholder="Enter your password"
              />
              <div
                className="cursor-pointer mr-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && (
              <span className="text-red-600">
                {errors.password.type === "required" &&
                  "Password field is required"}
                {errors.password.type === "minLength" &&
                  "Password must be at least 6 characters long"}
                {errors.password.type === "pattern" &&
                  "Password must contain at least one uppercase, one lowercase letter, one number and one special character"}
              </span>
            )}
          </div>
          <div className="form-control">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password:
            </label>
            <div className="flex items-center w-full bg-white p-1 border rounded-md focus:outline-none focus:ring focus:border-blue-500">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === watch("password") || "Password do not match",
                })}
                className="mt-1 p-3 w-full bg-white text-black placeholder:text-gray-500"
                placeholder="Confirm your password"
              />
              <div
                className="cursor-pointer mr-2"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-600">
                {errors.confirmPassword.type === "required" &&
                  "Confirm Password field is required"}
                {errors.confirmPassword.type === "validate" &&
                  errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="">
            <input
              type="checkbox"
              name="checked"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="ml-3 text-gray-700">
              I Accept{" "}
              <Link
                to="/terms-and-condition"
                className="text-blue-300 underline"
              >
                Terms & Conditions.
              </Link>
            </span>
          </div>

          <button
            className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 ${
              !isChecked ? "blur-sm" : ""
            }`}
            type="submit"
            disabled={!isChecked}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-1">
                <span className="loading loading-spinner loading-md"></span>{" "}
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
