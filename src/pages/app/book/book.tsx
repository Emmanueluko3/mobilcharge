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

// {
//   "message": "Booking created successfully. You will be notified when your booking is approved",
//   "booking": {
//       "id": 9,
//       "user": {
//           "id": 5,
//           "username": "emmanuel@gmail.com",
//           "email": "emmanuel@gmail.com",
//           "first_name": "Emmanuel",
//           "last_name": "Stephen",
//           "phone": "07031982590",
//           "is_active": true,
//           "is_superuser": false,
//           "date_joined": "2024-10-07T19:48:38.424581Z",
//           "profile_image": "https://res.cloudinary.com/dqathrf7e/image/upload/v1728330517/sktnrd9pmxbesdexilew.jpg"
//       },
//       "driver": {
//           "id": 1,
//           "username": "adesolaayodeji18@gma",
//           "email": "adesolaayodeji18@gmail.com",
//           "first_name": "Ayodeji",
//           "last_name": "Adesola",
//           "phone": "05488612283",
//           "is_active": true,
//           "is_superuser": true,
//           "date_joined": "2024-10-07T14:21:24.489794Z",
//           "profile_image": "https://res.cloudinary.com/the-proton-guy/image/upload/v1660906962/6215195_0_pjwqfq.webp"
//       },
//       "location": "Maitama, F.C.T Abuja",
//       "car_make": "Tesla Model S",
//       "battery_type": "Lithium-ion (Li-ion)",
//       "battery_level": 32,
//       "kilometers_left": 50.0,
//       "vehicle_image": "https://res.cloudinary.com/dqathrf7e/image/upload/v1728519717/t9krg0p3hhhf6jntw1ae.jpg",
//       "description": "Nill",
//       "booking_type": "Normal",
//       "invoice_id": "05838e99-2d5f-40c3-a7fa-a9072871cbb6",
//       "price": 0.0,
//       "status": "Pending",
//       "paid": false,
//       "date": "2024-10-10"
//   }
// }
