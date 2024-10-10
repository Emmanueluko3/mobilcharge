import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Button } from "../common/button";
import { useState } from "react";

const BookingSuccess = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const [driversNote, setDriversNote] = useState("");

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12 p-4 lg:p-6 bg-white rounded-lg">
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
            {t("Leave a note for the driver")}
          </h3>
          <div className="mb-2">
            <textarea
              name="drivers_note"
              onChange={(e) => setDriversNote(e.target.value)}
              value={driversNote}
              placeholder={t("Message")}
              className="block min-h-44 w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <button className="w-full px-8 py-1.5 text-base text-primary-500 border border-primary-500 hover:text-white hover:bg-primary-500 flex justify-center items-center rounded-md bg-primary font-semibold transition-all shadow-sm hover:opacity-75">
            {t("Back")}!
          </button>
          <Button className="w-full">{t("Book now")}!</Button>
        </div>
      </div>
      <div className="lg:col-span-7 h-fit flex flex-col items-center justify-center">
        <img
          src={bookingData?.vehicle_image}
          className="h-80"
          alt="Charge van"
        />
      </div>
    </div>
  );
};

export default BookingSuccess;
