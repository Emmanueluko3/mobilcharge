import React from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollToTop from "../utils/scrollToTop";
import { useTranslation } from "react-i18next";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import EnglishUS from "../assets/images/englishUS.png";
import French from "../assets/images/french.png";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useAppSelector } from "../store/hooks";

const AppHeader: React.FC = () => {
  const location: any = useLocation().pathname.split("/").pop();
  const user: any = useAppSelector((state) => state.auth.user);

  // Translate
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <>
      <ScrollToTop />

      <nav className="w-full flex flex-row items-center justify-between bg-white text-black lg:pt-8 px-4 py-4 lg:px-10 lg:py-4">
        <h2 className="text-2xl font-medium">
          {t(location.charAt(0).toUpperCase() + location.slice(1))}
        </h2>

        <div className="flex items-center">
          {/* Language Switch */}
          <Dropdown>
            <MenuButton
              endDecorator={<FontAwesomeIcon icon={faCaretDown} />}
              className="!border-none !ring-0 focus:ring-0 transition-all"
            >
              {i18n.language === "fr" ? (
                <>
                  <img src={French} className="mr-2 h-4" alt="" />
                  Français
                </>
              ) : (
                <>
                  <img src={EnglishUS} className="mr-2 h-4" alt="" />
                  English
                </>
              )}
            </MenuButton>
            <Menu size="sm">
              <MenuItem
                onClick={() =>
                  changeLanguage(i18n.language === "fr" ? "en" : "fr")
                }
              >
                {i18n.language === "fr" ? (
                  <>
                    <img src={EnglishUS} className="mr-2 h-4" alt="" />
                    English
                  </>
                ) : (
                  <>
                    <img src={French} className="mr-2 h-4" alt="" />
                    Français
                  </>
                )}
              </MenuItem>
            </Menu>
          </Dropdown>
          <div className="rounded-full h-10 w-10 border mx-4 flex justify-center items-center">
            <FontAwesomeIcon className="h-6 text-gray-400" icon={faBell} />
          </div>
          <Link to="settings">
            <img
              src={user?.profile_image}
              className="h-12 w-12 rounded-full"
              alt=""
            />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default AppHeader;
