import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Tesla from "../../../assets/images/Tesla_Model_Y.jpg";
import MapImage from "../../../assets/images/map_image.png";
import { Box } from "@mui/joy";
import useFetch from "../../../components/hooks/useFetch";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Requests: React.FC = () => {
  const { t } = useTranslation();

  const {
    data: pendingRequest,
    isLoading: isPendingRequestLoading,
    error: isPendingRequestError,
  } = useFetch(`/api/booking/bookings/Pending`);

  const {
    data: approvedRequest,
    isLoading: isapprovedRequestLoading,
    error: isapprovedRequestError,
  } = useFetch(`/api/booking/bookings/Approved`);

  // const {
  //   id,
  //   user: {
  //     username,
  //     email,
  //     first_name,
  //     last_name,
  //     phone,

  //     profile_image,
  //     subscription_type,
  //   },

  //   location,
  //   car_make,
  //   battery_type,
  //   battery_level,
  //   kilometers_left,
  //   vehicle_image,
  //   description,
  //   booking_type,
  //   invoice_id,
  //   price,
  //   status,
  //   paid,
  //   scheduled_date_and_time,
  //   date,
  // } = approvedRequest[0] || {};

  // Carousel scroll
  const scrollRef: any = useRef(null);
  const scroll = (direction: string) => {
    const scrollAmount = scrollRef.current.clientWidth / 2;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-16 w-full bg-white rounded-lg p-3 lg:p-6 grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="flex justify-between items-center mb-5 lg:mb-10">
          <h2 className="text-2xl font-semibold">{t("Active Requests")}</h2>
          <span className="rounded-full w-4 h-4 bg-green-500"></span>
        </div>

        {approvedRequest?.length > 0 && (
          <div className="lg:p-4 rounded-2xl bg-white bg-opacity-50">
            <h3 className="font-semibold text-lg mb-5">
              {t("Client Request")}
            </h3>
            <img
              src={Tesla}
              alt="Tesla"
              className="rounded-2xl h-52 w-full object-cover mb-2"
            />
            <h3 className="font-semibold text-lg">Marvin Gallek</h3>
            <p className="my-2 text-sm text-gray-600">
              <span className="font-medium">{t("Car Model")}</span>: Tesla
            </p>
            <p className="my-2 text-sm text-gray-600">
              <span className="font-medium">{t("Location")}</span>: No.3,
              Maitama, Abuja, Nigeria
            </p>
            <Link
              to="tel:514-585-3281"
              className="text-sm text-primary-500 mb-4 flex hover:text-primary-700"
            >
              514-585-3281
            </Link>

            <p className="text-gray-950 flex items-center text-sm font-semibold mb-5">
              <FontAwesomeIcon icon={faClock} className="mr-2 h-5 w-5" />
              {t("Requested")} 24 mins ago
            </p>

            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-3">{t("Detail Task")}</h3>
              <div className="flex items-center my-2">
                <span className="rounded-xl p-2 bg-gray-300 text-sm flex items-center justify-center h-10 w-10 mr-4">
                  12%
                </span>
                <p className="text-gray-800 text-base font-medium">
                  Car Battery Percentage
                </p>
              </div>
              <Link
                to={`/admin/requests/1234`}
                className="mt-10 lg:mt-32 bg-primary-500 w-full rounded-lg py-2 px-10 font-semibold text-white hover:bg-opacity-80 transition-all flex items-center text-center text-sm justify-center"
              >
                {t("See details")}
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="lg:col-span-7">
        <div className="h-56 w-full my-10">
          <img
            src={MapImage}
            alt="Map"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg lg:text-2xl font-semibold">
            {t("Pending Bookings")}
          </h2>
          <div className="flex gap-10 mr-6 lg:mr-10">
            <button onClick={() => scroll("left")} className="flex">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-lg lg:text-2xl text-gray-600 hover:text-gray-900 transition-all"
              />
            </button>
            <button onClick={() => scroll("right")} className="flex">
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-lg lg:text-2xl text-gray-600 hover:text-gray-900 transition-all"
              />
            </button>
          </div>
        </div>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 1,
            py: 1,
            overflow: "auto",
            width: "100%",
            scrollSnapType: "x mandatory",
            "& > *": {
              scrollSnapAlign: "center",
              flex: {
                xs: "0 0 calc(90% - 8px)",
                sm: "0 0 calc(75% - 8px)",
                md: "0 0 calc(60% - 8px)",
                lg: "0 0 calc(48% - 8px)",
              },
            },
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {pendingRequest?.map((item: any, index: number) => (
            <div key={index} className="p-3 lg:p-4 rounded-2xl bg-opacity-50">
              <img
                src={item.vehicle_image}
                alt={item.car_make}
                className="rounded-2xl h-48 w-full object-cover mb-2"
              />
              <h3 className="font-semibold text-lg">
                {item.user.first_name + "  " + item.user.last_name}
              </h3>
              <p className="my-2 text-sm text-gray-800">
                {t("Car Model")}: {item.car_make}
              </p>
              <Link
                to={`tel:${item.user.phone}`}
                className="text-sm text-primary-500 mb-4 flex hover:text-primary-700"
              >
                {item.user.phone}
              </Link>

              <p className="text-gray-950 flex items-center text-sm font-semibold mb-10">
                <FontAwesomeIcon icon={faClock} className="mr-2 h-5 w-5" />
                {t("Requested")}
                <span className="text-gray-600 flex ms-2">{item.date}</span>
              </p>
              <Link
                to={`${item.invoice_id}`}
                className={`${
                  item.booking_type === "Normal" && "bg-green-500"
                } ${
                  item.booking_type === "Emergency" && "bg-red-500"
                }  w-full text-sm rounded-lg py-2 px-10 font-semibold text-white hover:bg-opacity-80 transition-all flex items-center text-center justify-center`}
              >
                {item.booking_type === "Normal" && t("Approve requests")}
                {item.booking_type === "Emergency" && t("Emergency Request")}
              </Link>
            </div>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default Requests;
