import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import LogoFooter from "../assets/images/logo-footer.png";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navlinks = [
    { label: t("Home"), href: "/" },
    { label: t("About Us"), href: "/about" },
    { label: t("Services"), href: "/services" },
    { label: t("Pricing"), href: "/services#pricing" },
    { label: t("Booking"), href: "/booking" },
    { label: t("Contact Us"), href: "/contact-us" },
  ];
  return (
    <div className="flex flex-col bg-[#1D1D1BFF] text-gray-400 py-16 lg:py-24">
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-10 px-4 lg:px-24 lg:mb-24 mb-10">
        <div className="">
          <Link to="/" className="mb-6 flex">
            <img src={LogoFooter} alt="Logo" className="h-10 lg:h-16" />
          </Link>
          <p className="text-gray-400 text-sm lg:text-base font-medium">
            {t(
              "Mobilcharge represents the future of electric mobility, a future without constraints, without compromise. Join us in embracing the freedom of charging at home or at work. Redefine your electric driving experience with Mobilcharge today!"
            )}
          </p>
        </div>
        <div className="">
          <h2 className="font-bold text-3xl lg:text-5xl mb-5 lg:mb-8">MENU</h2>
          <div className="flex flex-col border border-gray-600">
            {navlinks.map((item, index) => (
              <Link
                to={item.href}
                key={index}
                className="border-b border-gray-600 p-4 transition-all hover:text-primary-500 font-bold"
              >
                {item.label.toLocaleUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-grey-900 shadow-lg shadow-gray-400 my-8"></hr>
      <div className="flex justify-between items-center flex-col lg:flex-row w-full px-4 lg:px-24">
        <p className="text-gray-400 text-center lg:text-start lg:w-1/3 order-last lg:order-first font-medium">
          {t("© 2024 Mobilcharge. I Design 6 Sens Communications.")}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 grid-flow-row lg:grid-flow-col gap-1 items-center mb-4 lg:mb-0">
          <Link
            to="/"
            className="hover:text-primary-500 transition-all text-sm lg:text-base text-center text-nowrap font-medium"
          >
            {t("Privacy Policies")}
          </Link>
          <Link
            to="/"
            className="hover:text-primary-500 transition-all text-sm lg:text-base text-center text-nowrap font-medium"
          >
            {t("Service Agreement")}
          </Link>
          <Link
            to="/"
            className="hover:text-primary-500 transition-all text-sm lg:text-base text-center text-nowrap font-medium"
          >
            {t("Terms and Conditions")}
          </Link>
        </div>
        <Link
          to="/"
          className="text-primary-500 hover:text-primary-700 transition-all mb-4 lg:mb-0 lg:mr-4 order-first lg:order-last"
        >
          <FontAwesomeIcon icon={faFacebookF} className="h-5" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
