import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation().pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
    <div className="flex flex-col justify-between items-center px-4 py-4 lg:px-10 lg:py-4 lg:border-b">
      <nav className="w-full flex items-center justify-between text-black my-6">
        <div className="flex items-center">
          <div className="flex items-center mr-6">
            <FontAwesomeIcon icon={faPhone} className="mr-3" />
            <div className="">
              <h4 className="text-grey-700 text-sm font-medium">Contact Us</h4>
              <p className="text-grey-500 text-xs">+1 (340) 555 4567</p>
            </div>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faClock} className="mr-3 h-5 w-5" />
            <div className="">
              <h4 className="text-grey-700 text-sm font-medium">Everyday</h4>
              <p className="text-grey-500 text-xs">24h 7d</p>
            </div>
          </div>
        </div>
        <Link to="/" className="text-blue-500 font-bold text-5xl">
          EVCharging
        </Link>

        {/* Button Section */}
        <div className="flex items-center gap-6 max-md:hidden">
          <Link to="/" className="hover:text-primary-500 mr-4">
            <FontAwesomeIcon icon={faFacebookF} className="h-5" />
          </Link>
          <Link
            to="/booking"
            className="rounded-md text-sm text-white whitespace-nowrap bg-[#B22222] transition-all flex items-center justify-center px-2 py-1 font-medium"
          >
            BOOK NOW!
          </Link>
        </div>

        {/* Menu Toggle Button for Mobile */}
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
      </nav>

      {/* Navigation Links */}
      <div className="items-center hidden w-full lg:flex justify-center h-6">
        {navlinks.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={`transition-all cursor-pointer text-grey-900 text-base hover:border-2 hover:border-black font-bold px-2 ${
              location === item.href ? "border-black border-2" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full z-10 h-3/5 bg-white text-black transition-transform duration-300 transform ${
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
              {["Buy", "Sell", "Exclusive", "Development", "Agent"].map(
                (item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="hover:bg-gray-700 rounded-lg transition-all cursor-pointer text-base"
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            <div className="flex w-full gap-6">
              <Link
                to="/signin"
                className="w-full border border-primary-500 rounded-lg text-primary-500 hover:bg-primary-100 transition-all whitespace-nowrap flex items-center justify-center px-6 py-3.5 font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="w-full rounded-lg text-white whitespace-nowrap bg-primary-500 hover:bg-primary-700 transition-all flex items-center justify-center px-6 py-3.5 font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
