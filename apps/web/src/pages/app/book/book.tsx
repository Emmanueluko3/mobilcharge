import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOKING_MUTATION } from "../../../api/queries";
import BookForm from "../../../components/booking/bookForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { fileToBase64 } from "../../../utils/base64";

const CreateBooking: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [createBookingMutation, { loading: isLoading }] = useMutation<any>(CREATE_BOOKING_MUTATION);

  const booking_type = "Normal";

  const handleBookSubmit = async (data: any) => {
    const {
      vehicle_image,
      location,
      lat,
      lng,
      car_make,
      vehicleId,
      battery_level,
      battery_target,
      kilometers_left,
      date,
      time,
      description,
      isEmergency,
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
        originLat: lat || null,
        originLng: lng || null,
        carModel: car_make,
        vehicleId: vehicleId || null,
        reservationAt: scheduledDateAndTime,
        description,
        kilometresLeft: Number(kilometers_left) || 0,
        batteryLevel: Number(battery_level) || 0,
        batteryTarget: Number(battery_target) || 80,
        vehicleImageBase64,
        isEmergency: isEmergency || false,
      };

      const { data } = await createBookingMutation({
        variables: { input: payload }
      });
      
      if (data?.createBooking) {
        navigate(
          `/dashboard/book/checkout?booking_invoice_id=${data.createBooking.invoiceId}`,
          {
            state: { bookingData: data.createBooking },
            replace: true,
          }
        );
        Swal.fire({
          title: t("Success!"),
          text: t("Booking created successfully"),
          icon: "success",
        });
      }
    } catch (error: any) {
      const errorMsg = error.graphQLErrors?.[0]?.message || t("Something went wrong. Please try again.");
      Swal.fire({
        title: t("Error!"),
        text: errorMsg,
        icon: "error",
      });
      console.error("Booking error", error);
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <BookForm
        isLoading={isLoading}
        onSubmit={handleBookSubmit}
        booking_type={booking_type}
      />
    </div>
  );
};

export default CreateBooking;
