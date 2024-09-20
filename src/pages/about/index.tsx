import React from "react";
import PageTemplate from "../../templates/pageTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCar,
  faGauge,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CarForest from "../../assets/images/car-forest.jpg";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

const About: React.FC = () => {
  return (
    <PageTemplate>
      {/* Hero section */}
      <div className="w-full relative h-[65vh]">
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
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-20">
        <h2 className="text-xl lg:text-4xl font-bold mb-8 text-center">
          FREE YOURSELF WITH MOBILE CHARGING
        </h2>
        <h2 className="text-primary-500 text-lg lg:text-xl font-bold mb-10 lg:mb-16 text-center">
          Transform the way you charge your electric vehicle, at home, at work,
          or anywhere in Montreal.
        </h2>

        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="">
            <p className="text-sm font-medium">
              In a constantly evolving world, electric mobility is becoming the
              norm, but challenges remain. MobilCharge is the pioneer of at-home
              or workplace electric vehicle charging services in Montreal. Our
              mission is simple: eliminate the barriers preventing you from
              fully enjoying your electric car
            </p>
            <blockquote className="p-20 border my-4">
              <p className="text-xl text-gray-500 leading-8">
                TELL US WHEN AND WHERE YOU NEED US, AND MOBILCHARGE WILL BE
                THERE FOR YOU.
              </p>
            </blockquote>
            <p className="text-sm font-medium">
              Our qualified team will come to the location that suits you best,
              at a time that works for you ensuring a stress-free charging
              experience.
            </p>
          </div>
          <div className="">
            <p className="text-sm font-medium mb-4">
              The unbeatable benefits of mobile charging with MobilCharge
            </p>
            <ul className="list-disc ml-10 mb-4">
              <li className="text-sm leading-6">
                <span className="font-bold">Charging freedom</span> : No more
                fixed charging station constraints. MobilCharge offers the
                flexibility to charge your electric vehicle wherever you are.
                Whether you’re at home, at work, or elsewhere, we come to you.
              </li>
              <li className="text-sm leading-6">
                <span className="font-bold">Time-saving</span> : Modern life is
                hectic, and every minute counts. With MobilCharge, say goodbye
                to time-consuming stops at charging stations. We bring charging
                to your door, reducing unnecessary time loss. Goodbye
                installation hassle : For those who can’t install a home
                charging station, MobilCharge offers mobile charging. No need
                for costly modifications or complicated permits. We’re here to
                make your life easier. On-demand service : We adapt to your busy
                schedule. Tell us where and when, and we’ll be there.
              </li>
              <li className="text-sm leading-6">
                <span className="font-bold">Goodbye installation hassle</span> :
                For those who can’t install a home charging station, MobilCharge
                offers mobile charging. No need for costly modifications or
                complicated permits. We’re here to make your life easier.
              </li>
              <li className="text-sm leading-6">
                <span className="font-bold">On-demand service</span> : We adapt
                to your busy schedule. Tell us where and when, and we’ll be
                there.
              </li>
            </ul>
            <p className="text-sm font-medium">
              MobilCharge represents the future of electric mobility, a future
              without constraints or compromises. Join us to embrace the freedom
              of mobile charging at home or at work. Redefine your electric
              driving experience with MobilCharge today!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary-500 mt-14 lg:mt-56 p-0">
        <div className=" h-[40vh] w-full relative flex justify-center items-end py-10">
          <img
            src="https://mobilcharge.ca/wp-content/uploads/2024/05/LettrageTransit_MobilCharge_sans-ombre-1024x799.png"
            className="absolute -top-10 lg:-top-96 rounded-lg z-10"
            alt=""
          />
        </div>
        <div className="px-4 lg:px-32 flex flex-col justify-center items-center pb-20">
          <h3 className="text-2xl lg:text-5xl font-bold mb-10 text-white">
            Why Choose MobilCharge?
          </h3>
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FontAwesomeIcon icon={faCar} />,
                title: "Local Service",
                text: "Support your community with a locally-operated mobile charging solution that understands your needs.",
              },
              {
                icon: <FontAwesomeIcon icon={faLeaf} />,
                title: "Eco-friendly",
                text: "Reduce emissions and contribute to a cleaner environment with our sustainable charging solutions.",
              },
              {
                icon: <FontAwesomeIcon icon={faGauge} />,
                title: "Fast and Reliable",
                text: "Count on MobilCharge for quick and mobile charging services, so you can get back on the road with confidence.",
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
                title: "Advanced Technology",
                text: "Using the latest mobile charging technology, we ensure efficient and lightning-fast charging.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-white flex flex-col justify-between items-center p-10 h-96 lg:px-6"
              >
                <span className="text-primary-500 text-5xl mb-4">
                  {item.icon}
                </span>

                <p className="text-center text-sm lg:text-base font-medium text-black hover:text-black leading-8">
                  <span className="font-bold mr-1">{item.title}</span>:{" "}
                  {item.text}
                </p>

                <Link
                  to="/contact"
                  className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all px-5 py-1 font-bold"
                >
                  CONTACT US
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 lg:px-32 flex flex-col justify-center items-center bg-white py-20">
          <h3 className="text-2xl lg:text-4xl font-bold">
            Charge Your Future.
          </h3>

          <p className="text-center text-sm lg:text-base font-medium text-black hover:text-black leading-8 my-6 lg:my-10 w-4/5">
            Join the revolution and enjoy the convenience of on-demand mobile
            charging throughout Greater Montreal. Say goodbye to range anxiety
            and hello to hassle-free driving!
          </p>

          <Link
            to="/booking"
            className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm lg:text-base transition-all px-5 py-2 font-bold flex items-center"
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
            BOOK NOW | Limited Availability{" "}
          </Link>
        </div>
        <div className="grid grid-cols-2 grid-flow-row">
          <div className="">
            <video className="h-full w-full object-cover" autoPlay muted loop>
              <source
                src="https://mobilcharge.ca/wp-content/uploads/2024/05/Recharge_Rapide_MobilCharge.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="bg-gray-100 p-20 flex flex-col items-center justify-center">
            <h2 className="text-5xl font-bold">Our Vision</h2>
            <p className="font-medium text-center text-sm lg:text-base my-10">
              At MobilCharge, we are passionate engineers, inventors, skilled
              builders, and enthusiasts of all things electric and sustainable.
              From concept to execution, explore the journey of innovation
              reshaping our approach to mobile vehicle charging in our
              communities and our commitment to using cutting-edge technology to
              enhance the electric vehicle charging experience. Join us as we
              pave the way towards a greener, more convenient future of
              mobility, one charge at a time.
            </p>
            <Link
              to="/contact"
              className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm lg:text-base transition-all px-5 py-2 font-bold flex items-center w-fit"
            >
              JOIN THE TEAM
            </Link>
          </div>
          <div className="bg-gray-100 p-20 flex flex-col items-center justify-center">
            <h2 className="text-5xl font-bold">
              Revolutionize EV charging with MobilCharge!
            </h2>
            <p className="font-medium text-center text-sm lg:text-base my-10">
              MobilCharge is breaking norms with its distinctly adaptable and
              affordable mobile charging solution for electric vehicles. No
              longer confined to stationary charging stations, MobilCharge now
              powers your electric vehicles directly at your home, office, or
              wherever you are! Offering an affordable, efficient, and
              eco-friendly solution for your electric vehicle charging needs,
              our team of friendly technicians operates locally, bringing
              convenient charging right to your doorstep, workplace, or wherever
              your adventures take you.
            </p>
            <div className="grid grid-cols-2 gap-6``">
              {[
                "Condos, Apartments, or Houses",
                "Trucks, Vans, or Buses",
                "Offices",
                "Events",
                "Shopping Centers",
                "Roadside Assistance",
                "Hotels",
                "Car Dealerships",
              ].map((item, index) => (
                <h3 key={index} className="flex items-center mb-3">
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    className="mr-4 text-primary-500"
                  />
                  {item}
                </h3>
              ))}
            </div>
          </div>
          <div className="">
            <img src={CarForest} alt="" className="h-full w-full" />
          </div>
        </div>
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
            BOOK NOW | Limited Availability{" "}
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
};

export default About;
