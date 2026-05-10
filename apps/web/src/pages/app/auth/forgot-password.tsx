import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import MobileChargeBus from "../../../assets/images/MobileChargebus.png";
import Logo from "../../../assets/images/logo.png";
import { Button } from "../../../components/common/button";
import { InputIcon } from "../../../components/common/input";
import { useTranslation } from "react-i18next";
import apiService from "../../../api/apiServices";
import { useAppSelector } from "../../../store/hooks";
import toast from "react-hot-toast";
import OTPInput from "../../../components/common/otpInput";
import Swal from "sweetalert2";

const ForgotPassowrd: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "" });
  const [loginError, setLoginError] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [nextStep, setNextStep] = useState(0);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForgotPasswordData({
      ...forgotPasswordData,
      [name]: value,
    });
  };

  const user: any = useAppSelector((state) => state.auth.user);
  const isAuthenticated = localStorage.getItem("accessToken");

  useEffect(() => {
    setForgotPasswordData({ email: "" });
    setLoginError({ email: "" });
  }, [location, user]);

  const validateForm = () => {
    const errors = {
      email: !forgotPasswordData.email
        ? "Email is required"
        : !/\S+@\S+\.\S+/.test(forgotPasswordData.email)
        ? "Email is invalid"
        : "",
    };

    setLoginError(errors);
    return !errors.email;
  };

  const handleForgotpassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response: any = await apiService(
          "/api/auth/password-reset/request/",
          "POST",
          forgotPasswordData
        );
        if (response) {
          Swal.fire({
            title: "Success!",
            text: "A reset password OTP has been sent to your email. Please check your inbox.",
            icon: "success",
          });
          setNextStep(1);
          setCountdown(30);
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
    }
  };

  const handleVerifycode = async (code: string) => {
    const resetData = { email: forgotPasswordData.email, code: code };
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response: any = await apiService(
          "/api/auth/verify-reset-code/",
          "POST",
          resetData
        );
        if (response) {
          Swal.fire({
            title: "Success!",
            text: "The OTP code is valid. You may now proceed to reset your password.",
            icon: "success",
          });
          navigate(`/reset-password`, {
            state: { resetData: resetData },
            replace: true,
          });
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Something went wrong. Please try again.";
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
        console.log("error message", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdown > 0) {
      setCanResend(false);
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [countdown]);

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
          {t("Forgot password")}?
        </h2>

        <p className="text-grey-700 font-medium text-sm text-center">
          {t("Remember your password")}?{" "}
          <Link to="/login" className="text-primary-500 font-semibold">
            {t("Log in")}
          </Link>
        </p>

        {nextStep === 1 && (
          <p className="text-grey-700 font-medium text-sm text-center mt-3">
            {t("Please Enter OTP")}
          </p>
        )}

        <form onSubmit={handleForgotpassword} className="my-5 w-full">
          {nextStep === 0 && (
            <>
              <div className="w-full mb-6 text-start">
                <InputIcon
                  name="email"
                  type="email"
                  value={forgotPasswordData.email}
                  onChange={handleChange}
                  placeholder={t("Email")}
                  maxLength={40}
                  autoComplete="off"
                />
                {loginError.email && (
                  <p className="text-red-500 text-sm">{loginError.email}</p>
                )}
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full"
              >
                {t("Reset password")}
              </Button>
            </>
          )}
        </form>

        {nextStep === 1 && (
          <>
            <OTPInput
              length={6}
              onComplete={(input) => handleVerifycode(input)}
            />
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              className="w-full mt-6"
              onClick={() => setNextStep(0)}
            >
              {t("Back")}
            </Button>
          </>
        )}

        <p className="mt-4 lg:mt-6 text-base text-gray-700 text-center flex">
          {nextStep === 0 &&
            t("You will receive a link in your email to reset your password.")}

          {nextStep === 1 && (
            <>
              {canResend
                ? t("You can now resend the OTP.")
                : `${t("Resend OTP in")} ${countdown} ${t("seconds.")}`}

              <button
                className={`ms-3 inline-flex text-primary-500 hover:text-primary-700 ${
                  !canResend ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={handleForgotpassword}
                disabled={!canResend}
              >
                {t("Resend OTP")}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ForgotPassowrd;
