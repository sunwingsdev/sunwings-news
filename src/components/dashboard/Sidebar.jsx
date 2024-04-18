import { useContext, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LiaCommentSolid } from "react-icons/lia";
import {
  MdCompost,
  MdOutlineCamera,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { GoAlertFill } from "react-icons/go";
import { VscFileMedia } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { PiVideoFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useGetUserByUidQuery } from "../../redux/features/allApis/usersApi/usersApi";
import { useGetAllLogoQuery } from "../../redux/features/allApis/logoApi/logoApi";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { user } = useContext(AuthContext);
  const { data: loggedUser } = useGetUserByUidQuery(user.uid);
  const { data: allLogos } = useGetAllLogoQuery();

  const filteredLogoDesktop = allLogos?.filter(
    (lo) => lo.position === "desktop_logo"
  );

  const filteredLogoMobile = allLogos?.filter(
    (lo) => lo.position === "mobile_logo"
  );

  const selectedDesktopLogo = filteredLogoDesktop
    ? filteredLogoDesktop.find((logo) => logo.isSelected === true)
    : null;

  const selectedMobileLogo = filteredLogoMobile
    ? filteredLogoMobile.find((logo) => logo.isSelected === true)
    : null;

  const [collapsed, setCollapsed] = useState({
    post: true,
    media: true,
    theme: true,
    page: true,
    user: true,
    setting: true,
  });

  const toggleCollapse = (dropdown) => {
    setCollapsed((prevState) => {
      const updatedCollapsed = {};
      // Close all collapses except the one being toggled
      Object.keys(prevState).forEach((key) => {
        updatedCollapsed[key] = key === dropdown ? !prevState[key] : true;
      });
      return updatedCollapsed;
    });
  };

  return (
    <div className={sidebarOpen ? "hidden md:block" : "block"}>
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 transition-transform">
        <div className="flex items-center justify-between pb-4">
          <Link to="/" className="flex items-center w-full">
            <div className="hidden md:block w-full">
              {selectedDesktopLogo ? (
                <img
                  src={selectedDesktopLogo?.logo}
                  alt=""
                  className="w-full h-12 rounded "
                />
              ) : (
                <img
                  src="https://placehold.co/32x32"
                  alt=""
                  className="w-full h-12 rounded object-cover"
                />
              )}
            </div>
            <div className="block md:hidden">
              {selectedMobileLogo ? (
                <img
                  src={selectedMobileLogo?.logo}
                  alt=""
                  className="w-full h-12 rounded object-cover"
                />
              ) : (
                <img
                  src="https://placehold.co/32x32"
                  alt=""
                  className="w-full h-12 rounded object-cover"
                />
              )}
            </div>
          </Link>

          <button
            onClick={toggleSidebar}
            type="button"
            className="text-lg text-gray-600 sidebar-toggle block md:hidden"
          >
            <IoIosCloseCircleOutline className="text-3xl text-white" />
          </button>
        </div>
        <ul className="mt-4">
          <li className="mb-1 group active">
            <Link
              to="/dashboard"
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md "
            >
              <TiHomeOutline className="mr-3 text-lg" />
              <span className="text-sm select-none">Dashboard</span>
            </Link>
          </li>
          {(loggedUser?.role === "administrator" ||
            loggedUser?.role === "journalist" ||
            loggedUser?.role === "editor") && (
            <li className="mb-1 group">
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md    dropdown-toggle"
                onClick={() => toggleCollapse("post")}
              >
                <MdCompost className="mr-3 text-lg" />
                <span className="text-sm select-none ">Posts</span>
                <MdOutlineKeyboardArrowRight className=" ml-auto" />
              </div>
              <ul
                className={`pl-7 mt-2 ${
                  collapsed.post
                    ? "hidden"
                    : "block transition-all ease-in duration-500"
                }`}
              >
                {(loggedUser?.role === "administrator" ||
                  loggedUser?.role !== "journalist" ||
                  loggedUser?.role === "editor") && (
                  <li className="mb-4">
                    <Link
                      to="/dashboard/all-posts"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                    >
                      All Posts
                    </Link>
                  </li>
                )}
                {loggedUser?.role !== "administrator" && (
                  <li className="mb-4">
                    <Link
                      to="/dashboard/my-all-posts"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                    >
                      My Posts
                    </Link>
                  </li>
                )}
                {loggedUser?.role === "journalist" && (
                  <>
                    <li className="mb-4">
                      <Link
                        to="/dashboard/add-new-post"
                        className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                      >
                        Add New Post
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link
                        to="/dashboard/categories"
                        className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                      >
                        Categories
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          )}
          {loggedUser &&
            (loggedUser.role === "administrator" || "moderator") && (
              <li className="mb-1 group">
                <div
                  className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md    sidebar-dropdown-toggle"
                  onClick={() => toggleCollapse("media")}
                >
                  <VscFileMedia className="ri-instance-line mr-3 text-lg" />
                  <span className="text-sm select-none">Media</span>
                  <MdOutlineKeyboardArrowRight className=" ml-auto " />
                </div>
                <ul
                  className={`pl-7 mt-2 ${
                    collapsed.media ? "hidden" : "block"
                  }`}
                >
                  <li className="mb-4">
                    <Link
                      to="/dashboard/create-ad"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                    >
                      Create An Ad
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      to="/dashboard/manage-ads"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                    >
                      Manage All Ads
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      to="/dashboard/advertisement"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                    >
                      Advertisement
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      to="/dashboard/photo-gallery"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                    >
                      Photo Gallery
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      to="/dashboard/video-gallery"
                      className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                    >
                      Video Gallery
                    </Link>
                  </li>
                </ul>
              </li>
            )}

          {loggedUser && loggedUser.role === "administrator" && (
            <li className="mb-1 group">
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md   "
                onClick={() => toggleCollapse("theme")}
              >
                <MdOutlineCamera className="ri-instance-line mr-3 text-lg" />
                <span className="text-sm select-none">Theme Settings</span>
                <MdOutlineKeyboardArrowRight className=" ml-auto " />
              </div>
              <ul
                className={`pl-7 mt-2 ${collapsed.theme ? "hidden" : "block"}`}
              >
                <li className="mb-4">
                  <Link
                    to="/dashboard/logo"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                  >
                    Logo
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/dashboard/social-profiles"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                  >
                    Social Profiles
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/dashboard/body-styles"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                  >
                    Body Styles
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/dashboard/single-post-styles"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                  >
                    Single Post Styles
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/dashboard/footer-customize"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                  >
                    Footer
                  </Link>
                </li>
              </ul>
            </li>
          )}

          {loggedUser && loggedUser?.role === "administrator" && (
            <li className="mb-1 group">
              <Link
                to="/dashboard/comments"
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md    sidebar-dropdown-toggle"
              >
                <LiaCommentSolid className="ri-instance-line mr-3 text-lg" />
                <span className="text-sm select-none">Comments</span>
              </Link>
            </li>
          )}
          {loggedUser && loggedUser.role === "administrator" && (
            <li className="mb-1 group">
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md    sidebar-dropdown-toggle"
                onClick={() => toggleCollapse("user")}
              >
                <FaUserTie className="ri-instance-line mr-3 text-lg" />
                <span className="text-sm select-none">Users</span>
                <MdOutlineKeyboardArrowRight className=" ml-auto " />
              </div>
              <ul
                className={`pl-7 mt-2 ${collapsed.user ? "hidden" : "block"}`}
              >
                <li className="mb-4">
                  <Link
                    to="/dashboard/all-users"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                  >
                    All User
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/sign-up"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                  >
                    Add New User
                  </Link>
                </li>
                {/* <li className="mb-4">
                  <Link
                    to="#"
                    className="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3 select-none"
                  >
                    Profile
                  </Link>
                </li> */}
              </ul>
            </li>
          )}
          {loggedUser?.role === "administrator" && (
            <li className="mb-1 group">
              <Link
                to="/dashboard/notices"
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md    sidebar-dropdown-toggle"
              >
                <GoAlertFill className="ri-instance-line mr-3 text-lg" />
                <span className="text-sm select-none">Notices</span>
              </Link>
            </li>
          )}
          {(loggedUser?.role === "administrator" ||
            loggedUser?.role === "journalist" ||
            loggedUser?.role === "editor") && (
            <li className="mb-1 group">
              <Link
                to="/dashboard/support"
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md    sidebar-dropdown-toggle"
              >
                <BiSupport className="ri-instance-line mr-3 text-lg" />
                <span className="text-sm select-none">Support</span>
              </Link>
            </li>
          )}
          {(loggedUser?.role === "administrator" ||
            loggedUser?.role === "journalist" ||
            loggedUser?.role === "editor") && (
            <li className="mb-1 group">
              <Link
                to="/dashboard/setup-tutorial"
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md    sidebar-dropdown-toggle"
              >
                <PiVideoFill className="ri-instance-line mr-3 text-lg" />
                <span className="text-sm select-none">Setup Tutorial</span>
              </Link>
            </li>
          )}
          {(loggedUser?.role === "administrator" ||
            loggedUser?.role === "journalist" ||
            loggedUser?.role === "editor") && (
            <li className="mb-1 group">
              <Link
                to="/dashboard/documentation"
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md    sidebar-dropdown-toggle"
              >
                <IoDocumentTextOutline className="ri-instance-line mr-3 text-lg" />
                <span className="text-sm select-none">Documentation</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    </div>
  );
};

export default Sidebar;
