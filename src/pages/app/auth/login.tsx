import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import MobileChargeBus from "../../../assets/images/MobileChargebus.png";
import Logo from "../../../assets/images/logo.png";
import { Button } from "../../../components/common/button";
import { InputIcon } from "../../../components/common/input";
import { useTranslation } from "react-i18next";
import apiService from "../../../api/apiServices";
import { loginSuccess } from "../../../store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    setLoginData({ email: "", password: "" });
    setLoginError({ email: "", password: "" });
  }, [location, user]);

  const validateForm = () => {
    const errors = {
      email: !loginData.email
        ? "Email is required"
        : !/\S+@\S+\.\S+/.test(loginData.email)
        ? "Email is invalid"
        : "",
      password: !loginData.password
        ? "Password is required"
        : loginData.password.length < 6
        ? "Password must be at least 6 characters"
        : "",
    };

    setLoginError(errors);
    return !errors.email && !errors.password;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response: any = await apiService(
          "/api/auth/token/",
          "POST",
          loginData
        );

        dispatch(loginSuccess(response.data));
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

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div
      style={{
        background: `url('${MobileChargeBus}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="flex items-center justify-center h-screen py-6"
    >
      <div className="p-5 lg:p-7 lg:px-10 w-full lg:w-4/12 flex flex-col justify-center items-center bg-white rounded-lg lg:drop-shadow-lg text-center">
        <Link to="/" className="mb-6 lg:mb-8">
          <img src={Logo} alt="Logo" className="h-10 lg:h-16" />
        </Link>

        <h2 className="font-semibold text-3xl mb-3 text-center">
          {t("Log in")}
        </h2>

        <p className="text-grey-700 font-medium text-sm text-center">
          {t("Don’t have an account")}?{" "}
          <Link to="/signup" className="text-primary-500 font-semibold">
            {t("Sign up")}
          </Link>
        </p>

        <form onSubmit={handleLogin} className="my-5 w-full">
          <div className="w-full mb-6 text-start">
            <InputIcon
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder={t("Email")}
              maxLength={32}
            />
            {loginError.email && (
              <p className="text-red-500 text-sm">{loginError.email}</p>
            )}
          </div>
          <div className="w-full mb-6 text-start">
            <InputIcon
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder={t("Password")}
              maxLength={10}
            />
            {loginError.password && (
              <p className="text-red-500 text-sm">{loginError.password}</p>
            )}
          </div>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 border-0 mr-3" />
              <span className="text-sm font-medium">{t("Remember me")}</span>
            </div>
            <Link
              to="reset-password"
              className="text-sm font-medium text-primary-500 hover:text-primary-700 transition-all"
            >
              {t("Forgot password")}?
            </Link>
          </div>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="w-full"
          >
            {t("Log in")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
