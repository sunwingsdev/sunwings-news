import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AllPosts from "../pages/dashboard/Posts/AllPosts";
import AddNewPost from "../pages/dashboard/Posts/AddNewPost";
import Categories from "../pages/dashboard/Posts/Categories";
import AllPage from "../pages/dashboard/Pages/AllPage/AllPage";
import AddNewPage from "../pages/dashboard/Pages/AddNewPage/AddNewPage";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/homePage/Home";
import AllUsers from "../pages/dashboard/Users/AllUsers/AllUsers";
import SinglePage from "../pages/homePage/SinglePage";
import CustomizeLogo from "../pages/dashboard/media/CustomizeLogo";
import SocialProfiles from "../pages/dashboard/themeSettings/socialProfiles/SocialProfiles";
import SubCategoryNews from "../pages/homePage/SubCategoryNews";
import UpdatePost from "../pages/dashboard/Posts/UpdatePost";
import PrivateRoute from "./PrivateRoute";
import CategoryNewsPage from "../pages/homePage/CategoryNewsPage";
import CustomizeFooter from "../pages/dashboard/themeSettings/footer/CustomizeFooter";
import TermsAndCondition from "../pages/termsAndCondition/TermsAndCondition";
import PhotoGallery from "../pages/dashboard/media/PhotoGallery";
import VideoGallery from "../pages/dashboard/media/VideoGallery";
import BodyStyles from "../pages/dashboard/themeSettings/bodyStyles/BodyStyles";
import SearchedNewspage from "../pages/homePage/SearchedNewspage";
import CommentPage from "../pages/dashboard/CommentPage/CommentPage";
import SinglePostStyles from "../pages/dashboard/themeSettings/singlePostStyles/SinglePostStyles";
import DashboardHome from "../pages/dashboard/dashboardHome/DashboardHome";
import MyAllPosts from "../pages/dashboard/Posts/MyAllPosts";
import AboutUs from "../pages/aboutUs/AboutUs";
import Notices from "../pages/dashboard/Notices/Notices";
import NewsPrint from "../components/homePage/NewsPrint/NewsPrint";
import CreateAnAd from "../pages/dashboard/media/CreateAnAd";
import ManageAds from "../pages/dashboard/media/ManageAds";
import AdminRoute from "./AdminRoute";
import AdminEditorRoute from "./AdminEditorRoute";
import ErrorPage from "../pages/errorPage/ErrorPage";
import FooterGallery from "../pages/homePage/FooterGallery";
import Support from "../pages/dashboard/support/Support";
import SetupTutorial from "../pages/dashboard/setupTutorial/SetupTutorial";
import Documentation from "../pages/dashboard/documentation/Documentation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts/:id",
        element: <SinglePage />,
      },
      {
        path: "/sub-category/:subCategory",
        element: <SubCategoryNews />,
      },
      {
        path: "/category/:category",
        element: <CategoryNewsPage />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },
      {
        path: "/searched-page",
        element: <SearchedNewspage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "all-posts",
        element: (
          <AdminEditorRoute>
            <AllPosts />
          </AdminEditorRoute>
        ),
      },
      {
        path: "add-new-post",
        element: (
          <AdminEditorRoute>
            <AddNewPost />
          </AdminEditorRoute>
        ),
      },
      {
        path: "my-all-posts",
        element: <MyAllPosts />,
      },
      {
        path: "edit-post/:id",
        element: <UpdatePost />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "logo",
        element: (
          <AdminRoute>
            <CustomizeLogo />
          </AdminRoute>
        ),
      },
      {
        path: "create-ad",
        element: <CreateAnAd />,
      },
      {
        path: "manage-ads",
        element: <ManageAds />,
      },
      {
        path: "photo-gallery",
        element: <PhotoGallery />,
      },
      {
        path: "video-gallery",
        element: <VideoGallery />,
      },
      {
        path: "social-profiles",
        element: (
          <AdminRoute>
            <SocialProfiles />
          </AdminRoute>
        ),
      },
      {
        path: "body-styles",
        element: (
          <AdminRoute>
            <BodyStyles />
          </AdminRoute>
        ),
      },
      {
        path: "single-post-styles",
        element: (
          <AdminRoute>
            <SinglePostStyles />
          </AdminRoute>
        ),
      },
      {
        path: "footer-customize",
        element: (
          <AdminRoute>
            <CustomizeFooter />
          </AdminRoute>
        ),
      },

      {
        path: "all-page",
        element: <AllPage />,
      },
      {
        path: "add-new-page",
        element: <AddNewPage />,
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "comments",
        element: (
          <AdminRoute>
            <CommentPage />
          </AdminRoute>
        ),
      },
      {
        path: "notices",
        element: (
          <AdminRoute>
            <Notices />
          </AdminRoute>
        ),
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "setup-tutorial",
        element: <SetupTutorial />,
      },
      {
        path: "documentation",
        element: <Documentation />,
      },
    ],
  },
  {
    path: "/print-news/:id",
    element: <NewsPrint />,
  },
  {
    path: "/footer-gallery",
    element: <FooterGallery />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: (
      <PrivateRoute>
        <Register />
      </PrivateRoute>
    ),
  },
]);

export default router;
