"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faBorderAll,
  faDollarSign,
  faGear,
  faQuestion,
  faRightFromBracket,
  faTruck,
  faTruckMedical,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/features/auth/authSlice";
import Swal from "sweetalert2";
// import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

const Sidebar: React.FC = () => {
  const location = useLocation().pathname.split("/")[2];
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state?.auth?.user);
  const role = () => {
    if (user?.is_superuser) {
      return "admin";
    }
    return "user";
  };

  const navLinks = [
    {
      icon: <FontAwesomeIcon icon={faCalendarDays} />,
      label: t("Book"),
      href: "book",
      roles: ["user"],
    },
    {
      icon: <FontAwesomeIcon icon={faTruck} />,
      label: t("Drivers"),
      href: "drivers",
      roles: ["user"],
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
      roles: ["user"],
    },
    // Admin links
    {
      icon: <FontAwesomeIcon icon={faBorderAll} />,
      label: t("Overview"),
      href: "overview",
      roles: ["admin"],
    },
    {
      icon: <FontAwesomeIcon icon={faUsersRectangle} />,
      label: t("Requests"),
      href: "requests",
      roles: ["admin"],
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      label: t("Settings"),
      href: "settings",
      roles: ["user", "admin"],
    },
    {
      icon: <FontAwesomeIcon icon={faTruckMedical} />,
      label: t("Emergency"),
      href: "emergency",
      roles: ["user"],
    },
  ].filter((link) => link.roles.includes(role()));

  // const getRefreshToken = () => {
  //   return localStorage.getItem("refreshToken");
  // };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: t("Confirm"),
      text: t("Are you sure you want to log out"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E82519",
      cancelButtonColor: "#54577A",
      confirmButtonText: t("Confirm"),
      cancelButtonText: t("Cancel"),
    });
    if (result.isConfirmed) {
      try {
        // const response: any = await apiService("/api/auth/logout/", "POST", {
        //   refresh: getRefreshToken(),
        // });
        // console.log(response);
        dispatch(logout());
      } catch (error: any) {
        if (error?.response?.data?.error) {
          return Swal.fire({
            title: t("Error!"),
            text: error?.response?.data?.error,
            icon: "error",
          });
        }
        Swal.fire({
          title: t("Error!"),
          text: t("Something went wrong. Please try again."),
          icon: "error",
        });
        console.log("error message", error);
      }
    }
  };

  return (
    <div className="pl-16 w-full bg-[#fff] h-fit p-10">
      <Link to="/" className="">
        <img src={Logo} alt="Logo" className="h-10 lg:h-12" />
      </Link>
      <div className="flex mt-12 flex-col w-full h-full justify-between">
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
                  ? "lg:hover:text-red-500 lg:hover:bg-red-50"
                  : "lg:hover:bg-gray-100 lg:hover:text-black"
              } text-base`}
            >
              <span className="mr-3">{link.icon}</span> {link.label}
            </h3>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center font-bold text-gray-500 lg:hover:text-red-500 px-5 py-2 mt-20"
        >
          <span className="mr-3">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
          {t("Log Out")}
        </button>
      </div>

      <div className="flex mt-32 flex-col w-full h-64 justify-between items-center rounded-xl bg-gray-900 text-white p-5 relative">
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
          className="text-sm font-bold text-center text-gray-900 bg-white lg:hover:bg-gray-200 transition-all rounded-xl px-4 py-2"
        >
          {t("Go To Help Center")}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

export const AppFooter = () => {
  const location = useLocation().pathname.split("/")[2];
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const user: any = useAppSelector((state) => state?.auth?.user);
  const role = () => {
    if (user?.is_superuser) {
      return "admin";
    }
    return "user";
  };

  const navLinks = [
    {
      icon: <FontAwesomeIcon icon={faCalendarDays} />,
      label: t("Book"),
      href: "book",
      roles: ["user"],
    },
    {
      icon: <FontAwesomeIcon icon={faTruck} />,
      label: t("Drivers"),
      href: "drivers",
      roles: ["user"],
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
      roles: ["user"],
    },
    // Admin links
    {
      icon: <FontAwesomeIcon icon={faBorderAll} />,
      label: t("Overview"),
      href: "overview",
      roles: ["admin"],
    },
    {
      icon: <FontAwesomeIcon icon={faUsersRectangle} />,
      label: t("Requests"),
      href: "requests",
      roles: ["admin"],
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      label: t("Settings"),
      href: "settings",
      roles: ["user", "admin"],
    },
    {
      icon: <FontAwesomeIcon icon={faTruckMedical} />,
      label: t("Emergency"),
      href: "emergency",
      roles: ["user"],
    },
  ].filter((link) => link.roles.includes(role()));

  // const getRefreshToken = () => {
  //   return localStorage.getItem("refreshToken");
  // };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: t("Confirm"),
      text: t("Are you sure you want to log out"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E82519",
      cancelButtonColor: "#54577A",
      confirmButtonText: t("Confirm"),
      cancelButtonText: t("Cancel"),
    });
    if (result.isConfirmed) {
      try {
        // const response: any = await apiService("/api/auth/logout/", "POST", {
        //   refresh: getRefreshToken(),
        // });
        // console.log(response);
        dispatch(logout());
      } catch (error: any) {
        if (error?.response?.data?.error) {
          return Swal.fire({
            title: t("Error!"),
            text: error?.response?.data?.error,
            icon: "error",
          });
        }
        Swal.fire({
          title: t("Error!"),
          text: t("Something went wrong. Please try again."),
          icon: "error",
        });
        console.log("error message", error);
      }
    }
  };

  return (
    <div className="flex justify-between z-50 flex-row items-center px-6 py-1 lg:hidden w-full bg-white bottom-0 rounded-t-xl fixed">
      {navLinks.map((link, index) => (
        <Link to={link.href} key={index} className="my-3">
          <h3
            className={`p-2 rounded-lg ${
              location === link.href
                ? "text-black bg-gray-100"
                : "text-gray-500"
            } flex items-center font-bold text-base flex-col`}
          >
            {link.icon}
            {/* <span className="text-xs mt-1">{link.label}</span> */}
          </h3>
        </Link>
      ))}
      <span onClick={handleLogout} className="font-bold text-red-500">
        <FontAwesomeIcon icon={faRightFromBracket} />
      </span>
    </div>
  );
};
