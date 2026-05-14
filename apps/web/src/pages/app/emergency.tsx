import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOKING_MUTATION } from "../../api/queries";
import BookForm from "../../components/booking/bookForm";
import { fileToBase64 } from "../../utils/base64";

const Emergency: React.FC = () => {
  const navigate = useNavigate();

  const [createBookingMutation, { loading: isLoading }] = useMutation<any>(CREATE_BOOKING_MUTATION);

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

      const { data } = await createBookingMutation({ variables: { input: payload } });
      if (data?.createBooking) {
        navigate(
          `/dashboard/emergency/checkout?booking_invoice_id=${data.createBooking.invoiceId}`,
          { state: { bookingData: data.createBooking }, replace: true }
        );
        toast.success("Emergency booking created successfully");
      }
    } catch (error: any) {
      const msg = error.graphQLErrors?.[0]?.message || "Unknown error occurred";
      toast.error(msg);
      console.log("error message", error);
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
