import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MobileChargeBus from "../../../assets/images/MobileChargebus.png";
import Logo from "../../../assets/images/logo.png";
import { Button } from "../../../components/common/button";
import { InputIcon } from "../../../components/common/input";
import { useTranslation } from "react-i18next";
import apiService from "../../../api/apiServices";

const Signup: React.FC = () => {
  const { t } = useTranslation();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [signupData, setSignupData] = useState<any>({
    profile_image: null,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [signupError, setSignupError] = useState<any>({
    profile_image: null,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const sanitizedPhone = value.replace(/\D/g, "");

    switch (name) {
      case "profile_image":
        if (files) {
          setSignupData({
            ...signupData,
            profile_image: files[0],
          });
        }
        break;
      case "phone":
        setSignupData({
          ...signupData,
          phone: sanitizedPhone,
        });

        break;
      default:
        setSignupData({
          ...signupData,
          [name]: value,
        });
        break;
    }
  };

  const validateField = (name: string, value: any) => {
    switch (name) {
      case "first_name":
      case "last_name":
        return value.trim() ? "" : "This field is required";
      case "phone":
        return /^\d{8,12}$/.test(value.trim())
          ? ""
          : "Phone number must be between 8 and 12 digits";
      case "email":
        return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
          ? ""
          : "Invalid email";
      case "password":
        return value.length >= 6
          ? ""
          : "Password must be at least 6 characters";
      case "confirm_password":
        return value === signupData.password ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const errors = Object.entries(signupData).reduce((acc, [name, value]) => {
      const error = validateField(name, value);
      if (error) acc[name] = error;
      return acc;
    }, {} as any);

    setSignupError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", signupData);
      try {
        setIsLoading(true);
        const response: any = await apiService(
          "/api/auth/signup/",
          "POST",
          signupData
        );
        console.log(response?.data);

        // dispatch(loginSuccess(response.data.data));
      } catch (error: any) {
        if (error) {
          console.log("error", error);
        }
        console.log("error message", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      style={{
        background: `url('${MobileChargeBus}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="flex items-center justify-center min-h-screen py-6"
    >
      <div className="p-5 lg:p-7 lg:px-10 w-full lg:w-4/12 flex flex-col justify-center items-center bg-white rounded-lg lg:drop-shadow-lg text-center">
        <Link to="/" className="mb-6 lg:mb-8">
          <img src={Logo} alt="Logo" className="h-10 lg:h-16" />
        </Link>

        <h2 className="font-semibold text-3xl mb-3 text-center">
          {t("Create an account")}
        </h2>

        <p className="text-grey-700 font-medium text-sm text-center">
          {t("Already have an account")}?{" "}
          <Link to="/login" className="text-primary-500 font-semibold">
            {t("Log in")}
          </Link>
        </p>

        <form
          onSubmit={handleSignup}
          className="w-full flex flex-col items-center justify-center"
        >
          {/* Profile Image */}
          <div className="w-fit my-3 flex flex-col items-center justify-center">
            <div
              onClick={() => imageInputRef?.current?.click()}
              className="w-14 h-14 lg:h-20 lg:w-20 border-2 border-dashed lg:hover:border-solid transition-all border-primary-500 rounded-full cursor-pointer mb-2"
            >
              {signupData.profile_image && (
                <img
                  src={URL.createObjectURL(signupData.profile_image)}
                  className="h-full w-full rounded-full"
                  alt=""
                />
              )}
            </div>
            <p className="text-primary-500 text-xs">
              {t("Upload profile picture")} <br />*
              {t("drag or browse from device")}
            </p>
            <input
              type="file"
              className="hidden"
              name="profile_image"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleChange}
            />
          </div>
          {/* First Name */}
          <div className="w-full mb-5 text-start">
            <InputIcon
              name="first_name"
              type="text"
              value={signupData.first_name}
              onChange={handleChange}
              placeholder={t("First name")}
              maxLength={24}
            />
            {signupError.first_name && (
              <p className="text-red-500 text-sm">{signupError.first_name}</p>
            )}
          </div>
          <div className="w-full mb-5 text-start">
            <InputIcon
              name="last_name"
              type="text"
              value={signupData.last_name}
              onChange={handleChange}
              placeholder={t("Last name")}
              maxLength={24}
            />
            {signupError.last_name && (
              <p className="text-red-500 text-sm">{signupError.last_name}</p>
            )}
          </div>
          <div className="w-full mb-5 text-start">
            <InputIcon
              name="phone"
              type="tel"
              pattern="\d*"
              value={signupData.phone}
              onChange={handleChange}
              placeholder={t("Phone number")}
              maxLength={16}
            />
            {signupError.phone && (
              <p className="text-red-500 text-sm">{signupError.phone}</p>
            )}
          </div>
          {/* Email */}
          <div className="w-full mb-5 text-start">
            <InputIcon
              name="email"
              type="email"
              value={signupData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder={t("Email")}
              maxLength={32}
            />
            {signupError.email && (
              <p className="text-red-500 text-sm">{signupError.email}</p>
            )}
          </div>
          {/* Passwords */}
          <div className="w-full mb-5 text-start">
            <InputIcon
              name="password"
              type="password"
              value={signupData.password}
              onChange={handleChange}
              placeholder={t("Password")}
              maxLength={10}
            />
            {signupError.password && (
              <p className="text-red-500 text-sm">{signupError.password}</p>
            )}
          </div>
          <div className="w-full mb-5 text-start">
            <InputIcon
              name="confirm_password"
              type="password"
              value={signupData.confirm_password}
              onChange={handleChange}
              placeholder={t("Confirm password")}
              maxLength={10}
            />
            {signupError.confirm_password && (
              <p className="text-red-500 text-sm">
                {signupError.confirm_password}
              </p>
            )}
          </div>

          {/* terms and condition */}
          <div className="flex items-center mb-8 w-full">
            <input type="checkbox" className="h-4 w-4 border-0 mr-3" />
            <span className="text-sm font-medium">
              {t("I accept all terms & conditions")}
            </span>
          </div>

          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            {t("Create Account")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
