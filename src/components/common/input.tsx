// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faEye,
  faEyeSlash,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clx from "classnames";
import React, { useState, type ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {label && (
        <label
          htmlFor={rest.type}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className={`${label && "mt-2"} relative`}>
        {rest.name === "Name" && (
          <FontAwesomeIcon
            icon={faUser}
            className="absolute font-bold right-4 top-5 text-gray-400"
          />
        )}
        {rest.name === "Phone" && (
          <FontAwesomeIcon
            icon={faPhone}
            className="absolute right-4 top-5 text-gray-400"
          />
        )}
        {rest.name === "Email" && (
          <FontAwesomeIcon
            icon={faEnvelope}
            className="absolute right-4 top-5 text-gray-400"
          />
        )}
        {rest.type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
        <input
          {...rest}
          type={
            rest.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : rest.type
          }
          className={clx(
            "block w-full border-0 p-4 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-500 placeholder:text-base placeholder:font-medium focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6",
            className
          )}
        />
      </div>
    </div>
  );
};

export const InputIcon: React.FC<InputProps> = ({ className, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {(rest.name === "firstName" || rest.name === "lastName") && (
        <FontAwesomeIcon
          icon={faUser}
          className="absolute h-5 w-5 font-bold left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      )}
      {rest.name === "email" && (
        <FontAwesomeIcon
          icon={faEnvelope}
          className="absolute h-5 w-5 font-bold left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      )}

      {rest.name === "phone" && (
        <FontAwesomeIcon
          icon={faPhone}
          className="absolute h-5 w-5 font-bold left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      )}

      {(rest.name === "password" || rest.name === "confirmPassword") && (
        <FontAwesomeIcon
          icon={faLock}
          className="absolute h-5 w-5 font-bold left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      )}

      {rest.type === "password" && (
        <button
          type="button"
          className="absolute right-4 top-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FontAwesomeIcon
            className="text-gray-400"
            icon={showPassword ? faEyeSlash : faEye}
          />
        </button>
      )}
      <input
        {...rest}
        type={
          rest.type === "password"
            ? showPassword
              ? "text"
              : "password"
            : rest.type
        }
        className={clx(
          "w-full pl-10 pr-4 py-2 border-b-2 text-sm placeholder:font-medium focus:outline-none focus:border-primary-500",
          className
        )}
      />
    </div>
  );
};

export default Input;
