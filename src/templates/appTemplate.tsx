import React from "react";
// import { useAppSelector } from "../store/hooks";
// import { Navigate } from "react-router-dom";
import Sidebar from "../layouts/sidebar";
import { Outlet } from "react-router-dom";
import AppHeader from "../layouts/appheader";

const AppTemplate: React.FC = () => {
  // const user: any = useAppSelector((state) => state.auth.user);

  // if (user.creator_status !== "ACTIVE") {
  //   return <Navigate to="/profile-setup" replace />;
  // }

  return (
    <div className="min-h-screen grid grid-flow-row grid-cols-12">
      <div className="col-span-3 bg-[#fff] hidden lg:block">
        <Sidebar />
      </div>
      <div className="col-span-12 lg:col-span-9 mt-6 overflow-y-auto no-scrollbar max-h-[85vh] w-full p-4 lg:p-0 mb-20 lg:mb-auto">
        <AppHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AppTemplate;
