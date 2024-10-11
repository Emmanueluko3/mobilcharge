import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./App";
import reportWebVitals from "./reportWebVitals";

import { Providers } from "./utils/providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Providers>
      <div className="flex justify-center flex-col items-center w-full">
        <Routes />
      </div>
    </Providers>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
