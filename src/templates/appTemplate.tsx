import React from "react";
import { useAppSelector } from "../store/hooks";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar, { AppFooter } from "../layouts/sidebar";
import { Outlet } from "react-router-dom";
import AppHeader from "../layouts/appheader";
import { AnimatePresence, motion } from "framer-motion";

const AppTemplate: React.FC = () => {
  const user: any = useAppSelector((state) => state.auth.user);
  const isAuthenticated: any = localStorage.getItem("accessToken");
  const location = useLocation();

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
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="min-h-screen justify-center bg-gray-100 grid grid-flow-row grid-cols-12">
          <div className="col-span-3 bg-[#fff] hidden lg:block">
            <Sidebar />
          </div>
          <div className="col-span-12 lg:col-span-9 w-full">
            <AppHeader />
            <AppFooter />
            <div className="overflow-y-auto no-scrollbar max-h-[75vh] lg:max-h-[88vh] p-4 lg:pr-16 lg:p-8 mb-32 lg:mb-auto ">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
              >
                <Outlet />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppTemplate;
