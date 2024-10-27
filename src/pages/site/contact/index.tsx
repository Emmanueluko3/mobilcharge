import React from "react";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../../components/common/input";
import { Button } from "../../../components/common/button";
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
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
          <source
            src="assets/MobilCharge_Electric_Vehicle_On_Road_Forest.mp4"
            type="video/mp4"
          />
        </video>

        <div className="bg-[#0000007A] bg-opacity-90 text-gray-200 z-50 h-full flex flex-col justify-center items-center">
          <h3 className="text-xl lg:text-6xl font-bold mt-auto text-center">
            {t("Contact Us")}
          </h3>

          <div className="flex items-center mt-auto text-base lg:text-lg font-medium">
            <Link to="/" className="pb-2">
              {t("Home")}
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="mx-4 pb-2" />

            <Link
              to="/contact-us"
              className="text-primary-500 border-b-2 border-primary-500 pb-2 px-2"
            >
              {t("Contact Us")}
            </Link>
          </div>
        </div>
      </div>
      {/* Contact info */}
      <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-16">
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
              subtext: "Info@mobilcharge.ca",
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
      {/* Contact form */}
      <div className="flex flex-col items-center justify-center px-4 lg:px-36 lg:py-16 mb-16">
        <h2 className="text-xl lg:text-4xl font-bold mb-10 lg:mb-16 text-center">
          {t(
            "To request more information, please fill out the form below or send us an email directly."
          )}
        </h2>
        <div className="grid grid-cols-2 grid-flow-row gap-4 lg:gap-8 w-full">
          <div className="col-span-2 lg:col-span-1">
            <Input type="text" placeholder={t("Name")} name="Name" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input type="text" placeholder={t("Phone")} name="Phone" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input type="email" placeholder={t("Email")} name="Email" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input type="Text" placeholder={t("Subject")} />
          </div>
          <div className="col-span-2">
            <textarea
              name="message"
              placeholder={t("Message")}
              id=""
              className="block min-h-44 w-full border-0 p-4 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            ></textarea>
          </div>
          <div className="col-span-2">
            <Button className="w-full">
              {"Envoyer le message".toLocaleUpperCase()}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
