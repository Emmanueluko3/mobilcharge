import React from "react";
import PageTemplate from "../../templates/pageTemplate";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/common/input";
import { Button } from "../../components/common/button";

const Reservation: React.FC = () => {
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
            src="https://mobilcharge.ca/wp-content/uploads/2024/05/Recharge_MobilCharge.mp4"
            type="video/mp4"
          />
        </video>

        <div className="bg-[#0000007A] bg-opacity-90 text-gray-200 z-50 h-full flex flex-col justify-center items-center">
          <h3 className="text-xl lg:text-6xl font-bold mt-auto text-center">
            Booking
          </h3>

          <div className="flex items-center mt-auto text-base lg:text-lg font-medium">
            <Link to="/" className="pb-2">
              Home
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="mx-4 pb-2" />

            <Link
              to="/booking"
              className="text-primary-500 border-b-2 border-primary-500 pb-2 px-2"
            >
              Booking
            </Link>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-16">
        <h2 className="text-xl lg:text-4xl font-bold mb-10 lg:mb-16 text-center">
          Choose sustainable and convenient mobility by booking your charging
          service with MobilCharge now using the form below.
        </h2>
        <div className="grid grid-cols-12 grid-flow-row gap-4 lg:gap-8 w-full">
          <div className="col-span-full lg:col-span-4">
            <Input type="text" placeholder="Name" name="Name" />
          </div>
          <div className="col-span-full lg:col-span-4">
            <Input type="email" placeholder="Name" name="Email" />
          </div>
          <div className="col-span-full lg:col-span-4">
            <Input type="text" placeholder="Phone" name="Phone" />
          </div>
          <div className="col-span-full lg:col-span-6">
            <Input type="date" placeholder="dd/mm/yyy" name="date" />
          </div>
          <div className="col-span-full lg:col-span-6">
            <Input type="text" placeholder="Reservation Time" />
          </div>
          <div className="col-span-full">
            <Input type="text" placeholder="Car Model" name="carModel" />
          </div>
          <div className="col-span-full">
            <Input type="Text" placeholder="Recharge Address" />
          </div>
          <div className="col-span-full">
            <textarea
              name="comments"
              placeholder="Comments"
              id=""
              className="block min-h-44 w-full border-0 p-4 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            ></textarea>
          </div>
          <div className="col-span-full">
            <Input type="Text" placeholder="Charging Time (Estimate)" />
          </div>
          <div className="col-span-full">
            <Button className="w-full">SUBMIT</Button>
          </div>
        </div>
      </div>
      {/* Contact info */}
      <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-16 mb-16">
        <h2 className="text-xl lg:text-4xl font-bold mb-10 lg:mb-16">
          Contact Information
        </h2>
        <div className="grid grid-cols-2 gap-6 lg:gap-8 w-full">
          {[
            {
              icon: faPhone,
              text: "Phone",
              link: "tel:+1234567890",
            },
            {
              icon: faEnvelope,
              text: "Email",
              link: "mailto:example@example.com",
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
              <span className="font-medium">{item.link.split(":")[1]}</span>
            </Link>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default Reservation;
