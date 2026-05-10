import React, { useEffect } from "react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n";
import { Toaster } from "react-hot-toast";
import { APIProvider } from "@vis.gl/react-google-maps";
import AOS from "aos";
import "aos/dist/aos.css";

import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "../api/apolloClient";

const persistor = persistStore(store);
export function Providers({ children }: { children: React.ReactNode }) {
  const apiKey: any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
      mirror: true,
    });
  }, []);
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={apolloClient}>
            <APIProvider apiKey={apiKey}>
              <Toaster />
              {children}
            </APIProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
}
