import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../components/common/button";
import useFetch from "../../../components/hooks/useFetch";
import apiService from "../../../api/apiServices";
import Swal from "sweetalert2";
import Spinner from "../../../components/common/spinner";

const RequestDetails: React.FC = () => {
  const { t } = useTranslation();

  const { invoice_id } = useParams();

  const {
    data: booking,
    isLoading,
    refetch,
  } = useFetch(`/api/booking/${invoice_id}/`);

  const [status, setStatus] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const updateBooking = async () => {
    let confirmationMessage = "";

    switch (status) {
      case "approved":
        confirmationMessage = t(
          "Are you sure you want to approve this request?"
        );
        break;
      case "declined":
        confirmationMessage = t(
          "Are you sure you want to decline this request?"
        );
        break;
      case "Completed":
        confirmationMessage = t(
          "Are you sure you want to complete this request?"
        );
        break;
      default:
        confirmationMessage = "";
    }
    const result = await Swal.fire({
      title: t("Confirm"),
      text: confirmationMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#428bca",
      cancelButtonColor: "#54577A",
      confirmButtonText: t("Confirm"),
      cancelButtonText: t("Cancel"),
    });
    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response: any = await apiService(
          `/api/booking/update-booking-status/${booking?.invoice_id}/`,
          "PATCH",
          {
            status: status,
          }
        );

        if (response.data) {
          Swal.fire({
            title: "Success!",
            text: response?.data?.message,
            icon: "success",
          });
          refetch();
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
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-screen">
      {isLoading ? (
        <div className="mb-16 bg-white w-full h-96 rounded-lg p-4 flex items-center justify-center">
          <Spinner size="w-16 h-16" />
        </div>
      ) : booking ? (
        <div className="mb-16 bg-white rounded-lg p-4 lg:p-6 grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="flex items-center">
              <img
                src={booking?.user?.profile_image}
                alt=""
                className="rounded-full h-10 w-10 object-cover lg:h-12 lg:w-12 mr-3 drop-shadow-md"
              />
              <div className="">
                <h4 className="text-sm lg:text-base font-medium">
                  {booking?.user?.first_name} {booking?.user?.last_name}
                </h4>
                <p className="text-xs flex items-center">
                  <span className="rounded-full w-2 h-2 bg-green-500 mr-2 flex"></span>
                  <Link
                    to={`tel:${booking?.user?.phone}`}
                    className="hover:text-purple-500"
                  >
                    {booking?.user?.phone}
                  </Link>
                </p>
              </div>
            </div>
            <div className="my-10">
              <h3 className="font-semibold text-xl mb-4">
                {t("Customer's Note")}
              </h3>
              <p className="p-4 rounded-lg border border-gray-300 w-full lg:w-4/5 mb-10 lg:mb-16 min-h-32 lg:min-h-40">
                {booking?.description}
              </p>

              {booking?.status == "Pending" && (
                <div className="flex gap-6 lg:gap-16 mb-10">
                  {[
                    {
                      text: t("Approve Request"),
                      status: "approved",
                      icon: faCheck,
                    },
                    {
                      text: t("Decline Request"),
                      status: "cancelled",
                      icon: faXmark,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-full"
                    >
                      <h3 className="mb-2 lg:mb-4 text-sm lg:text-lg font-semibold text-center">
                        {item.text}?
                      </h3>
                      <span
                        onClick={() => setStatus(item.status)}
                        className={`${
                          item.status === status
                            ? "border-green-500 border-4"
                            : "border-gray-300"
                        } p-2 border rounded-full w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center cursor-pointer`}
                      >
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {booking?.status == "Pending" && (
                <Button
                  className="w-full lg:w-2/6"
                  disabled={!status || isLoading}
                  isLoading={loading}
                  onClick={updateBooking}
                >
                  {t("Finish")}
                </Button>
              )}

              {booking?.status == "Approved" && (
                <Button
                  className="w-full lg:w-2/6"
                  disabled={isLoading}
                  isLoading={loading}
                  onClick={() => {
                    setStatus("Completed");
                    updateBooking();
                  }}
                >
                  {t("Finished Request?")}
                </Button>
              )}
            </div>
          </div>

          <div className="lg:p-4 mb-5 lg:mb-0 rounded-2xl bg-white bg-opacity-50 lg:col-span-5 lg:drop-shadow-md order-1 lg:order-2">
            <h3 className="font-semibold text-lg mb-5">
              {t("Client Request")}
            </h3>
            {booking?.vehicle_image && (
              <img
                src={booking?.vehicle_image}
                alt={booking?.car_make}
                className="rounded-2xl h-52 w-full object-cover mb-2"
              />
            )}
            <h3 className="font-semibold text-lg">
              {booking?.user?.first_name} {booking?.user?.last_name}
            </h3>
            <p className="my-2 text-sm text-gray-600">
              <span className="font-medium">{t("Car Model")}</span>:{"  "}
              {booking?.car_make}
            </p>
            <p className="my-2 text-sm text-gray-600">
              <span className="font-medium">{t("Location")}</span>:{" "}
              {booking?.location}
            </p>
            <Link
              to={`tel:${booking?.user?.phone}`}
              className="text-sm text-primary-500 mb-4 flex hover:text-primary-700"
            >
              {booking?.user?.phone}
            </Link>

            <p className="text-gray-950 flex items-center text-sm font-semibold mb-5">
              <FontAwesomeIcon icon={faClock} className="mr-2 h-5 w-5" />
              {t("Requested")} {booking?.date}
            </p>

            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-3">{t("Detail Task")}</h3>
              <div className="flex items-center my-1">
                <p className="text-gray-800 text-sm font-medium mr-3">
                  {t("Battery Percentage")}:
                </p>
                <span className="rounded-xl p-2 text-sm flex items-center justify-center">
                  {booking?.battery_level}%
                </span>
              </div>
              {/* <div className="flex items-center my-1">
                <p className="text-gray-800 text-sm font-medium mr-3">
                  {t("Battery Type")}:
                </p>
                <span className="text-sm flex">{booking?.battery_type}</span>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-16 bg-white w-full h-96 rounded-lg p-4 flex items-center flex-col justify-center">
          <p className="font-medium text-gray-400 z-20 text-sm lg:text-2xl text-center mb-3">
            Oops!
          </p>
          <p className="font-medium text-gray-400 z-20 text-sm lg:text-lg text-center">
            Request not found
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
