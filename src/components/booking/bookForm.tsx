import React, { useRef, useState } from "react";
import { Button } from "../common/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { AppInput } from "../common/input";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Map, Marker } from "@vis.gl/react-google-maps";

const electricVehicleMakes = [
  "Alfa Romeo Tonale PHEV",
  "Audi Q4 e-tron",
  "BMW 330e",
  "BMW 330e xDrive",
  "BMW i4 eDrive35 Gran Coupe",
  "BMW i4 eDrive40 Gran Coupe",
  "Cadillac OPTIQ",
  "Chevrolet Blazer EV LT TI",
  "Chevrolet Blazer EV RS PA",
  "Chevrolet Blazer EV RS TI",
  "Chevrolet Equinox EV 2025",
  "Chevrolet Equinox EV AWD 2025",
  "Chrysler Pacifica Hybrid rechargeable",
  "Dodge Charger Daytona EV",
  "Dodge Hornet R/T PHEV",
  "Fiat 500e RED",
  "Ford Escape PHEV",
  "Ford E-Transit (commercial)",
  "Ford F150 Lightning Pro",
  "Ford Mustang Mach-E 2024",
  "Ford Mustang Mach-E 2024 AWD",
  "Ford MUSTANG MACH-E 2024 AWD Extended Range",
  "Honda Prologue",
  "Hyundai IONIQ 5 - Long Range",
  "Hyundai IONIQ 5 - Long Range AWD",
  "Hyundai IONIQ 6 - Long Range",
  "Hyundai IONIQ 6 - Long Range AWD",
  "Hyundai Kona EV",
  "Jeep Wrangler 4Xe",
  "Kia EV6 Land",
  "Kia EV6 Wind",
  "Kia EV9 Land",
  "Kia EV9 Light",
  "Kia EV9 Wind",
  "Kia Niro EV",
  "Kia Niro PHEV",
  "Kia Sorento PHEV",
  "Kia Sportage PHEV",
  "Lexus NX 450h+",
  "Lexus RZ 450e",
  "Lincoln Corsair Grand Touring",
  "Mazda CX-70 VÉHR",
  "Mazda CX-90 VÉHR",
  "Mazda MX-30",
  "Mercedes-Benz EQB 250+",
  "Mercedes-Benz EQB 300 4MATIC",
  "Mercedes-Benz GLC 350e 4MATIC",
  "Mini Cooper SE 3 Door",
  "Mini Countryman SE All4",
  "Mitsubishi Outlander PHEV",
  "Nissan Ariya Evolve e-4ORCE",
  "Nissan Ariya Evolve+ e-4ORCE",
  "Nissan Ariya Evolve+ FWD",
  "Nissan Ariya Engage FWD",
  "Nissan LEAF SV",
  "Nissan LEAF SV Plus",
  "Polestar 2 Long Range Dual motor AWD",
  "Polestar 2 Long Range Single motor RWD",
  "Polestar 4 Long Range Single motor RWD",
  "Subaru Solterra",
  "Tesla Model 3 AWD",
  "Tesla Model 3 RWD",
  "Tesla Model Y AWD",
  "Tesla Model Y AWD 7 places",
  "Tesla Model Y RWD",
  "Toyota BZ4X",
  "Toyota BZ4X AWD",
  "Toyota Prius Prime SE",
  "Toyota Prius Prime XSE",
  "Toyota RAV4 Prime",
  "Volkswagen ID.4",
  "Volkswagen ID.4 Pro",
  "Volkswagen ID.4 Pro AWD",
  "Volvo EC40 Single Motor",
  "Volvo EC40 Twin Motor",
  "Volvo EX30 Core Single Motor",
  "Volvo EX30 Plus Twin Motor",
  "Volvo EX40 Single Motor",
  "Volvo EX40 Twin Motor",
  "Volvo S60 Recharge",
  "Volvo XC60 Recharge",
  "VinFast VF8",
];

interface bookDataProps {
  location: string;
  car_make: string;
  battery_level: string;
  kilometers_left: string;
  vehicle_image: any;
  description: string;
}

interface bookFormProps {
  isLoading: boolean;
  onSubmit: (data: bookDataProps) => void;
  booking_type: string;
}

const BookForm: React.FC<bookFormProps> = ({
  isLoading,
  onSubmit,
  booking_type,
}) => {
  const { t } = useTranslation();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [bookData, setBookData] = useState<bookDataProps>({
    location: "",
    car_make: "",
    battery_level: "",
    kilometers_left: "",
    vehicle_image: null,
    description: "",
  });
  const [bookError, setBookError] = useState<
    Partial<Record<keyof bookDataProps, string>>
  >({});

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    const numberOnlyRegex = /^\d*$/;

    switch (name) {
      case "vehicle_image":
        if (files) {
          setBookData({
            ...bookData,
            vehicle_image: files[0],
          });
        }
        break;
      case "battery_level":
      case "kilometers_left":
        if (numberOnlyRegex.test(value.trim())) {
          setBookData({
            ...bookData,
            [name]: value === "" ? null : Number(value.trim()),
          });
        }
        break;

      default:
        setBookData({
          ...bookData,
          [name]: value,
        });
        break;
    }
  };

  const validateBookingData = (
    data: bookDataProps
  ): Partial<Record<keyof bookDataProps, string>> => {
    const errors: Partial<Record<keyof bookDataProps, string>> = {};

    const requiredStringFields: (keyof bookDataProps)[] = [
      "location",
      "car_make",
    ];

    requiredStringFields.forEach((field) => {
      if (!data[field]) {
        errors[field] = `${field.replace("_", " ")} is required`;
      }
    });

    // if (!data.vehicle_image) {
    //   errors.vehicle_image = "Vehicle image is required";
    // }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateBookingData(bookData);
    setBookError(validationErrors);
    const hasErrors = Object.keys(validationErrors).length > 0;
    if (!hasErrors) {
      onSubmit(bookData);
    }
  };

  const [markerLocation, setMarkerLocation] = useState({
    lat: 43.65107,
    lng: -79.347015,
  });

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-6 lg:grid-cols-12 p-4 lg:p-6 bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="lg:col-span-5">
        {booking_type === "Emergency" ? (
          <h2 className="text-3xl font-semibold text-red-500">
            {t("Request an emergency charge now")}
          </h2>
        ) : (
          <h2 className="text-3xl font-semibold">
            {t("Request a charge for now or later")}
          </h2>
        )}

        <p className="text-sm my-3">
          {t("Add your car details, book,  and go")}
        </p>

        <div className="mb-8">
          <div className="mb-4">
            <AppInput
              name="location"
              value={bookData.location}
              type="text"
              onChange={handleChange}
              placeholder={t("Enter location")}
            />
            <p className="text-xs text-red-500">{bookError.location}</p>
          </div>

          <p className="text-sm mt-3">
            <FontAwesomeIcon icon={faUsers} className="mr-3" />1{" "}
            {t("Available Trucks")}
          </p>
        </div>

        {/* Car details */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">{t("Car details")}</h3>
          <div className="mb-2">
            <select
              name="car_make"
              value={bookData.car_make}
              onChange={handleChange}
              className="block w-full border-0 p-2.5 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            >
              <option value="" disabled hidden>
                {t("Car make")}
              </option>
              {electricVehicleMakes.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <p className="text-xs text-red-500">{bookError.car_make}</p>
          </div>

          <div className="mb-2">
            <AppInput
              name="battery_level"
              value={bookData.battery_level}
              type="text"
              onChange={handleChange}
              placeholder={`${t("Battery level")}: (${t("Optional")})`}
            />
          </div>
          <div className="mb-2">
            <AppInput
              name="kilometers_left"
              value={bookData.kilometers_left}
              type="text"
              onChange={handleChange}
              placeholder={`${t("Kilometres left")}: (${t("Optional")})`}
            />
          </div>
        </div>

        {/* Car Image */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">
            {t("Picture of your vehicle")}
          </h3>
          <p className="text-xs my-3">*{t("drag or browse from device")}</p>
          <div
            onClick={() => imageInputRef?.current?.click()}
            className="mb-2 border-2 border-primary-500 border-dashed hover:border-solid transition-all rounded-lg w-full h-56 flex justify-center items-center cursor-pointer"
          >
            {bookData.vehicle_image ? (
              <img
                src={URL.createObjectURL(bookData.vehicle_image)}
                className="h-full w-full rounded-lg object-contain"
                alt=""
              />
            ) : (
              <FontAwesomeIcon
                className="h-6 w-6 text-primary-500"
                icon={faImage}
              />
            )}
          </div>
          {/* <p className="text-xs text-red-500">{bookError.vehicle_image}</p> */}
          <input
            type="file"
            className="hidden"
            name="vehicle_image"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleChange}
          />
        </div>

        {/* Message */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">
            {t("Leave a note for the driver")}
          </h3>
          <div className="mb-2">
            <textarea
              value={bookData.description}
              onChange={handleChange}
              name="description"
              placeholder={t("Message")}
              className="block min-h-44 w-full border-0 p-4 bg-white text-gray-900 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
            ></textarea>
            <p className="text-xs text-red-500">{bookError.description}</p>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className="w-full"
        >
          {t("Submit")}
        </Button>
      </form>
      <div className="lg:col-span-7 min-h-[60vh]">
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={13}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          <Marker position={markerLocation} />
        </Map>{" "}
      </div>
    </div>
  );
};

export default BookForm;
