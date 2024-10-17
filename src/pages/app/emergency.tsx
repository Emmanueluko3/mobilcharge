import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { globalAxios } from "../../api/globalAxios";
import BookForm from "../../components/booking/bookForm";

const Emergency: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const booking_type = "Emergency";

  const handleBookSubmit = async (data: any) => {
    const {
      vehicle_image,
      location,
      car_make,
      battery_type,
      battery_level,
      kilometers_left,
      description,
    } = data;

    const formData = new FormData();
    formData.append("location", location);
    formData.append("car_make", car_make);
    formData.append("battery_type", battery_type);
    formData.append("booking_type", booking_type);
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
          `/dashboard/emergency/checkout?booking_invoice_id=${response?.data?.booking?.invoice_id}`,
          {
            state: { bookingData: response.data },
            replace: true,
          }
        );

        toast.success(response?.data?.message);
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        return toast.error(error?.response?.data?.error);
      }
      toast.error("Unknown error occurred");
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

export default Emergency;
