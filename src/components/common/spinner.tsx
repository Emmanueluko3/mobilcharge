import React from "react";

interface SpinnerProps {
  size?: string;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "w-10 h-10",
  color = "border-primary-500",
}) => {
  return (
    <div
      className={`spinner border-t-4 ${color} border-solid rounded-full ${size} animate-spin`}
    ></div>
  );
};

export default Spinner;
