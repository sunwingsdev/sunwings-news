import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      <Helmet>
        <title>Sunwings | Dashboard</title>
      </Helmet>
      {/* Start: Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* End: Sidebar */}

      {/* End: Topbar */}

      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="p-3 md:p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
