import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
// import Input from "../../../components/common/input";
// import { Button } from "../../../components/common/button";
import { useTranslation } from "react-i18next";

const Reservation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {" "}
      {/* Hero section */}
      <div className="w-full relative h-[65vh]">
        <video
          className="h-full w-full absolute overflow-hidden top-0 left-0 -z-10 object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="assets/Recharge_MobilCharge.mp4" type="video/mp4" />
        </video>

        <div className="bg-[#0000007A] bg-opacity-90 text-gray-200 z-50 h-full flex flex-col justify-center items-center">
          <h3 className="text-xl lg:text-6xl font-bold mt-auto text-center">
            {t("Booking")}
          </h3>

          <div className="flex items-center mt-auto text-base lg:text-lg font-medium">
            <Link to="/" className="pb-2">
              {t("Home")}
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="mx-4 pb-2" />

            <Link
              to="/booking"
              className="text-primary-500 border-b-2 border-primary-500 pb-2 px-2"
            >
              {t("Booking")}
            </Link>
          </div>
        </div>
      </div>
      {/* Contact form */}
      <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-16">
        <h2 className="text-xl lg:text-4xl font-bold mb-10 lg:mb-16 text-center">
          {t(
            "Choose sustainable and convenient mobility by booking your charging service with MobilCharge now"
          )}
        </h2>
        <Link
          to="/dashboard/book"
          className="font-bold text-base flex items-center w-fit text-white transition-all lg:mb-16 py-3 px-20 rounded-lg bg-primary-500 hover:bg-primary-600"
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
          {t("BOOK NOW | Limited Availability")}
        </Link>{" "}
        {/* <div className="grid grid-cols-12 grid-flow-row gap-4 lg:gap-8 w-full">
          <div className="col-span-full lg:col-span-4">
            <Input type="text" placeholder={t("Name")} name="Name" />
          </div>
          <div className="col-span-full lg:col-span-4">
            <Input type="email" placeholder={t("Email")} name="Email" />
          </div>
          <div className="col-span-full lg:col-span-4">
            <Input type="text" placeholder={t("Phone")} name="Phone" />
          </div>
          <div className="col-span-full">
            <Input type="text" placeholder={t("Car Model")} name="carModel" />
          </div>
          <div className="col-span-full lg:col-span-6">
            <Input type="date" placeholder="dd/mm/yyy" name="date" />
          </div>
          <div className="col-span-full lg:col-span-6">
            <Input type="text" placeholder={t("Reservation Time")} />
          </div>

          <div className="col-span-full">
            <Input type="Text" placeholder={t("Recharge Address")} />
          </div>
          <div className="col-span-full">
            <textarea
              name="comments"
              placeholder={t("Comments")}
              id=""
              className="block min-h-44 w-full border-0 p-4 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            ></textarea>
          </div>
          <div className="col-span-full">
            <Input type="Text" placeholder={t("Charging Time (Estimate)")} />
          </div>
          <div className="col-span-full">
            <Button className="w-full">
              {t("SUBMIT").toLocaleUpperCase()}
            </Button>
          </div>
        </div> */}
      </div>
      {/* Contact info */}
      <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-16 mb-16">
        <h2 className="text-xl lg:text-4xl font-bold mb-10 lg:mb-16">
          {t("Contact Information")}
        </h2>
        <div className="grid grid-cols-2 gap-6 lg:gap-8 w-full">
          {[
            {
              icon: faPhone,
              text: t("Phone"),
              link: "tel:+15143121110",
              subtext: "(514)312-1110",
            },
            {
              icon: faEnvelope,
              text: t("Email"),
              link: "mailto:Info@mobilcharge.ca",
              subtext: "mailto:Info@mobilcharge.ca",
            },
          ].map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="col-span-2 lg:col-span-1 border p-16 lg:p-20 flex flex-col justify-center items-center hover:border-primary-500 transition-all"
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-primary-500 text-2xl lg:text-5xl"
              />
              <span className="lg:my-6 my-4 font-bold text-2xl">
                {item.text}
              </span>
              <span className="font-medium">{item.subtext}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reservation;
