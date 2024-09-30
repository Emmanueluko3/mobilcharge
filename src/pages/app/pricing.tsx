import React from "react";
import { useTranslation } from "react-i18next";

const Pricing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="mb-16 bg-white rounded-lg p-12">
        <h2 className="text-3xl font-semibold w-full mb-4 border-b pb-3">
          {t("Pricing Plans")}
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col justify-between items-start bg-white rounded-lg p-4">
            <h2 className="text-4xl font-bold text-customPurple mb-4">
              $19{" "}
              <span className="text-gray-500 text-lg font-semibold">
                /{t("month")}
              </span>
            </h2>

            <h3 className="font-medium text-customPurple text-2xl">
              {t("Visitor")}
            </h3>
            <p className="text-base text-gray-500 my-5">
              {t("Electric vehicle owners seeking a quick charge")}
            </p>
            <button className="text-white bg-gray-400 px-6 py-2 hover:bg-gray-500 w-full transition-all text-sm font-bold flex justify-center items-center text-center rounded-full">
              Choose plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
