import { IoIosNotifications, IoIosSearch } from "react-icons/io";
import { RiMenu4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import BreadCrumbs from "../shared/BreadCrumbs";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Topbar = ({ toggleSidebar }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <button
        onClick={toggleSidebar}
        type="button"
        className="text-lg text-gray-600 sidebar-toggle block md:hidden"
      >
        <RiMenu4Line className="text-2xl" />
      </button>
      <BreadCrumbs />
      <ul className="ml-auto flex items-center">
        <li className="mr-1 dropdown">
          <button
            type="button"
            className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
          >
            <IoIosSearch className="ri-search-line" />
          </button>
        </li>
        <li className="dropdown">
          <button
            type="button"
            className="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
          >
            <IoIosNotifications className="ri-notification-3-line" />
          </button>
        </li>
        <li className="dropdown ml-3">
          <button type="button" className="dropdown-toggle flex items-center">
            <img
              src={`${user?.photoURL}`}
              alt="User Image"
              className="w-8 h-8 rounded-full block object-cover align-middle"
              title="User Image"
            />
          </button>
          <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
            <li>
              <Link
                to="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              >
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Topbar;
