import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import apiService from "../../api/apiServices";

const Drivers: React.FC = () => {
  const { t } = useTranslation();
  const [drivers, setDrivers] = useState([]);

  const fetchedDrivers = async () => {
    const response: any = await apiService("/api/driver/get-drivers/", "GET");
    if (response) {
      setDrivers(response?.data);
    } else return;
  };

  useEffect(() => {
    fetchedDrivers();
  }, []);

  return (
    <div className="w-full">
      {/* Active Drivers */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold w-full mb-4">
          {t("Active Drivers")}
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-3">
          {drivers?.filter((item: any) => item?.user?.is_active !== true) ? (
            drivers
              ?.filter((item: any) => item?.user?.is_active === true)
              .map((item: any, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white rounded-lg p-4"
                >
                  <img
                    src={item.user.profile_image}
                    className="rounded-full h-10 w-10"
                    alt="mee"
                  />
                  <div className="mx-2 me-auto">
                    <h3 className="font-semibold text-base">
                      {item.user.first_name} {item.user.last_name}
                    </h3>
                    <p className="text-xs font-medium text-gray-500">
                      {t("Truck Driver")} #{item.user.id}
                    </p>
                    <Link
                      to={`tel:${item.user.phone}`}
                      className="text-primary-500 hover:text-primary-700 transition-all text-sm font-bold"
                    >
                      {item.user.phone}
                    </Link>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-base">
              {t("No active driver yet")}
            </p>
          )}
        </div>
      </div>
      {/* All Drivers */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold w-full mb-4">
          {t("All Drivers")}
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-3">
          {drivers?.length > 0 ? (
            drivers?.map((item: any, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white rounded-lg p-4"
              >
                <img
                  src={item.user.profile_image}
                  className="rounded-full h-10 w-10"
                  alt="mee"
                />
                <div className="mx-2 me-auto">
                  <h3 className="font-semibold text-base">
                    {item.user.first_name} {item.user.last_name}
                  </h3>
                  <p className="text-xs font-medium text-gray-500">
                    {t("Truck Driver")} #{item.user.id}
                  </p>
                  <Link
                    to={`tel:${item.user.phone}`}
                    className="text-primary-500 hover:text-primary-700 transition-all text-sm font-bold"
                  >
                    {item.user.phone}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-base">{t("No driver yet")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drivers;
