import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileChargeBus from "../../../assets/images/MobileChargebus.png";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../../components/hooks/useFetch";

const BookingSuccessful: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const invoice_id = queryParams.get("booking_invoice_id");
  const { data: booking, isLoading } = useFetch(`/api/booking/${invoice_id}/`);

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-6  lg:grid-cols-12 p-4 lg:p-6 bg-white rounded-lg">
      <div className="lg:col-span-6 h-fit order-1">
        <h2 className="text-3xl font-semibold">
          {t("Thank you for your purchase with MobilCharge")}
        </h2>
        <p className="text-sm mt-3 mb-8 text-gray-500">
          <FontAwesomeIcon icon={faTruck} className="mr-3" />
          {t("Truck")} #1
        </p>
      </div>
      <div className="lg:col-span-6 h-fit flex flex-col items-center justify-center order-2">
        <h2 className="text-3xl font-semibold w-full mb-4">{t("Invoice")}</h2>
        <table className="table-auto w-full text-left my-4">
          <tbody>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {t("Booking type")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {booking?.booking_type}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {t("Invoice id")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {booking?.invoice_id}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {t("Price")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                ${booking?.price}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {t("Date")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {booking?.date}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="lg:col-span-10 h-fit flex flex-col items-start justify-center lg:order-4 order-3">
        <h2 className="text-3xl font-semibold w-full mb-4">
          {t("Truck Details")}
        </h2>
        <table className="table-auto lg:w-4/5 text-left my-4">
          <tbody>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {t("Driver Name")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {booking?.driver?.first_name} {booking?.driver?.last_name}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {t("Charging speed")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                032.4 {t("per second")}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-xs lg:text-sm">
                {t("Contact Driver")}:
              </td>
              <td className="px-4 py-1 text-primary-500 hover:text-primary-700 transition-all font-medium text-sm lg:text-base">
                <Link to={`tel:${booking?.driver?.phone}`}>
                  {booking?.driver?.phone}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>

        <img src={MobileChargeBus} className="lg:h-80" alt="Charge van" />
      </div>
    </div>
  );
};

export default BookingSuccessful;
