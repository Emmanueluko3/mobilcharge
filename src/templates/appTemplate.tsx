import React from "react";
import { useAppSelector } from "../store/hooks";
import { Navigate } from "react-router-dom";
import Sidebar from "../layouts/sidebar";
import { Outlet } from "react-router-dom";
import AppHeader from "../layouts/appheader";

const AppTemplate: React.FC = () => {
  const user: any = useAppSelector((state) => state.auth.user);
  const isAuthenticated: any = localStorage.getItem("accessToken");

  if (
    !user ||
    !isAuthenticated ||
    (typeof isAuthenticated === "string" &&
      isAuthenticated.trim() === "undefined")
  ) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen justify-center bg-gray-100 grid grid-flow-row grid-cols-12">
      <div className="col-span-3 bg-[#fff] hidden lg:block">
        <Sidebar />
      </div>
      <div className="col-span-12 lg:col-span-9 w-full">
        <AppHeader />
        <div className="overflow-y-auto no-scrollbar max-h-[88vh] p-4 lg:pr-16 lg:p-8 mb-20 lg:mb-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppTemplate;
