import React from "react";
// import { useAppSelector } from "../store/hooks";
// import { Navigate } from "react-router-dom";
import { Sidebar } from "../layouts/sidebar";
import Navbar from "../layouts/navbar";
import { Outlet } from "react-router-dom";

const AppTemplate: React.FC = () => {
  // const user: any = useAppSelector((state) => state.auth.user);

  // if (user.creator_status !== "ACTIVE") {
  //   return <Navigate to="/profile-setup" replace />;
  // }

  return (
    <div className="bg-customLightGray min-h-screen">
      <Navbar />
      <section className="grid grid-flow-row grid-cols-11 gap-6 min-h-[85vh]">
        <div className="col-span-3 bg-[#fff] hidden lg:block">
          <Sidebar />
        </div>
        <div className="col-span-11 lg:col-span-7 mt-6 overflow-y-auto no-scrollbar max-h-[85vh] w-full p-4 lg:p-0 mb-20 lg:mb-auto">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AppTemplate;
