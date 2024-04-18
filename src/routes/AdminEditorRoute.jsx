import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { useGetUserByUidQuery } from "../redux/features/allApis/usersApi/usersApi";
import toast from "react-hot-toast";

const AdminEditorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { data: loggedUser, isLoading } = useGetUserByUidQuery(user.uid);
  const location = useLocation();

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (user && (loggedUser?.role === "administrator" || "editor")) {
    return children;
  }
  return (
    <Navigate to="/dashboard" state={{ from: location }}>
      {toast.error("You do not have the access")}
    </Navigate>
  );
};

export default AdminEditorRoute;
