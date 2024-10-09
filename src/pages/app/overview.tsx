import React from "react";
import { useTranslation } from "react-i18next";

const Overview: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen">
      {/* Overview */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold w-full mb-4">{t("Overview")}</h2>
      </div>
    </div>
  );
};

export default Overview;
