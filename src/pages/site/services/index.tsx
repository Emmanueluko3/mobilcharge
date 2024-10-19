import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCar,
  faCity,
  faGauge,
  faHouse,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import CarForest from "../../../assets/images/car-forest.jpg";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import pricingBg from "../../../assets/images/pricingBg.jpg";
import { useTranslation } from "react-i18next";

const Service: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pricingRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (location.hash === "#pricing" && pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
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
            src="assets/MobilCharge_ServiceClient_RechargeVehicule.mp4"
            type="video/mp4"
          />
        </video>

        <div className="bg-[#0000007A] bg-opacity-90 text-gray-200 z-50 h-full flex flex-col justify-center items-center">
          <h3 className="text-xl lg:text-6xl font-bold mt-auto text-center">
            {t("Services")}
          </h3>

          <div className="flex items-center mt-auto text-base lg:text-lg font-medium">
            <Link to="/" className="pb-2">
              {t("Home")}
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="mx-4 pb-2" />

            <Link
              to="/services"
              className="text-primary-500 border-b-2 border-primary-500 pb-2 px-2"
            >
              {t("Services")}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-20">
        <h2 className="text-xl lg:text-4xl font-bold mb-8 text-center">
          {t("MOBILCHARGE TECHNOLOGY : FAST CHARGING")}
        </h2>
        <h2 className="text-primary-500 text-lg lg:text-xl font-bold mb-10 lg:mb-16 text-center">
          {t(
            "Revolutionize your electric vehicle charging experience, whether at home, at the office, or anywhere in Montreal."
          )}
        </h2>

        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="">
            <p className="text-sm font-medium mb-8">
              {t(
                "MobilCharge utilizes a mobile transport unit to deliver battery-powered systems to clients and can remotely recharge CHAdeMO, CCS, and GB/T electric vehicles. It’s an entirely eco-friendly storage system that doesn’t rely on gasoline-powered generators internally. The internal battery is charged by the AC grid or public charging stations."
              )}
            </p>

            <ul className="list-disc ml-10 mb-4">
              {[
                {
                  title: t("Hassle-Free Charging"),
                  text: t(
                    "Charge your electric vehicle anytime, anywhere with our on-demand service."
                  ),
                },
                {
                  title: t("User-Friendly Planning"),
                  text: t(
                    "Easily schedule and manage your charging sessions with our intuitive web and mobile planner."
                  ),
                },
                {
                  title: t("Level 3 Fast Charging – 80KW (max 220A)"),
                  text: t(
                    "Get fast charging for your electric vehicle with our high-speed mobile charging service."
                  ),
                },
                {
                  title: t("Time Savings"),
                  text: t("Eliminate the inconvenience of stopping to charge."),
                },
                {
                  title: t("24/7 Support"),
                  text: t(
                    "Our customer support team is available to assist with any charging-related questions."
                  ),
                },
              ].map((item, index) => (
                <li key={index} className="text-sm leading-6">
                  <span className="font-bold">{item.title}</span> : {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <p className="text-sm font-medium mb-4">
              {t(
                "Enjoy hassle-free electric vehicle charging with our convenient features :"
              )}
            </p>
            <ul className="list-disc ml-10 mb-4">
              {[
                t("No upfront, installation, or permit fees."),
                t("Responsive fast-charging service."),
                t("Pay-as-you-go or Charging as a Service (CaaS) program."),
                t("Easy online reservation and payment."),
                t("Support for both DC fast charging and AC charging."),
                t("Multiple connector types for all electric vehicle models."),
                t(
                  "Reliability and stability to function effectively in all environments."
                ),
                t(
                  "Intelligent management functions that monitor the charging process and automatically stop charging to ensure safety and energy efficiency."
                ),
              ].map((item, index) => (
                <li key={index} className="text-sm leading-6">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-primary-500 mt-14 lg:mt-56 p-0">
        <div className=" h-[40vh] w-full relative flex justify-center items-end py-10">
          <img
            data-aos="fade-up"
            src="assets/LettrageTransit_MobilCharge_sans-ombre-1024x799.png"
            className="absolute -top-10 lg:-top-96 rounded-lg z-10"
            alt=""
          />
        </div>
        <div className="px-4 lg:px-32 flex flex-col justify-center items-center pb-20">
          <h3 className="text-2xl lg:text-5xl font-bold mb-10 text-white">
            {t("Why Choose MobilCharge?")}
          </h3>
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FontAwesomeIcon icon={faCar} />,
                title: t("Local Service"),
                text: t(
                  "Support your community with a locally-operated mobile charging solution that understands your needs."
                ),
              },
              {
                icon: <FontAwesomeIcon icon={faLeaf} />,
                title: t("Eco-friendly"),
                text: t(
                  "Reduce emissions and contribute to a cleaner environment with our sustainable charging solutions."
                ),
              },
              {
                icon: <FontAwesomeIcon icon={faGauge} />,
                title: t("Fast and Reliable"),
                text: t(
                  "Count on MobilCharge for quick and mobile charging services, so you can get back on the road with confidence."
                ),
              },
              {
                icon: (
                  <svg
                    aria-hidden="true"
                    className="h-16 mr-2"
                    viewBox="0 0 576 512"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M336 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h320c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm208-320V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-32V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-16c-8.84 0-16 7.16-16 16v32c0 35.76 23.62 65.69 56 75.93v118.49c0 13.95-9.5 26.92-23.26 29.19C431.22 402.5 416 388.99 416 372v-28c0-48.6-39.4-88-88-88h-8V64c0-35.35-28.65-64-64-64H96C60.65 0 32 28.65 32 64v352h288V304h8c22.09 0 40 17.91 40 40v24.61c0 39.67 28.92 75.16 68.41 79.01C481.71 452.05 520 416.41 520 372V251.93c32.38-10.24 56-40.17 56-75.93v-32c0-8.84-7.16-16-16-16h-16zm-283.91 47.76l-93.7 139c-2.2 3.33-6.21 5.24-10.39 5.24-7.67 0-13.47-6.28-11.67-12.92L167.35 224H108c-7.25 0-12.85-5.59-11.89-11.89l16-107C112.9 99.9 117.98 96 124 96h68c7.88 0 13.62 6.54 11.6 13.21L192 160h57.7c9.24 0 15.01 8.78 10.39 15.76z"></path>
                  </svg>
                ),
                title: t("Advanced Technology"),
                text: t(
                  "Using the latest mobile charging technology, we ensure efficient and lightning-fast charging."
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-white flex flex-col justify-between items-center p-10 h-96 lg:px-6"
              >
                <span className="text-primary-500 text-5xl mb-4">
                  {item.icon}
                </span>

                <p className="text-center text-sm lg:text-base font-medium text-black transition-all hover:text-black leading-8">
                  <span className="font-bold mr-1">{item.title}</span>:{" "}
                  {item.text}
                </p>

                <Link
                  to="/contact"
                  className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all px-5 py-1 font-bold"
                >
                  {t("CONTACT US").toLocaleUpperCase()}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:h-72">
          <video
            className="h-full w-full  overflow-hidden object-cover pointer-events-none"
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

        <div className="px-4 lg:px-32 flex flex-col justify-center items-center bg-white py-20">
          <h3 className="text-2xl lg:text-4xl font-bold text-center mb-8">
            {t("The Landscape of Electric Vehicle Charging in Montreal")}
          </h3>
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {[
              {
                icon: <FontAwesomeIcon icon={faCity} />,
                title: t("URBAN AREA MOBILE CHARGING"),
                text: t(
                  "The Montreal area requires specialized solutions (Mobile Charging) due to its high urban density, particularly in multi-unit residential buildings (MURBs), unaddressed by Quebec’s charging ecosystem."
                ),
              },
              {
                icon: <FontAwesomeIcon icon={faHouse} />,
                title: t("RESIDENTIAL CHARGING CHALLENGES"),
                text: t(
                  "Over 80% of Montreal households reside in MURBs, but only 38% of them plan to have access to private home charging by 2030, highlighting a growing need for alternative charging solutions."
                ),
              },
              {
                icon: (
                  <svg
                    aria-hidden="true"
                    className="h-16 mr-2"
                    viewBox="0 0 576 512"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M336 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h320c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm208-320V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-32V80c0-8.84-7.16-16-16-16s-16 7.16-16 16v48h-16c-8.84 0-16 7.16-16 16v32c0 35.76 23.62 65.69 56 75.93v118.49c0 13.95-9.5 26.92-23.26 29.19C431.22 402.5 416 388.99 416 372v-28c0-48.6-39.4-88-88-88h-8V64c0-35.35-28.65-64-64-64H96C60.65 0 32 28.65 32 64v352h288V304h8c22.09 0 40 17.91 40 40v24.61c0 39.67 28.92 75.16 68.41 79.01C481.71 452.05 520 416.41 520 372V251.93c32.38-10.24 56-40.17 56-75.93v-32c0-8.84-7.16-16-16-16h-16zm-283.91 47.76l-93.7 139c-2.2 3.33-6.21 5.24-10.39 5.24-7.67 0-13.47-6.28-11.67-12.92L167.35 224H108c-7.25 0-12.85-5.59-11.89-11.89l16-107C112.9 99.9 117.98 96 124 96h68c7.88 0 13.62 6.54 11.6 13.21L192 160h57.7c9.24 0 15.01 8.78 10.39 15.76z"></path>
                  </svg>
                ),
                title: t("CHARGING STATION REQUIREMENTS"),
                text: t(
                  "By 2030, according to the ICCT report, approximately 1.1 million private home charging stations, 23,700 workplace stations, and 18,900 depot stations will be needed to meet Montreal’s electric charging needs."
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-gray-100 flex flex-col justify-between items-center px-6 py-16 lg:px-10"
              >
                <span className="text-primary-500 text-5xl mb-10">
                  {item.icon}
                </span>

                <h2 className="font-bold mb-6 text-gray-500 text-xl lg:text-3xl">
                  {item.title.toLocaleUpperCase()}
                </h2>

                <p className="text-center text-sm lg:text-base font-medium text-black transition-all hover:text-black leading-8">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-primary-500 flex flex-col lg:flex-row justify-between text-white lg:items-center p-10 lg:p-20">
            <div className="w-full lg:w-3/4 mb-6 lg:mb-0">
              <h3 className="text-white mb-6 text-xl lg:text-4xl font-medium">
                {t("Charge Anywhere, Anytime.")}
              </h3>
              <p className="text-white text-sm lg:text-base">
                {t(
                  "Take control of the electric future of Greater Montreal. Explore our urban charging solutions, address residential challenges, and meet infrastructure needs."
                )}
              </p>
            </div>
            <Link
              to="/contact-us"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-500 text-sm lg:text-base transition-all px-5 py-3 font-bold flex items-center w-fit text-nowrap"
            >
              {t("CONTACT US").toLocaleUpperCase()}
            </Link>
          </div>
        </div>

        <section
          ref={pricingRef}
          id="pricing"
          className="flex flex-col py-10 lg:py-24 items-center relative bg-white"
        >
          <div
            style={{
              backgroundImage: `url(${pricingBg})`,
              backgroundBlendMode: "overlay",
            }}
            className={`absolute top-0 w-full bg-cover bg-no-repeat inset-0 bg-black bg-opacity-50 h-[55vh] z-10`}
          ></div>
          <h2 className="font-bold text-2xl lg:text-5xl text-white z-20">
            {t("Pricing")}
          </h2>
          <p className="w-4/5 lg:w-3/5 text-center font-medium my-10 lg:my-16 text-white z-20">
            {
              "Choose the plan that fits your charging needs and enjoy the convenience of our mobile EV charging service. Join today to benefit from the convenience and security of reliable emergency charging for your EV, available whenever you need it."
            }
          </p>
          <div className="flex flex-row flex-wrap px-8 lg:px-0 justify-center gap-10 z-20">
            {[
              {
                plan: t("VISITOR").toLocaleUpperCase(),
                description: t(
                  "Electric vehicle owners seeking a quick charging solution"
                ),
                features: [
                  t("Individuals price list"),
                  t("Price per 20 min charge (max 20kWh) with membership $32"),
                  t(
                    "Price per 20 min charge (max 20kWh) without membership $40"
                  ),
                  t("Emergency charge (max 50km) $200"),

                  t(
                    "Note : Vehicules must be accessible and unlocked to receive a charge"
                  ),
                ],
              },

              {
                plan: t("Membership"),
                description: t(
                  "Electric vehicle owners seeking a recurring charging solution"
                ),
                features: [
                  t("All features of the VISITOR plan"),
                  t("Extended charging time per session"),
                  t("Priority customer support"),
                  t("Monthly subscription fee"),
                  t("Discounts on additional services"),
                  t("Price per 20 min charge (max 20kWh) with membership $32"),
                  t(
                    "Note : Vehicules must be accessible and unlocked to receive a charge"
                  ),
                ],
              },

              {
                plan: t("Tailored Plan"),
                description: t(
                  "Hotels, event centers, fleets, dealerships, businesses, events, etc."
                ),
                features: [
                  t("Corporate price list"),
                  t(
                    "Price per day (6 hrs) (max 18 charges - total 320kWh) $500"
                  ),
                  t(
                    "Price per half day (3 hrs) (max 9 charges - total 160kWh) $250"
                  ),
                  t("Price per hour (max 3 charges - total 60kWh) $90"),
                  t("No membership for corporate clients $0"),

                  t(
                    "Note : Vehicules must be accessible and unlocked to receive a charge"
                  ),
                ],
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center lg:h-[660px] lg:w-[600px]"
              >
                <div className="w-full bg-primary-500 text-white flex flex-col items-center py-8 lg:py-10">
                  <h3 className="font-medium text-3xl lg:text-4xl text-center mb-3 lg:mb-4 px-4">
                    {item.plan.toLocaleUpperCase()}
                  </h3>
                  <p className="text-sm lg:text-base text-center px-4">
                    {item.description}
                  </p>
                </div>
                <div className="border-x-2 border-b-2 border-gray-300 h-full w-full bg-white flex flex-col items-center justify-between pb-4">
                  <div className="w-full flex flex-col items-center justify-center">
                    {item.features.map((item, index) => (
                      <p
                        key={index}
                        className={`w-full font-medium text-center py-4 text-sm ${
                          index % 2 !== 0 ? "bg-gray-100" : ""
                        }`}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                  <Link
                    to="/dashboard/pricing"
                    className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm lg:text-base transition-all px-5 py-2 font-bold flex items-center w-fit my-8"
                  >
                    {t("JOIN US")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-center items-center w-full py-20">
          <Link
            to="/booking"
            className="border-2 border-white text-white hover:bg-white hover:text-primary-500 text-sm lg:text-base transition-all px-5 py-3 font-bold flex items-center"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row">
          <div className="order-1 lg:order-1">
            <video
              className="h-full w-full object-cover pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="assets/Recharge_Rapide_MobilCharge.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="order-2 lg:order-2 bg-gray-100 px-8 py-12 lg:p-20 flex flex-col items-center justify-center">
            <h2 className="text-2xl lg:text-5xl font-bold">
              {t("Our Vision")}
            </h2>
            <p className="font-medium text-center text-sm lg:text-base my-10">
              {t(
                "At MobilCharge, we are passionate engineers, inventors, skilled builders, and enthusiasts of all things electric and sustainable. From concept to execution, explore the journey of innovation reshaping our approach to mobile vehicle charging in our communities and our commitment to using cutting-edge technology to enhance the electric vehicle charging experience. Join us as we pave the way towards a greener, more convenient future of mobility, one charge at a time."
              )}
            </p>
            <Link
              to="/contact"
              className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm lg:text-base transition-all px-5 py-2 font-bold flex items-center w-fit"
            >
              {t("JOIN THE TEAM").toLocaleUpperCase()}
            </Link>
          </div>
          <div className="order-4 lg:order-3 bg-gray-100 px-8 py-12 lg:p-20 flex flex-col items-center justify-center">
            <h2 className="text-2xl lg:text-5xl text-center font-bold">
              {t("Revolutionize EV charging with MobilCharge!")}{" "}
            </h2>
            <p className="font-medium text-center text-sm lg:text-base my-10">
              {t(
                "MobilCharge is breaking norms with its distinctly adaptable and affordable mobile charging solution for electric vehicles. No longer confined to stationary charging stations, MobilCharge now powers your electric vehicles directly at your home, office, or wherever you are! Offering an affordable, efficient, and eco-friendly solution for your electric vehicle charging needs, our team of friendly technicians operates locally, bringing convenient charging right to your doorstep, workplace, or wherever your adventures take you."
              )}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                t("Condos, Apartments, or Houses"),
                t("Trucks, Vans, or Buses"),
                t("Offices"),
                t("Events"),
                t("Shopping Centers"),
                t("Roadside Assistance"),
                t("Hotels"),
                t("Car Dealerships"),
              ].map((item, index) => (
                <h3 key={index} className="flex items-center">
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    className="mr-4 text-primary-500"
                  />
                  {item}
                </h3>
              ))}
            </div>
          </div>
          <div
            style={{ background: `url(${CarForest})` }}
            className="order-3 lg:order-4 h-full w-full bg-no-repeat bg-cover"
          ></div>
        </div>
      </div>
    </>
  );
};

export default Service;
