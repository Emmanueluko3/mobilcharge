import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/common/button";
import { useEffect, useState } from "react";
import apiService from "../../../api/apiServices";
import toast from "react-hot-toast";
import { Tooltip } from "@mui/joy";

const CheckoutBooking: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { message = "", booking = {} } = location?.state?.bookingData || {};

  const [drivers_note, setDrivers_note] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id && !location?.state?.bookingData) {
      navigate("/dashboard/book", { replace: true });
    }
  }, [id, location, navigate]);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response: any = await apiService(
        "/api/payment/stripe/create-checkout-session/",
        "POST",
        {
          plan_id: "2",
          booking_id: booking?.id || id,
          drivers_note: drivers_note,
        }
      );

      if (response.data) {
        window.location.href = response?.data?.checkout_url;
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        return toast.error(error?.response?.data?.error);
      }
      toast.error("Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12 p-4 lg:p-6 bg-white rounded-lg">
      <div className="lg:col-span-5 h-fit">
        <h2 className="text-3xl font-semibold">
          {t("You submitted a request for a charge")}
        </h2>
        <p className="text-sm my-3">{message}</p>
        <p className="text-sm mt-3 mb-8 text-gray-500">
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          {t("Truck")} #1
        </p>
      </div>
      <div className="lg:col-span-7 h-fit flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold w-full mb-4">{t("Details")}</h2>
        <table className="table-auto w-full text-left my-4">
          <tbody>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                {t("Driver Name")}:
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                {booking?.driver?.first_name} {booking?.driver?.last_name}
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
              onChange={(e) => setDrivers_note(e.target.value)}
              value={drivers_note}
              placeholder={t("Message")}
              className="block min-h-44 w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center gap-10 w-full">
          <button className="w-full px-8 py-1.5 text-base text-primary-500 border border-primary-500 hover:text-white hover:bg-primary-500 flex justify-center items-center rounded-md bg-primary font-semibold transition-all shadow-sm hover:opacity-75">
            {t("Back")}
          </button>

          <Tooltip title={t("Waiting for driver approval")} size="sm" arrow>
            <Button
              className={`w-full ${
                booking?.status === "Pending" && "cursor-not-allowed"
              }`}
              disabled={booking?.status === "Pending"}
              isLoading={isLoading}
              onClick={handlePayment}
            >
              {t("Pay now")}
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="lg:col-span-7 h-fit flex flex-col items-center justify-center">
        <img src={booking?.vehicle_image} className="h-80" alt="Charge van" />
      </div>
    </div>
  );
};

export default CheckoutBooking;
