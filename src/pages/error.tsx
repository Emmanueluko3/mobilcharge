import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-xl lg:text-4xl font-bold text-primary-500">
        Oops! Page Not Found
      </h1>
      <p className="mt-4 text-sm lg:text-lg">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-lg hover:opacity-70 transition-all"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
