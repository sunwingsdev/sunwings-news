import { IoIosArrowDown } from "react-icons/io";
import { TiHomeOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { singleCategory } from "../../api/fetch";
import { useState } from "react";
import Headline from "../homePage/Headline";
import Marquee from "react-fast-marquee";
import { useGetAllLogoQuery } from "../../redux/features/allApis/logoApi/logoApi";
import { MdMenu } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useGetBodyThemeQuery } from "../../redux/features/allApis/bodyThemeApi/bodyThemeApi";

const HeaderLogo = () => {
  const [subCategoryItems, setSubcategoryItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const { data: bodyThemes } = useGetBodyThemeQuery();
  const singleTheme = bodyThemes?.[0];
  const { data: allLogos } = useGetAllLogoQuery();
  const navigate = useNavigate();

  const mobileLogos = allLogos
    ? allLogos.filter((logo) => logo.position === "mobile_logo")
    : [];

  const selectedMobileLogo = mobileLogos
    ? mobileLogos.find((logo) => logo.isSelected === true)
    : null;

  const handleNavItems = (value) => {
    setActiveCategory(value);
    singleCategory(value)
      .then((data) => {
        setSubcategoryItems(data);
      })
      .catch();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("search", e.target.search.value);
    navigate("/searched-page");
  };

  const navItems = (
    <>
      <li className="group active">
        <Link to="/" className="flex items-center py-3 px-4 hover:bg-[#ffae00]">
          <TiHomeOutline className="mr-2 " />
          <span className=" select-none">প্রচ্ছদ</span>
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("জাতীয়")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to={"/category/জাতীয়"}>
          <div className="flex items-center py-3 px-4 hover:bg-[#ffae00]  dropdown-toggle">
            <span className=" select-none mr-2">জাতীয়</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "জাতীয়" && subCategoryItems.length > 0 && (
            <ul className="absolute w-40 top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
              {subCategoryItems?.map((item, i) => (
                <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                  {" "}
                  <li className="py-2 px-3 hover:bg-[#ffae00] z-50">
                    {item.subCategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("রাজনীতি")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to={"/category/রাজনীতি"}>
          <div className="flex items-center py-3 px-4  hover:bg-[#ffae00]  dropdown-toggle">
            <span className=" select-none mr-2">রাজনীতি</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "রাজনীতি" && subCategoryItems.length > 0 && (
            <ul className="absolute top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
              {subCategoryItems?.map((item, i) => (
                <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                  {" "}
                  <li className="py-2 px-3 z-50 hover:bg-[#ffae00]">
                    {item.subCategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("আন্তর্জাতিক")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to={"/category/আন্তর্জাতিক"}>
          <div className="flex items-center py-3 px-4  hover:bg-[#ffae00]  dropdown-toggle">
            <span className=" select-none mr-2">আন্তর্জাতিক</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "আন্তর্জাতিক" && subCategoryItems.length > 0 && (
            <ul className="absolute top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
              {subCategoryItems?.map((item, i) => (
                <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                  {" "}
                  <li className="py-2 px-3 z-50 hover:bg-[#ffae00]">
                    {item.subCategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("খেলাধুলা")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to={"/category/খেলাধুলা"}>
          <div className="flex items-center py-3 px-4  hover:bg-[#ffae00]  dropdown-toggle">
            <span className=" select-none mr-2">খেলাধুলা</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "খেলাধুলা" && subCategoryItems.length > 0 && (
            <ul className="absolute top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
              {subCategoryItems?.map((item, i) => (
                <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                  {" "}
                  <li className="py-2 px-3 z-50 hover:bg-[#ffae00]">
                    {item.subCategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("বিনোদন")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to={"/category/বিনোদন"}>
          <div className="flex items-center py-3 px-4  hover:bg-[#ffae00]  dropdown-toggle">
            <span className=" select-none mr-2">বিনোদন</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "বিনোদন" && subCategoryItems.length > 0 && (
            <ul className="absolute top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
              {subCategoryItems?.map((item, i) => (
                <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                  {" "}
                  <li className="py-2 px-3 z-50 hover:bg-[#ffae00]">
                    {item.subCategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("তথ্যপ্রযুক্তি")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to={"/category/তথ্যপ্রযুক্তি"}>
          <div className="flex items-center py-3 px-4  hover:bg-[#ffae00]  dropdown-toggle">
            <span className=" select-none mr-2">তথ্যপ্রযুক্তি</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "তথ্যপ্রযুক্তি" &&
            subCategoryItems.length > 0 && (
              <ul className="absolute top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
                {subCategoryItems?.map((item, i) => (
                  <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                    {" "}
                    <li className="py-2 px-3 z-50 hover:bg-[#ffae00]">
                      {item.subCategoryName}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("সারাদেশ")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to="/category/সারাদেশ">
          <div className="flex items-center py-3 px-4  hover:bg-[#ffae00]  dropdown-toggle">
            <span className=" select-none mr-2">সারাদেশ</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "সারাদেশ" && subCategoryItems.length > 0 && (
            <ul className="absolute top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
              {subCategoryItems?.map((item, i) => (
                <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                  {" "}
                  <li className="py-2 px-3 z-50 hover:bg-[#ffae00]">
                    {item.subCategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("ক্যাম্পাস")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to={"/category/ক্যাম্পাস"}>
          <div className="flex items-center py-3 px-4  hover:bg-[#ffae00]  dropdown-toggle">
            <span className=" select-none mr-2">ক্যাম্পাস</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "ক্যাম্পাস" && subCategoryItems.length > 0 && (
            <ul className="absolute top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
              {subCategoryItems?.map((item, i) => (
                <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                  {" "}
                  <li className="py-2 px-3 z-50 hover:bg-[#ffae00]">
                    {item.subCategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("গণমাধ্যম")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to={"/category/গণমাধ্যম"}>
          <div className="flex items-center py-3 px-4  hover:bg-[#ffae00]  dropdown-toggle">
            <span className=" select-none mr-2">গণমাধ্যম</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "গণমাধ্যম" && subCategoryItems.length > 0 && (
            <ul className="absolute top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
              {subCategoryItems?.map((item, i) => (
                <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                  {" "}
                  <li className="py-2 px-3 z-50 hover:bg-[#ffae00]">
                    {item.subCategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Link>
      </li>
      <li
        onMouseEnter={() => handleNavItems("আরো")}
        onMouseLeave={() => setActiveCategory(null)}
        className="group relative"
      >
        <Link to={"/category/আরো"}>
          <div className="flex items-center py-3 px-4  hover:bg-[#ffae00] dropdown-toggle">
            <span className=" select-none mr-2">আরো</span>
            <IoIosArrowDown className="ml-auto" />
          </div>
          {activeCategory === "আরো" && subCategoryItems.length > 0 && (
            <ul className="absolute top-full left-0 bg-gray-800  rounded-sm py-1 px-2 z-50">
              {subCategoryItems?.map((item, i) => (
                <Link to={`/sub-category/${item.subCategoryName}`} key={i}>
                  {" "}
                  <li className="py-2 px-3 z-50 hover:bg-[#ffae00]">
                    {item.subCategoryName}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </Link>
      </li>
    </>
  );
  return (
    <div className="relative">
      <div className="container mx-auto">
        <div
          className="flex flex-row justify-between items-center px-2"
          style={{ backgroundColor: singleTheme?.menuBg }}
        >
          <div className=" hidden md:flex justify-between items-center">
            <ul
              className="flex flex-row items-center justify-center relative flex-wrap cursor-pointer"
              style={{
                fontSize: `${singleTheme?.menuTitleFontSize}px`,
                color: singleTheme?.menuTitleFontColor,
              }}
            >
              {navItems}
            </ul>
          </div>
          <button
            onClick={() => setSearchBarOpen(true)}
            className="btn btn-ghost md:flex items-center justify-center btn-circle text-white hidden "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* Search form */}
          <div
            className={`form-control absolute w-72 transition-all duration-500 ease-in-out ${
              searchBarOpen
                ? "right-1 top-1 md:right-2 md:top-0 z-50"
                : "-right-96 hidden"
            }`}
          >
            <form onSubmit={handleSearchSubmit} action="">
              <input
                type="text"
                name="search"
                placeholder="খুজুন..."
                className="input relative input-bordered  md:w-auto text-black bg-white"
              />
              <input
                className="absolute top-0 right-4 btn bg-orange-500 hover:bg-orange-600"
                type="submit"
                value="খুজুন"
              />
              <RxCross2
                onClick={() => setSearchBarOpen(false)}
                size={25}
                className="text-white bg-slate-950 absolute -top-2 -right-2 rounded-full border-2 border-gray-400"
              />
            </form>
          </div>
        </div>

        <div className="flex md:hidden items-center justify-between bg-black py-1 px-1">
          <Link to="/">
            <img src={selectedMobileLogo?.logo} alt="logo" className="w-36 " />
          </Link>
          <div className="flex flex-row gap-1 justify-center items-center">
            <button
              onClick={() => setSearchBarOpen(!searchBarOpen)}
              className="btn btn-ghost btn-circle text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            {isMenuOpen ? (
              <FaXmark
                className="text-white text-4xl cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            ) : (
              <MdMenu
                className="text-white text-4xl cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            )}
          </div>
        </div>
        <div className="flex py-2 mb-4">
          <div
            style={{
              backgroundColor: singleTheme?.newsHeadlineBg,
              color: singleTheme?.newsHeadlineTitleFontColor,
            }}
            className=" w-1/4 md:w-2/12 flex justify-center items-center"
          >
            <h3
              style={{
                fontSize: `${singleTheme?.newsHeadlineTitleFontSize}px`,
              }}
            >
              সংবাদ শিরোনাম :
            </h3>
          </div>

          <div
            className=" w-3/4 md:w-10/12 text-sm md:text-lg"
            style={{ backgroundColor: singleTheme?.marqueBg }}
          >
            <Marquee pauseOnHover={true} speed={60}>
              <Headline />
            </Marquee>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="block md:hidden absolute top-0 h-fit w-1/2 z-30 transition-all ease-in-out duration-500"
          style={{
            backgroundColor: singleTheme?.menuBg,
            fontSize: `${singleTheme?.menuTitleFontSize}px`,
            color: singleTheme?.menuTitleFontColor,
          }}
        >
          <div className="p-1">
            <div>
              <img
                src={selectedMobileLogo?.logo}
                alt="logo"
                className="w-36 "
              />
            </div>
          </div>
          <ul className="flex flex-col">{navItems}</ul>
        </div>
      )}
    </div>
  );
};

export default HeaderLogo;
