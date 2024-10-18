import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import MobileChargeBus from "../../../assets/images/MobileChargebus.png";
import Logo from "../../../assets/images/logo.png";
import { Button } from "../../../components/common/button";
import { InputIcon } from "../../../components/common/input";
import { useTranslation } from "react-i18next";
import apiService from "../../../api/apiServices";
import { useAppSelector } from "../../../store/hooks";
import toast from "react-hot-toast";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirm_password: "",
  });
  const [resetPasswordError, setResetPasswordError] = useState({
    password: "",
    confirm_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setResetPasswordData({
      ...resetPasswordData,
      [name]: value,
    });
  };

  const user: any = useAppSelector((state) => state.auth.user);
  const isAuthenticated = localStorage.getItem("accessToken");

  useEffect(() => {
    setResetPasswordData({
      password: "",
      confirm_password: "",
    });
    setResetPasswordError({
      password: "",
      confirm_password: "",
    });
  }, [location, user]);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case "password":
        return value.length >= 6
          ? ""
          : "Password must be at least 6 characters";
      case "confirm_password":
        return value === resetPasswordData.password
          ? ""
          : "Passwords do not match";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const errors = Object.entries(resetPasswordData).reduce(
      (acc, [name, value]) => {
        const error = validateField(name, value);
        if (error) acc[name] = error;
        return acc;
      },
      {} as any
    );

    setResetPasswordError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response: any = await apiService(
          "/api/auth/password-reset/request/",
          "POST",
          resetPasswordData
        );
      } catch (error: any) {
        if (error?.response?.data?.error) {
          return toast.error(error?.response?.data?.error);
        }
        toast.error("Unknown error occurred");
        console.log("error message", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  if (user && isAuthenticated && isAuthenticated.trim() !== "undefined") {
    return user?.is_superuser ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  return (
    <div
      style={{
        background: `url('${MobileChargeBus}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="w-full flex items-center justify-center h-screen py-6"
    >
      <div className="p-5 lg:p-7 lg:px-10 w-full lg:w-4/12 flex flex-col justify-center items-center bg-white rounded-lg lg:drop-shadow-lg text-center">
        <Link to="/" className="mb-6 lg:mb-8">
          <img src={Logo} alt="Logo" className="h-10 lg:h-16" />
        </Link>

        <h2 className="font-semibold text-3xl mb-3 text-center">
          {t("Reset password")}
        </h2>

        <form onSubmit={handleResetPassword} className="my-5 w-full">
          <div className="w-full mb-4 text-start">
            <InputIcon
              name="password"
              type="password"
              value={resetPasswordData.password}
              onChange={handleChange}
              placeholder={t("New Password")}
              maxLength={40}
              autoComplete="off"
            />
            {resetPasswordError.password && (
              <p className="text-red-500 text-sm">
                {resetPasswordError.password}
              </p>
            )}
          </div>
          <div className="w-full mb-6 text-start">
            <InputIcon
              name="confirm_password"
              type="password"
              value={resetPasswordData.confirm_password}
              onChange={handleChange}
              placeholder={t("Confirm New Password")}
              maxLength={40}
              autoComplete="off"
            />
            {resetPasswordError.confirm_password && (
              <p className="text-red-500 text-sm">
                {resetPasswordError.confirm_password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full"
          >
            {t("Set New Password")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
