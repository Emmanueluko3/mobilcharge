import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import apiService from "../../api/apiServices";
import useFetch from "../../components/hooks/useFetch";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/joy";

const Pricing: React.FC = () => {
  const { t } = useTranslation();

  const [isSubscribeLoading, setIsSubscribeLoading] = useState(false);
  const [isUnsubscribeLoading, setIsUnsubscribeLoading] = useState(false);

  const {
    data: pricingPlans,
    isLoading,
    refetch,
  } = useFetch(`/api/payment/pricing-plans/`);

  const handleSubcription = async (planId: string) => {
    try {
      setIsSubscribeLoading(true);

      const response: any = await apiService(
        "/api/payment/stripe/create-subscription/",
        "POST",
        {
          plan_id: planId,
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
      setIsSubscribeLoading(false);
    }
  };

  const handleUnsubscribe = async (plan_title: string) => {
    const result = await Swal.fire({
      title: t("Confirm"),
      text: t(`Are you sure you want to unsubscribe to ${plan_title} plan?`),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#428bca",
      cancelButtonColor: "#54577A",
      confirmButtonText: t("Confirm"),
      cancelButtonText: t("Cancel"),
    });
    if (result.isConfirmed) {
      try {
        setIsUnsubscribeLoading(true);

        const response: any = await apiService(
          "/api/payment/cancel-subscription/",
          "POST"
        );
        if (response) {
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
        setIsUnsubscribeLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg p-4 lg:p-10">
        <h2 className="text-3xl font-semibold w-full mb-16 border-b pb-3">
          {t("Pricing Plans")}
        </h2>
        <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-10">
          {pricingPlans?.map((item: any, index: number) => (
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
                    {t("Current Plan")}
                  </div>
                )}
              </div>
              <h2
                className={`text-4xl font-bold mb-4 ${
                  item.current ? "text-white" : "text-customPurple"
                }`}
              >
                {item.price !== "Free" && "$"}
                {t(item.price)}{" "}
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
                {t(item.title)}
              </h3>
              <p
                className={`text-base my-5 ${
                  item.current ? "text-white" : "text-gray-500"
                }`}
              >
                {t(item.description)}
              </p>

              <div className="flex flex-col mb-10 lg:h-80">
                {item.features.map((text: any, index: number) => (
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
                      {t(text)}
                    </p>
                  </div>
                ))}
              </div>
              {item?.current ? (
                <button
                  onClick={() => handleUnsubscribe(item.title)}
                  disabled={isSubscribeLoading}
                  className={`${
                    item.current
                      ? "bg-purple-400 hover:bg-purple-700"
                      : "bg-gray-400 hover:bg-gray-500"
                  } text-white  px-6 py-2  w-full transition-all text-sm font-bold flex justify-center items-center text-center rounded-full flex-nowrap`}
                >
                  {isUnsubscribeLoading ? (
                    <>
                      <CircularProgress size="sm" />{" "}
                      <span className="ml-2">Loading...</span>
                    </>
                  ) : (
                    "Unsubscribe"
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleSubcription(item.id)}
                  disabled={isSubscribeLoading}
                  className={`${
                    item.current
                      ? "bg-purple-400 hover:bg-purple-700"
                      : "bg-gray-400 hover:bg-gray-500"
                  } text-white  px-6 py-2  w-full transition-all text-sm font-bold flex justify-center items-center text-center rounded-full flex-nowrap`}
                >
                  {isSubscribeLoading ? (
                    <>
                      <CircularProgress size="sm" />{" "}
                      <span className="ml-2">Loading...</span>
                    </>
                  ) : (
                    "Choose plan"
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
