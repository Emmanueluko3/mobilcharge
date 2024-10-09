import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components/common/button";
import MobileChargeBus from "../../assets/images/MobileChargebus.png";
import toast from "react-hot-toast";
import BookingInvoice from "../../components/bookingInvoice";
import { globalAxios } from "../../api/globalAxios";
import BookForm from "../../components/book/bookForm";

interface bookDataProps {
  drivers_note: string;
}

const Book: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const [bookData, setBookData] = useState<bookDataProps>({
    drivers_note: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleBookSubmit = async (data: any) => {
    const {
      vehicle_image,
      location,
      car_make,
      battery_type,
      battery_level,
      kilometers_left,
      description,
      booking_type,
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
    formData.append("plan_id", "1");

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
        nextStep();

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
    <>
      {step === 1 && (
        <BookForm isLoading={isLoading} onSubmit={handleBookSubmit} />
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12 p-4 lg:p-6 bg-white rounded-lg">
          <div className="lg:col-span-5 h-fit">
            <h2 className="text-3xl font-semibold">
              {t("You are submitting a request for a charge")}
            </h2>
            <p className="text-sm my-3">{t("See details below!")}</p>
            <p className="text-sm mt-3 mb-8 text-gray-500">
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              {t("Truck")} #1
            </p>
          </div>
          <div className="lg:col-span-7 h-fit flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold w-full mb-4">
              {t("Truck Details")}
            </h2>
            <table className="table-auto w-full text-left my-4">
              <tbody>
                <tr>
                  <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                    {t("Driver Name")}:
                  </td>
                  <td className="px-4 py-1 text-gray-500 font-medium text-sm lg:text-base">
                    {t("Jodd")}
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
                  onChange={handleChange}
                  value={bookData.drivers_note}
                  placeholder={t("Message")}
                  className="block min-h-44 w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <button
                disabled={isLoading}
                className="w-full px-8 py-1.5 text-base text-primary-500 border border-primary-500 hover:text-white hover:bg-primary-500 flex justify-center items-center rounded-md bg-primary font-semibold transition-all shadow-sm hover:opacity-75"
                onClick={prevStep}
              >
                {t("Back")}!
              </button>
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full"
              >
                {t("Book now")}!
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7 h-fit flex flex-col items-center justify-center">
            <img src={MobileChargeBus} className="h-80" alt="Charge van" />
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && <BookingInvoice />}
    </>
  );
};

export default Book;
