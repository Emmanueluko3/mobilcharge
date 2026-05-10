import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiService from "../../api/apiServices";
import BookForm from "../../components/booking/bookForm";
import { fileToBase64 } from "../../utils/base64";

const Emergency: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const booking_type = "Emergency";

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

    try {
      setIsLoading(true);
      let vehicleImageBase64 = null;
      if (vehicle_image && typeof vehicle_image !== "string") {
        vehicleImageBase64 = await fileToBase64(vehicle_image);
      }

      const payload = {
        rechargeAddress: location,
        carModel: car_make,
        reservationAt: scheduledDateAndTime,
        description,
        kilometresLeft: Number(kilometers_left) || 0,
        batteryLevel: Number(battery_level) || 0,
        vehicleImageBase64,
        isEmergency: true,
      };

      const response: any = await apiService(
        "/api/booking/create-booking/",
        "POST",
        payload
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
