import React from "react";
import { Button } from "../../../components/common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileChargeBus from "../../../assets/images/MobileChargebus.png";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const BookingSuccessful: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-6  lg:grid-cols-12 p-4 lg:p-6 bg-white rounded-lg">
      <div className="lg:col-span-7 h-fit order-1">
        <h2 className="text-3xl font-semibold">
          {t("Thank you for your purchase with MobilCharge")}
        </h2>
        <p className="text-sm mt-3 mb-8 text-gray-500">
          <FontAwesomeIcon icon={faTruck} className="mr-3" />
          {t("Truck")} #1
        </p>
      </div>
      <div className="lg:col-span-5 h-fit flex flex-col items-center justify-center order-2">
        <h2 className="text-3xl font-semibold w-full mb-4">{t("Invoice")}</h2>
        <table className="table-auto w-full text-left my-4">
          <tbody>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                {t("Invoice number")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                #43582
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                {t("Subtotal")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                $40.20
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                {t("Tax")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                $12.91
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                {t("Total")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                $43.11
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="lg:col-span-12 h-fit flex flex-col items-start justify-center lg:order-4 order-3">
        <h2 className="text-3xl font-semibold w-full mb-4">
          {t("Truck Details")}
        </h2>
        <table className="table-auto lg:w-4/5 text-left my-4">
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
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                {t("Contact Driver")}:
              </td>
              <td className="px-4 py-1 text-primary-500 hover:text-primary-700 transition-all font-medium text-sm lg:text-base">
                <Link to={`tel:+1234567890`}>+1234567890</Link>
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
