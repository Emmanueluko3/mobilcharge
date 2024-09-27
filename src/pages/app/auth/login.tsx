import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileChargeBus from "../../../assets/images/MobileChargebus.png";
import Logo from "../../../assets/images/logo.png";
import { Button } from "../../../components/common/button";
import { InputIcon } from "../../../components/common/input";

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
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

        <h2 className="font-semibold text-3xl mb-3 text-center">Login</h2>

        <p className="text-grey-700 font-medium text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary-500 font-semibold">
            Sign up
          </Link>
        </p>

        <div className="my-5 w-full">
          <div className="w-full mb-6">
            <InputIcon
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              placeholder="Email"
            />
          </div>
          <div className="w-full mb-6">
            <InputIcon
              name="password"
              type="password"
              value={loginData.email}
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 border-0 mr-3" />
              <span className="text-sm font-medium">Remember me</span>
            </div>
            <Link
              to="reset-password"
              className="text-sm font-medium text-primary-500 hover:text-primary-700 transition-all"
            >
              Forgot password?
            </Link>
          </div>
          <Button className="w-full">Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
