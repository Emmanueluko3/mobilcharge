import React from "react";
import CarIcon from "../../../assets/icons/carIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCar,
  faEnvelope,
  faPhone,
  faPlug,
  faTablet,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faCalendarDays,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Hotelevs from "../../../assets/images/hotelevs.jpeg";
import Privateevs from "../../../assets/images/privateevs.webp";
import Publicevs from "../../../assets/images/publicevs.jpg";
import Businessevs from "../../../assets/images/businessevs.webp";
import Transportevs from "../../../assets/images/transportevs.jpg";
import Homeevs from "../../../assets/images/homeevs.jpg";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
} from "@mui/joy";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {" "}
      {/* Hero section */}
      <div className="w-full relative h-screen lg:h-[80vh]">
        <video
          className="h-full w-full absolute overflow-hidden top-0 left-0 -z-10 object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="assets/mobilcharge-page-accueil.mp4" type="video/mp4" />
        </video>

        <div className="lg:p-32 p-4 bg-[#0000007A] bg-opacity-90 text-gray-200 z-50 h-full flex flex-col justify-center">
          <img src={CarIcon} alt="" className="mb-5 w-48 lg:h-12 lg:w-fit" />
          <h3 className="text-4xl lg:text-6xl lg:w-3/5 font-bold">
            {t("Free Your EV. MTL Mobile Charging.")}
          </h3>
          <p className="lg:w-3/5 my-5 text-base lg:text-lg">
            {t(
              "Say goodbye to the hassles of EV charging with MobilCharge, available throughout Montreal. Whether you're at the office or at home, we'll come to you, providing a stress-free charging experience."
            )}
          </p>

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
          </Link>
        </div>
      </div>
      <div className="px-4 lg:px-20 py-16 grid grid-flow-row grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-0 pt-24">
        {[
          {
            icon: faPlug,
            title: t("CONVENIENT EV CHARGING"),
            text: t(
              "Charge your electric vehicle anytime, anywhere with our on-demand service."
            ),
          },
          {
            icon: faCalendar,
            title: t("USER-FRIENDLY SCHEDULING"),
            text: t(
              "Easily schedule and manage your charging sessions with our intuitive web and mobile planner."
            ),
          },
          {
            icon: faBolt,
            title: t("LEVEL 3 CHARGING - 80KW (MAX 220A)"),
            text: t(
              "Get a fast charge for your vehicle with our high-speed mobile charging service."
            ),
          },
          {
            icon: faTablet,
            title: t("24/7 CUSTOMER SUPPORT"),
            text: t(
              "Our customer support team is available to assist you with any questions."
            ),
          },
        ].map((item, index) => (
          <div
            key={index}
            className="border text-center flex flex-col items-center justify-center p-10 lg:py-20 lg:px-10 hover:text-primary-500 transition-all relative"
          >
            <div className="absolute -top-5 bg-white px-3">
              <FontAwesomeIcon
                className="text-primary-500 text-3xl lg:text-5xl"
                icon={item.icon}
              ></FontAwesomeIcon>
            </div>
            <h3 className="text-center mb-4 lg:mb-6 text-lg lg:text-xl font-bold">
              {item.title.toLocaleUpperCase()}
            </h3>
            <p className="text-center text-sm font-medium text-black hover:text-black transition-all">
              {item.text}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-primary-500 lg:h-screen mt-14 lg:mt-56 p-0">
        <div className="lg:h-3/5 h-[40vh] w-full relative flex justify-center items-end py-10">
          <img
            src="assets/LettrageTransit_MobilCharge_sans-ombre-1024x799.png"
            className="absolute -top-10 lg:-top-96 rounded-lg z-10"
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-easing="ease-in-out"
            alt=""
          />
          <Link
            to="/dashboard/book"
            className="font-bold text-sm lg:text-base flex items-center w-fit text-white hover:text-primary-500 transition-all lg:mb-10 p-4 lg:py-3 lg:px-20 rounded-lg border-2 border-white hover:bg-white z-20"
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
          </Link>
        </div>
        <video
          className="lg:h-2/5 w-full  overflow-hidden object-cover pointer-events-none"
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-10 py-16 lg:px-36 lg:py-28 items-center">
        <div className="">
          <h2 className="font-bold text-2xl lg:text-5xl leading-9 lg:leading-[60px] mb-10">
            {t("Reserve your electric recharge")}{" "}
            <span className="text-primary-500">{t("today")}</span>{" "}
            {t("with MobilCharge!")}
          </h2>
          <div className="flex items-center mb-6 lg:mb-0">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="mr-2 lg:mr-4 text-2xl lg:text-4xl"
            />
            <Link
              to="/dashboard/pricing"
              className="border-b-2 border-black font-semibold text-lg lg:text-xl"
            >
              {t("Subscribe Now")}
            </Link>
          </div>
        </div>
        <p className="text-sm lg:text-base font-medium">
          {t(
            "Discover a new, eco-friendly, and convenient way to recharge your electric vehicle in Greater Montreal. At MobilCharge, we offer you the freedom to move safely and in harmony with the environment. Simplify your life with our flexible subscription and gain instant access to our charging services wherever you are. Our innovative technology ensures a fast, secure, and hassle-free recharge. Join the electric lifestyle by reserving your recharge now!"
          )}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 lg:px-36 py-6 items-center w-full">
        {[
          { image: Hotelevs, text: t("HOTELS AND ACCOMMODATIONS") },
          { image: Privateevs, text: t("INDIVIDUAL ELECTRIC VEHICLE OWNERS") },
          {
            image: Businessevs,
            text: t("BUSINESS WITH ELECTRIC VEHICLE FLEETS"),
          },
          {
            image: Publicevs,
            text: t("PUBLIC INTITUTION AND GOVERNMENT AGENCIES"),
          },
          {
            image: Transportevs,
            text: t("DELIVERY AND TRANSPORTATION COMPANIES"),
          },
          { image: Homeevs, text: t("RESIDENTIAL BUILDINGS AND CONDOMINIUMS") },
        ].map((item, index) => (
          <div
            key={index}
            className={`relative group h-full overflow-hidden cursor-pointer ${
              index === 0
                ? "lg:col-span-7"
                : index === 1
                ? "lg:col-span-5"
                : index === 2
                ? "lg:col-span-5"
                : index === 3
                ? "lg:col-span-7"
                : index === 4
                ? "lg:col-span-9"
                : index === 5
                ? "lg:col-span-3"
                : ""
            }`}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />

            {/* Text that appears smoothly from the bottom on hover */}
            <div className="absolute inset-0 bg-primary-500 bg-opacity-70 flex items-start justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10">
              <span className="text-white text-2xl font-semibold mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Contact info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-36 py-16">
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
            className="border p-16 lg:p-20 flex flex-col justify-center items-center hover:border-primary-500 transition-all"
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="text-primary-500 text-2xl lg:text-5xl"
            />
            <span className="lg:my-6 my-4 font-bold text-2xl">{item.text}</span>
            <span className="font-medium">{item.subtext}</span>
          </Link>
        ))}
      </div>
      <div className="relative">
        <video
          className="h-full w-full absolute overflow-hidden top-0 left-0 -z-10 object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="assets/MobilCharge_ServiceClient_RechargeVehicule.mp4"
            type="video/mp4"
          />
        </video>
        <div className="lg:py-24 py-16 px-4 lg:px-36 bg-[#0000007A] bg-opacity-90 text-center flex flex-col items-center justify-center w-full text-gray-200 z-50 h-full">
          <FontAwesomeIcon
            icon={faCar}
            className="mb-8 text-primary-500 text-5xl lg:text-7xl"
          />

          <h3 className="text-3xl lg:text-5xl font-bold text-center">
            {t("The Charge You Need, When You Need It.")}
          </h3>
          <p className="text-base lg:text-lg font-semibold text-center py-8">
            {t(
              "Join the revolution and enjoy the convenience of on-demand EV charging throughout Greater Montreal. Say goodbye to range anxiety and hello to hassle-free driving!"
            )}
            "
          </p>
          <div className="flex items-center flex-col lg:flex-row gap-4">
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
            </Link>
            <Link
              to="/dashboard/pricing"
              className="font-bold text-base flex items-center w-fit text-white hover:text-primary-500 transition-all lg:mb-16 py-3 px-20 rounded-lg hover:bg-white border-2"
            >
              {t("Subscribe Now")}
            </Link>
          </div>
        </div>
      </div>
      {/* FAQs */}
      <div className="px-4 lg:px-36 py-16 flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl lg:text-4xl mb-8 text-center w-4/5 lg:w-auto">
          {t("Frequently Asked Questions")}
        </h2>
        <AccordionGroup size="lg" sx={{ maxWidth: "100%", width: "100%" }}>
          {[
            {
              title: t(
                "How does the mobile electric vehicle charging service work?"
              ),
              text: t(
                "Our mobile EV charging service sends a technician to your location to charge your electric vehicle on-site, providing convenience and peace of mind."
              ),
            },
            {
              title: t("What types of electric vehicles do you support?"),
              text: t(
                "We support all types of electric vehicles, including plug-in hybrids and fully electric models from various manufacturers."
              ),
            },
            {
              title: t("Is the charging process safe for my electric vehicle?"),
              text: t(
                "Yes, our technicians are trained to handle EV charging safely, following industry standards to ensure your vehicle’s protection during the charging process."
              ),
            },
            {
              title: t(
                "How long does it take to charge an electric vehicle with your service?"
              ),
              text: t(
                "Charging time varies depending on your vehicle’s battery capacity and current charge level. Our technicians can provide an estimate based on your specific situation."
              ),
            },
            {
              title: t("Do I need to create an account to use MobilCharge?"),
              text: t(
                "Yes, and it’s a simple and secure user registration process."
              ),
            },
            {
              title: t(
                "Isn't it counterproductive to charge my electric vehicle with a mobile service?"
              ),
              text: t(
                "MobilCharge uses existing charging stations to power EVs. We understand and share our customers’ concerns, which is why we prioritize renewable energy. Overall, we believe that the benefits of providing a mobile EV charging solution outweigh not having these electric vehicles on the road."
              ),
            },
            {
              title: t(
                "What areas do you cover for your mobile electric vehicle charging service?"
              ),
              text: t(
                "We currently offer our mobile EV charging service in the Greater Montreal area."
              ),
            },
          ].map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary>
                <span className="font-light lg:text-lg py-2">{item.title}</span>
              </AccordionSummary>
              <AccordionDetails>{item.text}</AccordionDetails>
            </Accordion>
          ))}
        </AccordionGroup>
      </div>
    </>
  );
};

export default Home;
