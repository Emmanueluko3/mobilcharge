import React from "react";
import { useTranslation } from "react-i18next";

const TermsAndConditions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-20">
      <h2 className="text-xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center">
        {t("Terms and Conditions")}
      </h2>
      <h2 className="text-primary-500 text-lg lg:text-xl font-bold mb-4 text-center">
        {t("Effective from date of website visit")}
      </h2>
      <p className="mb-6">
        {t(
          "Welcome to www.mobilecharge.ca. By accessing and using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully."
        )}
      </p>

      <div>
        {[
          {
            title: "Acceptance of Terms",
            text: "By using our website and services, you agree to these Terms and Conditions. If you do not agree, please do not use our services.",
          },

          {
            title: "Services",
            text: "MobilCharge offers electric vehicle mobile charging services. The availability of services may vary based on location and demand.",
          },

          {
            title: "User Responsibilities",
            text: "Users must provide accurate information and ensure their vehicles are compatible with our charging equipment. Users are responsible for any damages caused by improper use of our services.",
          },

          {
            title: "Payment",
            text: "All charges for services must be paid as indicated on our website. Payment methods and terms are outlined during the booking process.",
          },

          {
            title: "Limitation of Liability",
            text: "MobilCharge is not liable for any indirect, incidental, or consequential damages arising from the use of our services.",
          },

          {
            title: "Changes to Terms",
            text: "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective upon posting on our website.",
          },

          {
            title: "Governing Law",
            text: "These Terms and Conditions are governed by the laws of Quebec, Canada.",
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

export default TermsAndConditions;
