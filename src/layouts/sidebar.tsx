"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faDollarSign,
  faGear,
  faTruck,
  faTruckMedical,
} from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

const Sidebar: React.FC = () => {
  const location = useLocation().pathname;
  const { t } = useTranslation();

  const navLinks = [
    {
      icon: <FontAwesomeIcon icon={faCalendarDays} />,
      label: t("Book"),
      href: "book",
    },
    {
      icon: <FontAwesomeIcon icon={faTruck} />,
      label: t("Trucks"),
      href: "/trucks",
    },
    {
      icon: <FontAwesomeIcon icon={faRocketchat} />,
      label: t("Message"),
      href: "/message",
    },
    {
      icon: <FontAwesomeIcon icon={faDollarSign} />,
      label: t("Pricing"),
      href: "/pricing",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      label: t("Settings"),
      href: "/settings",
    },
    {
      icon: <FontAwesomeIcon icon={faTruckMedical} />,
      label: t("Emergency"),
      href: "/emergency",
    },
  ];

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
                    ? "text-black bg-gray-100 border"
                    : "text-gray-500"
                } flex items-center font-medium hover:bg-gray-100 hover:text-black text-base`}
              >
                <span className="mr-3">{link.icon}</span> {link.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
