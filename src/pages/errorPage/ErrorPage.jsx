import Lottie from "react-lottie";
import animationData from "../../assets/animation.json";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error, status } = useRouteError();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Lottie options={defaultOptions} height={400} width={400} />
        <div className="flex flex-col items-center gap-3">
          <p className="text-lg text-black">Satus: {status || 404}</p>
          <p className="text-xl text-red-500">{error.message}</p>
          <Link to="/">
            <button className="bg-orange-600 px-5 py-2 text-lg text-white hover:text-black hover:bg-white border border-orange-600 transition-all ease-in-out duration-500">
              Go Back to Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
