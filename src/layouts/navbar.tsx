import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import ScrollToTop from "../utils/scrollToTop";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store/hooks";

const Navbar: React.FC = () => {
  const location = useLocation();
  const user: any = useAppSelector((state) => state?.auth?.user);
  const isAuthenticated: any = localStorage.getItem("accessToken");

  // Translate
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  const [hoveredTab, setHoveredTab] = useState<boolean | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navlinks = [
    { label: t("Home"), href: "/" },
    { label: t("About Us"), href: "/about" },
    { label: t("Services"), href: "/services" },
    { label: t("Pricing"), href: "/services#pricing" },
    { label: t("Booking"), href: "/booking" },
    { label: t("Contact Us"), href: "/contact-us" },
  ];

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsFixed(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col justify-between items-center px-4 py-4 lg:px-10 lg:py-4 lg:border-b">
        <nav className="w-full flex items-center justify-between text-black lg:my-6">
          <div className="flex items-center order-last lg:order-first">
            <div className="flex items-center lg:mr-6">
              <Link
                to="tel:+15143121110"
                className="hover:text-primary-500 transition-all"
              >
                <FontAwesomeIcon icon={faPhone} className="lg:mr-3 mr-2" />
              </Link>
              <div className="">
                <h4 className="text-grey-700 text-sm font-medium">
                  {t("Call us")}
                </h4>
                <Link
                  to="tel:+15143121110"
                  className="text-grey-500 text-xs flex hover:text-primary-500 transition-all"
                >
                  (514)312-1110
                </Link>
              </div>
            </div>
            <div className="lg:flex items-center hidden">
              <FontAwesomeIcon icon={faClock} className="mr-3 h-5 w-5" />
              <div className="">
                <h4 className="text-grey-700 text-sm font-medium">
                  {t("Everyday")}
                </h4>
                <p className="text-grey-500 text-xs">24h 7d</p>
              </div>
            </div>
          </div>
          <Link to="/" className="order-first lg:order-2">
            <img src={Logo} alt="Logo" className="h-10 lg:h-16" />
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-6 max-md:hidden ms-32 lg:order-last">
            {user || isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-md text-base text-white whitespace-nowrap bg-primary-500 transition-all flex items-center justify-center py-1.5 px-4 font-semibold border border-primary-500 hover:bg-primary-700"
                >
                  {t("Go to Dashboard")}
                </Link>
                <Link to="/dashboard/settings">
                  <img
                    src={user?.profile_image}
                    className="h-12 w-12 rounded-full object-cover"
                    alt=""
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-semibold rounded-md py-1.5 px-4 text-base text-primary-500 hover:text-white border border-primary-500 hover:bg-primary-500 transition-all"
                >
                  {t("Log in")}
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md text-base text-white whitespace-nowrap bg-primary-500 transition-all flex items-center justify-center py-1.5 px-4 font-semibold border border-primary-500 hover:bg-primary-700"
                >
                  {t("Sign up")}
                </Link>
              </>
            )}
          </div>

          {/* Contact buttons */}
          {/* {(!user || !isAuthenticated) && (
            <div className="flex items-center gap-6 max-md:hidden lg:order-last">
              <Link to="/" className="hover:text-primary-500 mr-4">
                <FontAwesomeIcon icon={faFacebookF} className="h-5" />
              </Link>
              <Link
                to="/booking"
                className="rounded-md text-sm text-white whitespace-nowrap bg-[#B22222] transition-all flex items-center justify-center px-2 py-1 font-medium"
              >
                {t("BOOK NOW!")}
              </Link>
            </div>
          )} */}
        </nav>

        {/* Menu Toggle Button for Mobile */}
        <div
          className={`flex lg:hidden justify-between items-center w-full mt-4 ${
            isFixed && !isMenuOpen
              ? "bg-white p-4 border-b fixed -top-5 left-0 z-50"
              : "relative"
          }`}
        >
          <FontAwesomeIcon icon={faSearch} className="text-2xl" />
          <button
            onClick={toggleMenu}
            className="md:hidden text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`items-center hidden w-full lg:flex justify-center h-6 ${
            isFixed
              ? "bg-white lg:px-10 lg:py-10 lg:border-b fixed top-0 left-0 z-50"
              : "relative"
          }`}
        >
          {navlinks.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`transition-all cursor-pointer text-grey-900 text-base font-bold px-2 ${
                location.pathname === item.href ||
                location.hash.replace("#pricing", "/services#pricing") ===
                  item.href
                  ? "border-black border-2"
                  : "hover:text-primary-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onMouseEnter={() => setHoveredTab(true)}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() =>
                changeLanguage(i18n.language === "fr" ? "en" : "fr")
              }
              className="hover:text-primary-500 transition-all cursor-pointer text-grey-900 text-base font-bold px-2"
            >
              {i18n.language === "fr" ? "Français" : "English"}
            </button>
            <div
              onMouseEnter={() => setHoveredTab(true)}
              onMouseLeave={() => setTimeout(() => setHoveredTab(null), 500)}
              onClick={() =>
                changeLanguage(i18n.language === "fr" ? "en" : "fr")
              }
              className={`cursor-pointer absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-56 p-4 bg-white text-gray-800 text-sm shadow-lg transition-opacity duration-300 ease-in-out hover:border-l-4 border-primary-500 z-50 font-medium ${
                hoveredTab ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {i18n.language === "fr" ? "English" : "Français"}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full z-10 h- bg-white text-black transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col mt-16">
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-black focus:outline-none rounded-full bg-primary-200 p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="flex flex-col gap-y-10 p-4">
              <div className="flex flex-col gap-y-6">
                {navlinks.map((item, index) => (
                  <Link
                    to={item.href}
                    key={index}
                    className="transition-all cursor-pointer text-base"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="relative w-full">
                  <button
                    onClick={() => setHoveredTab(!hoveredTab)}
                    className="transition-all cursor-pointer text-base w-full text-start flex items-start justify-start"
                  >
                    {i18n.language === "fr" ? "Français" : "English"}
                  </button>
                  <div
                    onClick={() => {
                      changeLanguage(i18n.language === "fr" ? "en" : "fr");
                      setHoveredTab(null);
                    }}
                    className={`cursor-pointer absolute lg:-bottom-12 -left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-screen lg:w-56 p-4 bg-white text-gray-800 text-sm shadow-lg transition-opacity duration-300 ease-in-out border-l-4 border-primary-500 z-50 font-medium ${
                      hoveredTab ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    {i18n.language === "fr" ? "English" : "Français"}
                  </div>
                </div>

                <div className="flex items-center gap-6 lg:order-last">
                  <Link
                    to="/login"
                    className="font-semibold w-full flex justify-center items-center text-center rounded-md py-1.5 px-4 text-base text-primary-500 lg:hover:text-white border border-primary-500 hover:bg-primary-500 transition-all"
                  >
                    {t("Log in")}
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-md w-full text-center text-base text-white whitespace-nowrap bg-primary-500 transition-all flex items-center justify-center py-1.5 px-4 font-semibold border border-primary-500 lg:hover:bg-primary-700"
                  >
                    {t("Sign up")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
