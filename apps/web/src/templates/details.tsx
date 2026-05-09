import React from "react";
import Spinner from "../components/common/spinner";
import { Button } from "../components/common/button";

interface DetailsProps {
  isLoading?: boolean;
  errorText?: string | null;
  children?: React.ReactNode;
}

const DetailsTemplate: React.FC<DetailsProps> = ({
  isLoading,
  errorText,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="mb-16 bg-white w-full h-96 rounded-lg p-4 flex items-center justify-center">
        <Spinner size="w-16 h-16" />
      </div>
    );
  }

  if (errorText) {
    return (
      <div className="mb-16 bg-white w-full h-96 rounded-lg p-4 flex items-center flex-col justify-center">
        <p className="font-medium text-gray-400 z-20 text-sm lg:text-2xl text-center mb-3">
          Oops!
        </p>
        <p className="font-medium text-gray-400 z-20 text-sm lg:text-lg text-center mb-8">
          {errorText}
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }
  return <>{children}</>;
};

export default DetailsTemplate;
