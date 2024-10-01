import { CircularProgress } from "@mui/joy";
import clx from "classnames";
import React, { type ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "danger" | "ticket" | "white";
  variant?: "solid" | "outline";
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isLoading,
  color = "primary",
  size = "md",
  variant = "solid",
  ...rest
}) => {
  return (
    <button
      className={clx(
        "bg-primary-500 flex justify-center items-center rounded-md bg-primary text-sm font-semibold text-white transition-all shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        {
          "border-green": color === "primary",
          "hover:border-green-light": color === "primary",
          "border-danger": color === "danger",
          "border-outset": color === "secondary",
          "border-ticket": color === "ticket",
          "border-white": color === "white",
          "bg-green": color === "primary" && variant === "solid",
          "hover:bg-green-light": color === "primary" && variant === "solid",
          "bg-danger": color === "danger" && variant === "solid",
          "bg-outset": color === "secondary" && variant === "solid",
          "bg-ticket": color === "ticket" && variant === "solid",
          "bg-white": color === "white" && variant === "solid",
          "bg-transparent": variant === "outline",
          "text-green hover:text-green-light":
            color === "primary" && variant === "outline",
          "text-danger": color === "danger" && variant === "outline",
          "text-outset": color === "secondary" && variant === "outline",
          "text-ticket": color === "ticket" && variant === "outline",
          "text-white": variant === "solid" && color !== "white",
          "text-green": color === "white",
          "px-8 py-4 text-2xl": size === "lg",
          "px-5 py-2 text-base": size === "md",
          // "px-5 py-2 text-xl": size === "sm",
        },
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <p className="font-semibold flex items-center">
          <CircularProgress size="sm" />
          <span className="ml-2">Loading...</span>
        </p>
      ) : (
        children
      )}
    </button>
  );
};

export { Button };
