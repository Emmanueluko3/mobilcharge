import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { AppInput } from "../../components/common/input";
import { Button } from "../../components/common/button";
import { faImage } from "@fortawesome/free-regular-svg-icons";

const electricVehicleMakes = [
  "Tesla Model S",
  "Tesla Model 3",
  "Tesla Model X",
  "Tesla Model Y",
  "Ford Mustang Mach-E",
  "Ford F-150 Lightning",
  "Chevrolet Bolt EV",
  "Chevrolet Blazer EV",
  "BMW i4",
  "BMW iX",
  "BMW i5",
  "Mercedes-Benz EQE",
  "Mercedes-Benz EQS",
  "Mercedes-Benz EQB",
  "Audi Q4 e-tron",
  "Audi e-tron GT",
  "Hyundai Ioniq 5",
  "Hyundai Ioniq 6",
  "Kia EV6",
  "Nissan Ariya",
  "Nissan Leaf",
  "Volkswagen ID.4",
  "Volkswagen ID.Buzz",
  "Volvo XC40 Recharge",
  "Volvo C40 Recharge",
  "Porsche Taycan",
];
const electricVehicleBatteryTypes = [
  "Lithium-ion (Li-ion)",
  "Lithium Iron Phosphate (LFP)",
  "Nickel-Metal Hydride (NiMH)",
  "Solid-state Battery",
  "Nickel-Cobalt-Aluminum (NCA)",
  "Nickel-Manganese-Cobalt (NMC)",
  "Lithium-Sulfur (Li-S)",
  "Zinc-Air",
  "Sodium-ion",
];

const Book: React.FC = () => {
  const { t } = useTranslation();
  const [bookData, setBookData] = useState({ email: "", password: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };
  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-12 p-4 lg:p-6 bg-white rounded-lg">
      <div className="lg:col-span-5">
        <h2 className="text-3xl font-semibold">
          {t("Request a charge for now or later")}
        </h2>
        <p className="text-sm my-3">
          {t("Add your car details, book,  and go")}
        </p>

        <div className="mb-8">
          <div className="mb-4">
            <AppInput placeholder={t("Enter location")} />
          </div>
          <Button>{t("See Prices")}</Button>

          <p className="text-sm mt-3">
            <FontAwesomeIcon icon={faUsers} className="mr-3" />1{" "}
            {t("Available Trucks")}
          </p>
        </div>

        {/* Car details */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">{t("Car details")}</h3>
          <div className="mb-2">
            <select
              className="block w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              defaultValue=""
            >
              <option value="" disabled hidden>
                {t("Car make")}
              </option>
              {electricVehicleMakes.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <select
              className="block w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              defaultValue=""
            >
              <option value="" disabled hidden>
                {t("Battery type")}
              </option>
              {electricVehicleBatteryTypes.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <AppInput
              placeholder={`${t("Battery level")}: (${t("Optional")})`}
            />
          </div>
          <div className="mb-2">
            <AppInput
              placeholder={`${t("Kilometres left")}: (${t("Optional")})`}
            />
          </div>
        </div>

        {/* Car Image */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">
            {t("Picture of your vehicle")}
          </h3>
          <p className="text-xs my-3">*{t("drag or browse from device")}</p>
          <div className="mb-2 border-2 border-primary-500 border-dashed hover:border-solid transition-all rounded-lg w-full h-48 flex justify-center items-center cursor-pointer">
            <FontAwesomeIcon
              className="h-6 w-6 text-primary-500"
              icon={faImage}
            />
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">{t("Description")}</h3>
          <div className="mb-2">
            <textarea
              name="message"
              placeholder={t("Message")}
              className="block min-h-44 w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <Button className="w-full">{t("Submit")}</Button>
      </div>
    </div>
  );
};

export default Book;
