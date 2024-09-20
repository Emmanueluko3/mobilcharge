import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
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

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsFixed(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col justify-between items-center px-4 py-4 lg:px-10 lg:py-4 lg:border-b">
      <nav className="w-full flex items-center justify-between text-black lg:my-6">
        <div className="flex items-center order-last lg:order-first">
          <div className="flex items-center lg:mr-6">
            <FontAwesomeIcon icon={faPhone} className="lg:mr-3 mr-2" />
            <div className="">
              <h4 className="text-grey-700 text-sm font-medium">Contact Us</h4>
              <p className="text-grey-500 text-xs">+1 (340) 555 4567</p>
            </div>
          </div>
          <div className="lg:flex items-center hidden">
            <FontAwesomeIcon icon={faClock} className="mr-3 h-5 w-5" />
            <div className="">
              <h4 className="text-grey-700 text-sm font-medium">Everyday</h4>
              <p className="text-grey-500 text-xs">24h 7d</p>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="text-blue-500 font-bold text-xl lg:text-5xl order-first lg:order-2"
        >
          EVCharging
        </Link>

        {/* Contact buttons */}
        <div className="flex items-center gap-6 max-md:hidden lg:order-last">
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
                  className="hover:bg-gray-700 rounded-lg transition-all cursor-pointer text-base"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
