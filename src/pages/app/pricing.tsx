import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";

const Pricing: React.FC = () => {
  const { t } = useTranslation();

  const pricingPlans = [
    {
      price: "Free",
      title: t("Visitor"),
      description: t("Electric vehicle owners seeking a quick charge"),
      features: [
        t("Individuals price list"),
        t("With membership $32"),
        t("Without membership $40"),
        t("Emergency charge $200"),
      ],
    },
    {
      price: 54,
      title: t("Membership"),
      description: t("Electric vehicle owners seeking a quick charge"),
      features: [
        t("All Visitors plan features"),
        t("Extended charge time"),
        t("Priority customer support"),
        t("Monthly subscription fee"),
        t("Discount on additionals"),
        t("With membership $32"),
        t("Emergency charge $200"),
      ],
    },
    {
      price: 89,
      title: t("Tailored"),
      description: t(
        "Hotels, event centers, fleets, dealerships, businesses, events, etc."
      ),
      features: [
        t("Corporate price list"),
        t("Price per half day (3hrs) 9 charges"),
        t("9 charges - Total 160km $250"),
        t("Price per day (6hrs) 18 charges"),
        t("18 charges - Total 320km $500s"),
        t("Price per hour (3 charges) 60km $90"),
        t("No membership for corporates $0"),
      ],
      current: true,
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg p-4 lg:p-10">
        <h2 className="text-3xl font-semibold w-full mb-16 border-b pb-3">
          {t("Pricing Plans")}
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-10">
          {pricingPlans.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between items-start ${
                item.current
                  ? "bg-customPurple text-white lg:col-span-4"
                  : "bg-gray-100 lg:bg-white lg:col-span-3"
              }  rounded-2xl p-6`}
            >
              <div className="w-full flex justify-end h-12">
                {item.current && (
                  <div className="w-fit h-fit rounded-full px-4 py-1 text-purple-400 text-xs font-semibold bg-purple-900">
                    Current Plan
                  </div>
                )}
              </div>
              <h2
                className={`text-4xl font-bold mb-4 ${
                  item.current ? "text-white" : "text-customPurple"
                }`}
              >
                {item.price !== "Free" && "$"}
                {item.price}{" "}
                <span
                  className={`${
                    item.current ? "text-white" : "text-gray-500"
                  } text-lg font-semibold`}
                >
                  {item.price !== "Free" && `/${t("month")}`}
                </span>
              </h2>

              <h3
                className={`font-medium text-2xl ${
                  item.current ? "text-white" : "text-customPurple"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-base my-5 ${
                  item.current ? "text-white" : "text-gray-500"
                }`}
              >
                {item.description}
              </p>

              <div className="flex flex-col mb-10 lg:h-80">
                {item.features.map((text, index) => (
                  <div key={index} className="flex mb-1">
                    <span
                      className={`${
                        item.current
                          ? "bg-slate-600 text-white"
                          : "bg-primary-100 text-primary-500"
                      } mr-4 rounded-full h-5 w-[22px] p-2 flex items-center justify-center`}
                    >
                      <FontAwesomeIcon icon={faCheck} className="h-4" />
                    </span>
                    <p
                      className={`font-medium text-sm ${
                        item.current ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
              <button
                className={`${
                  item.current
                    ? "bg-purple-400 hover:bg-purple-700"
                    : "bg-gray-400 hover:bg-gray-500"
                } text-white  px-6 py-2  w-full transition-all text-sm font-bold flex justify-center items-center text-center rounded-full`}
              >
                Choose plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
