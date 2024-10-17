import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/common/button";
import { useEffect, useState } from "react";
import apiService from "../../../api/apiServices";
import useFetch from "../../../components/hooks/useFetch";
import Swal from "sweetalert2";
import { Skeleton } from "@mui/joy";

const CheckoutBooking: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const invoiceId = searchParams.get("booking_invoice_id");
  const { message = "" } = location?.state?.bookingData || {};

  const { data: booking, isLoading: isBookingLoading } = useFetch(
    `/api/booking/${invoiceId}/`
  );

  const [drivers_note, setDrivers_note] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!invoiceId && !location?.state?.bookingData) {
      navigate("/dashboard/book", { replace: true });
    }
  }, [location, navigate]);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response: any = await apiService(
        "/api/payment/stripe/create-checkout-session/",
        "POST",
        {
          plan_id: "2",
          booking_id: booking?.id,
          drivers_note: drivers_note,
        }
      );

      if (response.data) {
        window.location.href = response?.data?.checkout_url;
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        return Swal.fire({
          title: t("Error!"),
          text: error?.response?.data?.error,
          icon: "error",
        });
      }
      Swal.fire({
        title: t("Error!"),
        text: t("Something went wrong. Please try again."),
        icon: "error",
      });
      console.log("error message", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (booking?.paid) {
    return (
      <Navigate
        to={`/dashboard/book/booking-successful/invoice?success=true&booking_invoice_id=${invoiceId}`}
        replace
      />
    );
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12 p-4 lg:p-6 bg-white rounded-lg">
      <div className="lg:col-span-5 h-fit order-1">
        <h2 className="text-3xl font-semibold">
          {booking?.booking_type === "Emergency"
            ? t("You are submitting a request for an emergency charge")
            : t("You submitted a request for a charge")}
        </h2>
        <p className="text-sm my-3">{message}</p>
        <p className="text-sm mt-3 mb-8 text-gray-500">
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          {t("Truck")} #1
        </p>
      </div>
      <div className="lg:col-span-7 h-fit flex flex-col items-center justify-center order-2">
        <h2 className="text-3xl font-semibold w-full mb-4">{t("Details")}</h2>
        <table className="table-auto w-full text-left my-4">
          <tbody>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height="14px"
                  sx={{ mb: 1 }}
                  loading={isBookingLoading}
                >
                  {t("Driver Name")}:
                </Skeleton>
              </td>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height="14px"
                  sx={{ mb: 1 }}
                  loading={isBookingLoading}
                >
                  {booking?.driver?.first_name} {booking?.driver?.last_name}
                </Skeleton>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height="14px"
                  sx={{ mb: 1 }}
                  loading={isBookingLoading}
                >
                  {t("Charging speed")}:
                </Skeleton>
              </td>

              <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height="14px"
                  sx={{ mb: 1 }}
                  loading={isBookingLoading}
                >
                  032.4 {t("per second")}
                </Skeleton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="lg:col-span-5 h-fit order-4 lg:order-3">
        {/* Message for driver */}

        <div className="lg:my-8">
          <h3 className="text-xl font-semibold mb-2">
            {t("Leave a note for the driver")}
          </h3>
          <div className="mb-2">
            <textarea
              name="drivers_note"
              disabled={isBookingLoading}
              onChange={(e) => setDrivers_note(e.target.value)}
              value={drivers_note}
              placeholder={t("Message")}
              className="block min-h-32 lg:min-h-44 w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center gap-10 w-full">
          {booking?.paid ? (
            <span className="text-base bg-green-500 py-2 px-20 w-full rounded-lg font-semibold text-white text-center">
              Payment Completed
            </span>
          ) : (
            <>
              <button className="w-full px-8 py-1.5 text-base text-primary-500 border border-primary-500 hover:text-white hover:bg-primary-500 flex justify-center items-center rounded-md bg-primary font-semibold transition-all shadow-sm hover:opacity-75">
                {t("Back")}
              </button>

              {/* <Tooltip title={t("Waiting for driver approval")} size="sm" arrow> */}
              <Button
                className={`w-full ${
                  booking?.status === "Pending" && "cursor-not-allowed"
                } ${booking?.booking_type === "Emergency" && "bg-red-500"}`}
                disabled={
                  !booking || booking?.status === "Pending" || isBookingLoading
                }
                isLoading={isLoading}
                onClick={handlePayment}
              >
                {t("Pay now")}
              </Button>
              {/* </Tooltip> */}
            </>
          )}
        </div>
      </div>
      <div className="lg:col-span-7 h-fit flex flex-col items-center justify-center order-3 lg:order-4">
        {booking?.vehicle_image && (
          <img
            src={booking?.vehicle_image}
            className="h-48 lg:h-80 object-cover w-full flex"
            alt="Charge van"
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutBooking;
