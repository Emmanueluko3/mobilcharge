import React from "react";
import { useTranslation } from "react-i18next";

const Trucks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Active Drivers */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold w-full mb-4">
          {t("Active Drivers")}
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex justify-between items-center bg-white rounded-lg p-4">
            <img
              src="https://avatars.githubusercontent.com/u/101985715?v=4"
              className="rounded-full h-10 w-10"
              alt="mee"
            />
            <div className="mx-2 me-auto">
              <h3 className="font-semibold text-base">Emmanuel Step</h3>
              <p className="text-xs font-medium text-gray-500">
                {t("Truck Driver")} #1
              </p>
            </div>
            <button className="text-primary-500 hover:text-primary-700 transition-all text-sm font-bold">
              Message
            </button>
          </div>{" "}
          <div className="flex justify-between items-center bg-white rounded-lg p-4">
            <img
              src="https://avatars.githubusercontent.com/u/101985715?v=4"
              className="rounded-full h-10 w-10"
              alt="mee"
            />
            <div className="mx-2 me-auto">
              <h3 className="font-semibold text-base">Emmanuel Step</h3>
              <p className="text-xs font-medium text-gray-500">
                {t("Truck Driver")} #1
              </p>
            </div>
            <button className="text-primary-500 hover:text-primary-700 transition-all text-sm font-bold">
              Message
            </button>
          </div>{" "}
          <div className="flex justify-between items-center bg-white rounded-lg p-4">
            <img
              src="https://avatars.githubusercontent.com/u/101985715?v=4"
              className="rounded-full h-10 w-10"
              alt="mee"
            />
            <div className="mx-2 me-auto">
              <h3 className="font-semibold text-base">Emmanuel Step</h3>
              <p className="text-xs font-medium text-gray-500">
                {t("Truck Driver")} #1
              </p>
            </div>
            <button className="text-primary-500 hover:text-primary-700 transition-all text-sm font-bold">
              Message
            </button>
          </div>
        </div>
      </div>
      {/* All Drivers */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold w-full mb-4">
          {t("All Drivers")}
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex justify-between items-center bg-white rounded-lg p-4">
            <img
              src="https://avatars.githubusercontent.com/u/101985715?v=4"
              className="rounded-full h-10 w-10"
              alt="mee"
            />
            <div className="mx-2 me-auto">
              <h3 className="font-semibold text-base">Emmanuel Step</h3>
              <p className="text-xs font-medium text-gray-500">
                {t("Truck Driver")} #1
              </p>
            </div>
            <button className="text-primary-500 hover:text-primary-700 transition-all text-sm font-bold">
              Message
            </button>
          </div>{" "}
          <div className="flex justify-between items-center bg-white rounded-lg p-4">
            <img
              src="https://avatars.githubusercontent.com/u/101985715?v=4"
              className="rounded-full h-10 w-10"
              alt="mee"
            />
            <div className="mx-2 me-auto">
              <h3 className="font-semibold text-base">Emmanuel Step</h3>
              <p className="text-xs font-medium text-gray-500">
                {t("Truck Driver")} #1
              </p>
            </div>
            <button className="text-primary-500 hover:text-primary-700 transition-all text-sm font-bold">
              Message
            </button>
          </div>{" "}
          <div className="flex justify-between items-center bg-white rounded-lg p-4">
            <img
              src="https://avatars.githubusercontent.com/u/101985715?v=4"
              className="rounded-full h-10 w-10"
              alt="mee"
            />
            <div className="mx-2 me-auto">
              <h3 className="font-semibold text-base">Emmanuel Step</h3>
              <p className="text-xs font-medium text-gray-500">
                {t("Truck Driver")} #1
              </p>
            </div>
            <button className="text-primary-500 hover:text-primary-700 transition-all text-sm font-bold">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trucks;
