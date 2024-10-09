import React from "react";
import { useTranslation } from "react-i18next";

const Requests: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen">
      {/* Requests */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold w-full mb-4">{t("Requests")}</h2>
      </div>
    </div>
  );
};

export default Requests;
