import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { AppInput } from "../../components/common/input";
import { Button } from "../../components/common/button";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import MapImage from "../../assets/images/map_image.png";
import MobileChargeBus from "../../assets/images/MobileChargebus.png";

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

interface bookDataProps {
  location: string;
  car_make: string;
  battery_type: string;
  battery_level: string;
  kilometers_left: string;
  vehicle_image: null | File;
  description: string;
  booking_type: string;
}

const Book: React.FC = () => {
  const { t } = useTranslation();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [bookData, setBookData] = useState<bookDataProps>({
    location: "",
    car_make: "",
    battery_type: "",
    battery_level: "",
    kilometers_left: "",
    vehicle_image: null,
    description: "",
    booking_type: "Normal",
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    switch (name) {
      case "vehicle_image":
        if (files) {
          setBookData({
            ...bookData,
            vehicle_image: files[0],
          });
        }
        break;

      default:
        setBookData({
          ...bookData,
          [name]: value,
        });
        break;
    }
  };

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12 p-4 lg:p-6 bg-white rounded-lg">
      <div className="lg:col-span-5">
        <h2 className="text-3xl font-semibold">
          {t("Request a charge for now or later")}
        </h2>
        <p className="text-sm my-3">
          {t("Add your car details, book,  and go")}
        </p>

        <div className="mb-8">
          <div className="mb-4">
            <AppInput
              name="location"
              value={bookData.location}
              type="text"
              onChange={handleChange}
              placeholder={t("Enter location")}
            />
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
              name="car_make"
              value={bookData.car_make}
              onChange={handleChange}
              className="block w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
              name="battery_type"
              value={bookData.battery_type}
              onChange={handleChange}
              className="block w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
              name="battery_level"
              value={bookData.battery_level}
              type="text"
              onChange={handleChange}
              placeholder={`${t("Battery level")}: (${t("Optional")})`}
            />
          </div>
          <div className="mb-2">
            <AppInput
              name="kilometers_left"
              value={bookData.kilometers_left}
              type="text"
              onChange={handleChange}
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
          <div
            onClick={() => imageInputRef?.current?.click()}
            className="mb-2 border-2 border-primary-500 border-dashed hover:border-solid transition-all rounded-lg w-full h-48 flex justify-center items-center cursor-pointer"
          >
            {" "}
            {bookData.vehicle_image ? (
              <img
                src={URL.createObjectURL(bookData.vehicle_image)}
                className="h-full w-full rounded-lg"
                alt=""
              />
            ) : (
              <FontAwesomeIcon
                className="h-6 w-6 text-primary-500"
                icon={faImage}
              />
            )}
          </div>
          <input
            type="file"
            className="hidden"
            name="vehicle_image"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleChange}
          />
        </div>

        {/* Message */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">{t("Description")}</h3>
          <div className="mb-2">
            <textarea
              value={bookData.description}
              onChange={handleChange}
              name="description"
              placeholder={t("Message")}
              className="block min-h-44 w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <Button className="w-full">{t("Submit")}</Button>
      </div>
      <div className="lg:col-span-7">
        <img src={MapImage} alt="Map" />
      </div>

      {/* next screen */}
      <>
        <div className="lg:col-span-5 h-fit">
          <h2 className="text-3xl font-semibold">
            {t("You are submitting a request for a charge")}
          </h2>
          <p className="text-sm my-3">{t("See details below!")}</p>
          <p className="text-sm mt-3 mb-8 text-gray-500">
            <FontAwesomeIcon icon={faUsers} className="mr-3" />
            {t("Truck")} #1
          </p>
        </div>
        <div className="lg:col-span-7 h-fit flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold w-full mb-4">
            {t("Truck Details")}
          </h2>
          <table className="table-auto w-full text-left my-4">
            <tbody>
              <tr>
                <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                  {t("Driver Name")}:
                </td>
                <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                  {t("Jodd")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                  {t("Charging speed")}:
                </td>
                <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                  032.4 {t("per second")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-5 h-fit">
          {/* Message for driver */}
          <div className="lg:my-8">
            <h3 className="text-xl font-semibold mb-2">
              {t("Leave a note for driver")}
            </h3>
            <div className="mb-2">
              <textarea
                name="message"
                placeholder={t("Message")}
                className="block min-h-44 w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>

          <Button className="w-full">{t("Book now")}!</Button>
        </div>
        <div className="lg:col-span-7 h-fit flex flex-col items-center justify-center">
          <img src={MobileChargeBus} className="h-80" alt="Charge van" />
        </div>
      </>
    </div>
  );
};

export default Book;
