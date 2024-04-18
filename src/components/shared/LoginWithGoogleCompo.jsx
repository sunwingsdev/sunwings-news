import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useAddNewUserMutation } from "../../redux/features/allApis/usersApi/usersApi";
import { useLocation, useNavigate } from "react-router-dom";
const LoginWithGoogleCompo = () => {
  const { setUser, googleSignIn } = useContext(AuthContext);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [addNewUser] = useAddNewUserMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        console.log("from google", loggedUser);

        setUser(loggedUser);
        const userInfo = {
          uid: loggedUser.uid,
          name: loggedUser.displayName,
          email: loggedUser.email,
          image: loggedUser.photoURL,
        };
        addNewUser(userInfo).then((data) => {
          if (data) {
            toast.success(
              `${
                loggedUser?.displayName || "Unknown user"
              } logged in successfully`
            );
            setGoogleLoading(false);
            navigate(from, { replace: true });
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
        setGoogleLoading(false);
      });
  };
  return (
    <div className="flex flex-row items-center justify-center bg-gray-50">
      <div
        onClick={handleGoogleSignIn}
        className="w-full p-6 bg-white rounded-md shadow-md flex flex-row items-center justify-center"
      >
        {googleLoading ? (
          <button className="bg-blue-500 flex items-center justify-center gap-1 px-5 py-2 rounded-md w-full">
            <TbFidgetSpinner
              className="text-4xl m-auto animate-spin text-white"
              size={24}
            />
          </button>
        ) : (
          <button className="bg-blue-500 flex items-center justify-center gap-1 px-5 py-1 rounded-md w-full">
            <FcGoogle className="text-4xl rounded " />
            <span className="text-xl text-white">Log In with Google</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginWithGoogleCompo;
