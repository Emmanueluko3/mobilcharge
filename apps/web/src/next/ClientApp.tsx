import React from "react";
import Routes from "../App";
import { Providers } from "../utils/providers";

const ClientApp = () => (
  <Providers>
    <div className="flex justify-center flex-col lg:items-center w-full">
      <Routes />
    </div>
  </Providers>
);

export default ClientApp;
