import React, { useState } from "react";
import toast from "react-hot-toast";
import { globalAxios } from "../../../api/globalAxios";
import BookForm from "../../../components/booking/bookForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const CreateBooking: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const booking_type = "Normal";

  const handleBookSubmit = async (data: any) => {
    const {
      vehicle_image,
      location,
      car_make,
      battery_level,
      kilometers_left,
      description,
      date,
      time,
    } = data;

    const dateTimeString = `${date}T${time}:00Z`;
    const scheduledDateAndTime = new Date(dateTimeString).toISOString();

    const formData = new FormData();
    formData.append("location", location);
    formData.append("car_make", car_make);
    formData.append("booking_type", booking_type);
    formData.append("scheduled_date_and_time", scheduledDateAndTime);
    formData.append("description", description);
    formData.append("kilometers_left", kilometers_left);
    formData.append("battery_level", battery_level);
    formData.append("vehicle_image", vehicle_image);
    formData.append("plan_id", "2");

    try {
      setIsLoading(true);
      const response: any = await globalAxios.post(
        "/api/booking/create-booking/",
        formData,
        {
          headers: {
            ...globalAxios.defaults.headers.common,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      if (response) {
        navigate(
          `/dashboard/book/checkout?booking_invoice_id=${response?.data?.booking?.invoice_id}`,
          {
            state: { bookingData: response.data },
            replace: true,
          }
        );
        Swal.fire({
          title: "Success!",
          text: response?.data?.message,
          icon: "success",
        });
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

  return (
    <BookForm
      isLoading={isLoading}
      onSubmit={handleBookSubmit}
      booking_type={booking_type}
    />
  );
};

export default CreateBooking;
