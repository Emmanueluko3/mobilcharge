import { CircularProgress, Typography } from "@mui/joy";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCountUp } from "use-count-up";
import useFetch from "../../components/hooks/useFetch";
import Tesla from "../../assets/images/Tesla_Model_Y.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const Overview: React.FC = () => {
  const { t } = useTranslation();

  const { value: value2, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: 75,
  });

  const {
    data: bookings,
    isLoading,
    error,
  } = useFetch("/api/booking/bookings/");

  useEffect(() => {
    reset();
  }, [bookings]);

  return (
    <div className="w-full h-screen">
      {/* Overview */}
      <div className="mb-16">
        <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="col-span-7">
            <div className="w-48 h-52 bg-gray-900 text-white rounded-2xl p-4 flex flex-col justify-between mb-16">
              <h3 className="text-base font-semibold">
                {t("Pending Requests")}
              </h3>
              <h2 className="text-3xl font-bold">65</h2>
              <div className="flex items-center justify-between">
                <CircularProgress
                  size="lg"
                  determinate
                  value={value2 as number}
                >
                  <p className="text-white text-sm">{value2}%</p>
                </CircularProgress>
                <div className="flex-col flex items-center">
                  <span className="mb-2 font-bold text-lg">1</span>
                  <p className="text-[#8E92BC] text-base">{t("Completed")}</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-10">
              {t("Pending Bookings")}
            </h2>
            <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="p-4 rounded-2xl bg-white bg-opacity-50">
                <img
                  src={Tesla}
                  alt="Tesla"
                  className="rounded-2xl h-48 w-full object-cover mb-2"
                />
                <h3 className="font-semibold text-lg">Marvin Gallek</h3>
                <p className="my-2 text-sm text-gray-800">
                  {t("Car Model")}: Tesla
                </p>
                <Link
                  to="tel:514-585-3281"
                  className="text-sm text-primary-500 mb-4 flex hover:text-primary-700"
                >
                  514-585-3281
                </Link>

                <p className="text-gray-950 flex items-center text-sm font-semibold">
                  <FontAwesomeIcon icon={faClock} className="mr-2 h-5 w-5" />
                  {t("Requested")} 24 mins ago
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white bg-opacity-50">
                <img
                  src={Tesla}
                  alt="Tesla"
                  className="rounded-2xl h-48 w-full object-cover mb-2"
                />
                <h3 className="font-semibold text-lg">Marvin Gallek</h3>
                <p className="my-2 text-sm text-gray-800">
                  {t("Car Model")}: Tesla
                </p>
                <Link
                  to="tel:514-585-3281"
                  className="text-sm text-primary-500 mb-4 flex hover:text-primary-700"
                >
                  514-585-3281
                </Link>

                <p className="text-gray-950 flex items-center text-sm font-semibold">
                  <FontAwesomeIcon icon={faClock} className="mr-2 h-5 w-5" />
                  {t("Requested")} 24 mins ago
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-5">
            <div className="p-4 rounded-2xl bg-white bg-opacity-50">
              <img
                src={Tesla}
                alt="Tesla"
                className="rounded-2xl h-52 w-full object-cover mb-2"
              />
              <h3 className="font-semibold text-lg">Marvin Gallek</h3>
              <p className="my-2 text-sm text-gray-800">
                {t("Car Model")}: Tesla
              </p>
              <Link
                to="tel:514-585-3281"
                className="text-sm text-primary-500 mb-4 flex hover:text-primary-700"
              >
                514-585-3281
              </Link>

              <p className="text-gray-950 flex items-center text-sm font-semibold">
                <FontAwesomeIcon icon={faClock} className="mr-2 h-5 w-5" />
                {t("Requested")} 24 mins ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
