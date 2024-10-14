import { Box, CircularProgress } from "@mui/joy";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useCountUp } from "use-count-up";
import useFetch from "../../components/hooks/useFetch";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Overview: React.FC = () => {
  const { t } = useTranslation();

  const { data: pendingRequest, isLoading: isPendingRequestLoading } = useFetch(
    `/api/booking/bookings/Pending`
  );

  const { data: approvedRequest, isLoading: isapprovedRequestLoading } =
    useFetch(`/api/booking/bookings/Approved`);

  const { data: completedRequest, isLoading: iscompletedRequestLoading } =
    useFetch(`/api/booking/bookings/Completed`);

  // Request Percentages
  const totalPendingRequests = pendingRequest?.length || 0;
  const completedPercentage = totalPendingRequests
    ? (completedRequest?.length / totalPendingRequests) * 100
    : 0;

  const { value: value2, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: Number(completedPercentage.toFixed()),
  });

  useEffect(() => {
    reset();
  }, [pendingRequest]);

  // Carousel scroll
  const scrollRef: any = useRef(null);
  const scroll = (direction: string) => {
    const scrollAmount = scrollRef.current.clientWidth / 2; // Scroll by the width of one item
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-screen">
      {/* Overview */}

      <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12 mb-16 w-full">
        <div className="lg:col-span-7">
          <div className="w-full lg:w-52 lg:h-52 bg-gray-900 text-white rounded-2xl p-4 flex flex-col justify-between mb-8 lg:mb-16">
            <h3 className="text-base font-semibold">{t("Pending Requests")}</h3>

            <h2 className="text-3xl font-bold my-3">
              {pendingRequest?.length || 0}
            </h2>
            <div className="flex items-center justify-between">
              <CircularProgress
                size="lg"
                determinate
                value={Number(value2) as number}
              >
                <p className="text-white text-sm">{value2}%</p>
              </CircularProgress>
              <div className="flex-col flex items-center">
                <span className="mb-2 font-bold text-lg">
                  {completedRequest?.length || 0}
                </span>
                <p className="text-[#8E92BC] text-base">{t("Completed")}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10">
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
              <div
                key={index}
                className="p-3 lg:p-4 rounded-2xl bg-white bg-opacity-50"
              >
                <img
                  src={item.vehicle_image}
                  alt={item.car_make}
                  className="rounded-2xl h-40 lg:h-48 w-full object-cover mb-2"
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

                <p className="text-gray-950 flex items-center text-sm font-semibold">
                  <FontAwesomeIcon icon={faClock} className="mr-2 h-5 w-5" />
                  {t("Requested")}

                  <span className="text-gray-600 flex ms-2">{item.date}</span>
                </p>
              </div>
            ))}
          </Box>
        </div>
        <div className="lg:col-span-5">
          {approvedRequest?.length > 0 &&
            approvedRequest?.splice(0, 1).map((item: any, index: number) => (
              <div
                key={index}
                className="lg:p-4 rounded-2xl bg-white bg-opacity-50"
              >
                <h3 className="font-semibold text-lg mb-5">
                  {t("Client Request")}
                </h3>
                <img
                  src={item?.vehicle_image}
                  alt={item?.car_make}
                  className="rounded-2xl h-52 w-full object-cover mb-2"
                />
                <h3 className="font-semibold text-lg">
                  {item?.user?.first_name} {item?.user?.last_name}
                </h3>
                <p className="my-2 text-sm text-gray-600">
                  <span className="font-medium">{t("Car Model")}</span>:{" "}
                  {item?.car_make}
                </p>
                <p className="my-2 text-sm text-gray-600">
                  <span className="font-medium">{t("Location")}</span>:{" "}
                  {item?.location}
                </p>
                <Link
                  to={`tel:${item?.user?.phone}`}
                  className="text-sm text-primary-500 mb-4 flex hover:text-primary-700"
                >
                  {item?.user?.phone}
                </Link>

                <p className="text-gray-950 flex items-center text-sm font-semibold mb-12">
                  <FontAwesomeIcon icon={faClock} className="mr-2 h-5 w-5" />
                  {t("Requested")} {item?.date}
                </p>

                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg mb-3">
                    {t("Detail Task")}
                  </h3>

                  <div className="flex items-center my-1">
                    <p className="text-gray-800 text-sm font-medium mr-3">
                      {t("Battery Percentage")}:
                    </p>
                    <span className="rounded-xl p-2 text-sm flex items-center justify-center">
                      {item?.battery_level}%
                    </span>
                  </div>
                  <div className="flex items-center my-1">
                    <p className="text-gray-800 text-sm font-medium mr-3">
                      {t("Battery Type")}:
                    </p>
                    <span className="text-sm flex">{item?.battery_type}</span>
                  </div>
                  <Link
                    to={`/admin/requests/${item.invoice_id}`}
                    className="mt-10 lg:mt-16 bg-primary-500 w-full rounded-lg py-2 px-10 font-semibold text-white hover:bg-opacity-80 transition-all flex items-center text-center text-sm justify-center"
                  >
                    {t("See details")}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
