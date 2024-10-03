"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faDollarSign,
  faGear,
  faQuestion,
  faRightFromBracket,
  faTruck,
  faTruckMedical,
} from "@fortawesome/free-solid-svg-icons";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/features/auth/authSlice";
// import apiService from "../api/apiServices";
import toast from "react-hot-toast";
import { Button } from "../components/common/button";
// import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

const Sidebar: React.FC = () => {
  const location = useLocation().pathname.split("/").pop();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const navLinks = [
    {
      icon: <FontAwesomeIcon icon={faCalendarDays} />,
      label: t("Book"),
      href: "book",
    },
    {
      icon: <FontAwesomeIcon icon={faTruck} />,
      label: t("Drivers"),
      href: "drivers",
    },
    // {
    //   icon: <FontAwesomeIcon icon={faRocketchat} />,
    //   label: t("Message"),
    //   href: "message",
    // },
    {
      icon: <FontAwesomeIcon icon={faDollarSign} />,
      label: t("Pricing"),
      href: "pricing",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      label: t("Settings"),
      href: "settings",
    },
    {
      icon: <FontAwesomeIcon icon={faTruckMedical} />,
      label: t("Emergency"),
      href: "emergency",
    },
  ];

  const [openLogout, setOpenLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const getRefreshToken = () => {
  //   return localStorage.getItem("refreshToken");
  // };

  const handleLogout = async () => {
    console.log("logout", isLoading);
    try {
      setIsLoading(true);
      // const response: any = await apiService("/api/auth/logout/", "POST", {
      //   refresh: getRefreshToken(),
      // });

      // if (response) {
      dispatch(logout());
      setOpenLogout(false);
      // }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        return toast.error(error?.response?.data?.error);
      }
      toast.error("Unknown error occurred");
      console.log("error message", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-[#fff] h-fit p-10">
        <Link to="/" className="">
          <img src={Logo} alt="Logo" className="h-10 lg:h-12" />
        </Link>
        <div className="flex mt-12 flex-col w-4/5 h-full justify-between">
          {navLinks.map((link, index) => (
            <Link to={link.href} key={index} className="my-3">
              <h3
                className={`px-6 py-2.5 rounded-lg ${
                  location === link.href
                    ? link.href === "emergency"
                      ? "text-red-500 bg-red-50"
                      : "text-black bg-gray-100 border"
                    : link.href === "emergency"
                    ? "text-red-500"
                    : "text-gray-500"
                } flex items-center font-medium ${
                  link.href === "emergency"
                    ? "hover:text-red-500 hover:bg-red-50"
                    : "hover:bg-gray-100 hover:text-black"
                } text-base`}
              >
                <span className="mr-3">{link.icon}</span> {link.label}
              </h3>
            </Link>
          ))}
          <button
            onClick={() => setOpenLogout(true)}
            className="flex items-center font-bold text-gray-500 hover:text-red-500 px-5 py-2 mt-20"
          >
            <span className="mr-3">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            Log Out
          </button>
        </div>

        <div className="flex mt-32 flex-col w-4/5 h-[34vh] justify-between items-center rounded-xl bg-gray-900 text-white p-5 relative">
          <div className="absolute -mt-12 drop-shadow-2xl shadow-slate-600 rounded-full h-12 w-12 bg-white flex items-center justify-center">
            <div className="h-10 w-10 bg-gray-900 flex items-center justify-center rounded-full">
              <FontAwesomeIcon
                icon={faQuestion}
                className="font-bold text-white text-2xl"
              />
            </div>
          </div>
          <h3 className="text-base text-center text-white font-bold mt-10">
            {t("Help Center")}
          </h3>
          <p className="text-xs text-center text-white">
            {t(
              "Having Trouble in Learning. Please contact us for more questions."
            )}
          </p>

          <Link
            to="/contact-us"
            className="text-sm font-bold text-center text-gray-900 bg-white hover:bg-gray-200 transition-all rounded-xl px-4 py-2"
          >
            {t("Go To Help Center")}
          </Link>
        </div>
      </div>

      <Dialog open={openLogout} onClose={() => setOpenLogout(false)}>
        <div className="flex items-center flex-col">
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to log out?
            </DialogContentText>
          </DialogContent>
          <div className="flex items-center justify-between w-4/5 mx-auto mb-4">
            <Button
              className="bg-transparent border-2 border-primary-500"
              onClick={() => setOpenLogout(false)}
            >
              <span className="text-primary-500">Cancel</span>
            </Button>
            <Button className="bg-red-700" onClick={handleLogout}>
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Sidebar;
