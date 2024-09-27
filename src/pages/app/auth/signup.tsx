import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MobileChargeBus from "../../../assets/images/MobileChargebus.png";
import Logo from "../../../assets/images/logo.png";
import { Button } from "../../../components/common/button";
import { InputIcon } from "../../../components/common/input";
import { useTranslation } from "react-i18next";

const Signup: React.FC = () => {
  const { t } = useTranslation();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [signupData, setSignupData] = useState<any>({
    profileImage: null,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files) {
      setSignupData({
        ...signupData,
        profileImage: files[0],
      });
    } else {
      setSignupData({
        ...signupData,
        [name]: value,
      });
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

        <form className="w-full flex flex-col items-center justify-center">
          {/* Profile Image */}
          <div className="w-fit my-3 flex flex-col items-center justify-center">
            <div
              onClick={() => imageInputRef?.current?.click()}
              className="w-14 h-14 lg:h-20 lg:w-20 border-2 border-dashed lg:hover:border-solid transition-all border-primary-500 rounded-full cursor-pointer mb-2"
            >
              {signupData.profileImage && (
                <img
                  src={URL.createObjectURL(signupData.profileImage)}
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
              name="profileImage"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleChange}
            />
          </div>
          {/* First Name */}
          <div className="w-full mb-5">
            <InputIcon
              name="firstName"
              type="text"
              value={signupData.firstName}
              onChange={handleChange}
              required
              placeholder="First name"
            />
          </div>
          <div className="w-full mb-5">
            <InputIcon
              name="lastName"
              type="text"
              value={signupData.lastName}
              onChange={handleChange}
              required
              placeholder="Last name"
            />
          </div>
          <div className="w-full mb-5">
            <InputIcon
              name="phone"
              type="text"
              value={signupData.phone}
              onChange={handleChange}
              required
              placeholder="Phone number"
            />
          </div>
          {/* Email */}
          <div className="w-full mb-5">
            <InputIcon
              name="email"
              type="email"
              value={signupData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              placeholder="Email"
            />
          </div>
          {/* Passwords */}
          <div className="w-full mb-5">
            <InputIcon
              name="password"
              type="password"
              value={signupData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>
          <div className="w-full mb-5">
            <InputIcon
              name="confirmPassword"
              type="password"
              value={signupData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
            />
          </div>

          {/* terms and condition */}
          <div className="flex items-center mb-8 w-full">
            <input type="checkbox" className="h-4 w-4 border-0 mr-3" />
            <span className="text-sm font-medium">
              I accept all terms & conditions
            </span>
          </div>

          <Button className="w-full">{t("Create Account")}</Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
