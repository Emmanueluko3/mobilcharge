import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const navlinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Booking", href: "/booking" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "English", href: "/english" },
  ];
  return (
    <div className="flex flex-col bg-[#1D1D1BFF] text-gray-400 py-24">
      <div className="grid grid-flow-row grid-cols-2 gap-10 px-24 mb-24">
        <div className="">
          <Link to="/" className="text-blue-500 font-bold text-5xl mb-6 flex">
            EVCharging
          </Link>
          <p className="text-gray-400">
            Mobilcharge représente le futur de la mobilité électrique, un futur
            sans contraintes, sans compromis. Joignez-vous à nous pour embrasser
            la liberté de la recharge à domicile ou au travail. Redéfinissez
            votre expérience de conduite électrique avec Mobilcharge dès
            aujourd’hui!
          </p>
        </div>
        <div className="">
          <h2 className="font-bold text-5xl mb-8">MENU</h2>
          <div className="flex flex-col border border-gray-600">
            {navlinks.map((item, index) => (
              <Link
                to={item.href}
                key={index}
                className="border-b border-gray-600 p-4 hover:text-primary-500 font-bold"
              >
                {item.label.toLocaleUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-grey-900 shadow-lg shadow-gray-400 my-8"></hr>
      <div className="flex justify-between items-center w-full px-24">
        <p className="text-gray-400 w-1/3">
          © 2024 Mobilcharge. I Design 6 Sens Communications.
        </p>
        <div className="grid grid-cols-3 grid-flow-col gap-1 items-center">
          <Link to="/" className="hover:text-primary-500 transition-all">
            Privacy Policies
          </Link>
          <Link to="/" className="hover:text-primary-500 transition-all">
            Service Agreement
          </Link>
          <Link to="/" className="hover:text-primary-500 transition-all">
            Terms and Conditions
          </Link>
        </div>
        <Link
          to="/"
          className="text-primary-500 hover:text-primary-700 transition-all mr-4"
        >
          <FontAwesomeIcon icon={faFacebookF} className="h-5" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
