import React from "react";
import PageTemplate from "../../templates/pageTemplate";
import { Button } from "../../components/common/button";
import CarIcon from "../../assets/icons/carIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faPlug, faTablet } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faCalendarDays,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <PageTemplate>
      <div className="w-full relative h-[80vh]">
        <video
          className="h-full w-full absolute overflow-hidden top-0 left-0 -z-10 object-cover"
          autoPlay
          muted
          loop
        >
          <source
            src="https://mobilcharge.ca/wp-content/uploads/2024/05/mobilcharge-page-accueil.mp4"
            type="video/mp4"
          />
        </video>

        <div className="p-32 bg-[#0000007A] bg-opacity-90 text-gray-200 z-50 h-full flex flex-col justify-center">
          <img src={CarIcon} alt="" className="mb-5 h-12 w-fit" />
          <h3 className="text-6xl w-3/5 font-bold">
            Free Your EV. MTL Mobile Charging.
          </h3>
          <p className="w-3/5 my-5 text-lg">
            Say goodbye to the hassles of EV charging with MobilCharge,
            available throughout Montreal. Whether you're at the office or at
            home, we'll come to you, providing a stress-free charging
            experience.
          </p>

          <Button
            size="sm"
            className="font-bold text-xl flex items-center w-fit"
          >
            <svg
              aria-hidden="true"
              className="h-5 mr-2"
              viewBox="0 0 576 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M336 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h320c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm208-320V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-32V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-16c-8.84 0-16 7.16-16 16v32c0 35.76 23.62 65.69 56 75.93v118.49c0 13.95-9.5 26.92-23.26 29.19C431.22 402.5 416 388.99 416 372v-28c0-48.6-39.4-88-88-88h-8V64c0-35.35-28.65-64-64-64H96C60.65 0 32 28.65 32 64v352h288V304h8c22.09 0 40 17.91 40 40v24.61c0 39.67 28.92 75.16 68.41 79.01C481.71 452.05 520 416.41 520 372V251.93c32.38-10.24 56-40.17 56-75.93v-32c0-8.84-7.16-16-16-16h-16zm-283.91 47.76l-93.7 139c-2.2 3.33-6.21 5.24-10.39 5.24-7.67 0-13.47-6.28-11.67-12.92L167.35 224H108c-7.25 0-12.85-5.59-11.89-11.89l16-107C112.9 99.9 117.98 96 124 96h68c7.88 0 13.62 6.54 11.6 13.21L192 160h57.7c9.24 0 15.01 8.78 10.39 15.76z"></path>
            </svg>
            BOOK NOW | Limited Availability
          </Button>
        </div>
      </div>

      <div className="px-20 py-16 grid grid-flow-row grid-cols-4 pt-24">
        {[
          {
            icon: faPlug,
            title: "CONVENIENT EV CHARGING",
            text: "Charge your electric vehicle anytime, anywhere with our on-demand service.",
          },
          {
            icon: faCalendar,
            title: "USER-FRIENDLY SCHEDULING",
            text: "Easily schedule and manage your charging sessions with our intuitive web and mobile planner.",
          },
          {
            icon: faBolt,
            title: "LEVEL 3 CHARGING - 80KW (MAX 220A)",
            text: "Get a fast charge for your vehicle with our high-speed mobile charging service.",
          },
          {
            icon: faTablet,
            title: "24/7 CUSTOMER SUPPORT",
            text: "Our customer support team is available to assist you with any questions.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border text-center flex flex-col items-center justify-center py-20 px-10 hover:text-primary-500 relative"
          >
            <div className="absolute -top-5 bg-white px-3">
              <FontAwesomeIcon
                className="text-primary-500 text-5xl"
                icon={item.icon}
              ></FontAwesomeIcon>
            </div>
            <h3 className="text-center mb-6 text-xl font-bold">{item.title}</h3>
            <p className="text-center font-medium text-black hover:text-black">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-primary-500 h-screen mt-56 p-0">
        <div className="h-3/5 w-full relative flex justify-center items-end py-10">
          <img
            src="https://mobilcharge.ca/wp-content/uploads/2024/05/LettrageTransit_MobilCharge_sans-ombre-1024x799.png"
            className="absolute -top-96 rounded-lg z-10"
            alt=""
          />
          <Link
            to="/booking"
            className="font-bold text-base flex items-center w-fit text-white hover:text-primary-500 transition-all mb-16 py-3 px-20 rounded-lg border-2 border-white hover:bg-white z-20"
          >
            <svg
              aria-hidden="true"
              className="h-5 mr-2"
              viewBox="0 0 576 512"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M336 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h320c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm208-320V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-32V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-16c-8.84 0-16 7.16-16 16v32c0 35.76 23.62 65.69 56 75.93v118.49c0 13.95-9.5 26.92-23.26 29.19C431.22 402.5 416 388.99 416 372v-28c0-48.6-39.4-88-88-88h-8V64c0-35.35-28.65-64-64-64H96C60.65 0 32 28.65 32 64v352h288V304h8c22.09 0 40 17.91 40 40v24.61c0 39.67 28.92 75.16 68.41 79.01C481.71 452.05 520 416.41 520 372V251.93c32.38-10.24 56-40.17 56-75.93v-32c0-8.84-7.16-16-16-16h-16zm-283.91 47.76l-93.7 139c-2.2 3.33-6.21 5.24-10.39 5.24-7.67 0-13.47-6.28-11.67-12.92L167.35 224H108c-7.25 0-12.85-5.59-11.89-11.89l16-107C112.9 99.9 117.98 96 124 96h68c7.88 0 13.62 6.54 11.6 13.21L192 160h57.7c9.24 0 15.01 8.78 10.39 15.76z"></path>
            </svg>
            BOOK NOW | Limited Availability
          </Link>
        </div>
        <video
          className="h-2/5 w-full  overflow-hidden object-cover"
          autoPlay
          muted
          loop
        >
          <source
            src="https://mobilcharge.ca/wp-content/uploads/2024/05/MobilCharge_Electric_Vehicle_On_Road_Forest.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="grid grid-cols-2 gap-6 px-36 py-28 items-center">
        <div className="">
          <h2 className="font-bold text-5xl leading-[60px] mb-10">
            Reserve your electric recharge{" "}
            <span className="text-primary-500">today</span> with MobilCharge!
          </h2>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCalendarDays} className="mr-4 text-4xl" />
            <Link
              to="/contact"
              className="border-b-2 border-black font-semibold text-xl"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
        <p className="text-base font-medium">
          Discover a new, eco-friendly, and convenient way to recharge your
          electric vehicle in Greater Montreal. At MobilCharge, we offer you the
          freedom to move safely and in harmony with the environment. Simplify
          your life with our flexible subscription and gain instant access to
          our charging services wherever you are. Our innovative technology
          ensures a fast, secure, and hassle-free recharge. Join the electric
          lifestyle by reserving your recharge now!
        </p>
      </div>
    </PageTemplate>
  );
};

export default Home;
