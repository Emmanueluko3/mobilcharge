import React from "react";
import { useTranslation } from "react-i18next";

const ServiceAgreement: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-20">
      <h2 className="text-xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center">
        {t("Service Agreement")}
      </h2>
      <h2 className="text-primary-500 text-lg lg:text-xl font-bold mb-4 text-center">
        {t("Effective from date of website visit")}
      </h2>
      <p className="mb-6">
        {t(
          "This Service Agreement is entered into by and between MobilCharge and the every customer, for electric vehicle mobile charging services."
        )}
      </p>

      <div>
        {[
          {
            title: "Services Provided",
            text: "MobilCharge agrees to provide mobile charging services for electric vehicles as requested by the Customer.",
          },

          {
            title: "Service Availability",
            text: "Services are subject to availability and may vary based on location and demand. MobilCharge will make reasonable efforts to provide timely service.",
          },

          {
            title: "Customer Responsibilities",
            text: "Users must provide accurate information and ensure their vehicles are compatible with our charging equipment. Users are responsible for any damages caused by improper use of our services.",
          },

          {
            title: "Payment",
            text: "Customers agree to pay the fees as outlined on our website. Payment must be made at the time of booking.",
          },

          {
            title: "Liability and Warranty",
            text: "MobilCharge is not liable for any damages or losses arising from the use of our services. Our services are provided 'as is' without any warranties.",
          },

          {
            title: "Terminaison",
            text: "Either party may terminate this Agreement with 30 days’ notice. Any outstanding fees must be settled upon termination.",
          },

          {
            title: "Governing Law",
            text: "This Agreement is governed by the laws of Quebec, Canada.",
          },
        ].map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-lg lg:text-xl">{`${index + 1}. ${t(
              item.title
            )}`}</h3>
            <p className="text-sm lg:text-base">{t(item.text)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceAgreement;
