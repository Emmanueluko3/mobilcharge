import React from "react";
import PageTemplate from "../../templates/pageTemplate";
import { Button } from "../../components/common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <PageTemplate>
      {/* Hero section */}
      <div className="w-full relative h-[70vh] lg:h-[65vh]">
        <video
          className="h-full w-full absolute overflow-hidden top-0 left-0 -z-10 object-cover"
          autoPlay
          muted
          loop
        >
          <source
            src="https://mobilcharge.ca/wp-content/uploads/2024/05/MobilCharge_Recharge_Mobile_EV.mp4"
            type="video/mp4"
          />
        </video>

        <div className="bg-[#0000007A] bg-opacity-90 text-gray-200 z-50 h-full flex flex-col justify-center items-center">
          <h3 className="text-xl lg:text-6xl font-bold mt-auto text-center">
            About Us
          </h3>

          <div className="flex items-center mt-auto text-base lg:text-lg font-medium">
            <span className="pb-2">
              Home
              <FontAwesomeIcon icon={faArrowRight} className="mx-4" />
            </span>

            <span className="text-primary-500 border-b-2 border-primary-500 pb-2 px-2">
              About Us
            </span>
          </div>
          {/* <Button
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
    </Button> */}
        </div>
      </div>
    </PageTemplate>
  );
};

export default About;
