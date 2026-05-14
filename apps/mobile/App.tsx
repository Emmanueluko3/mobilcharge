import "./src/i18n";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { BookingScreen } from "./src/screens/BookingScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { PricingScreen } from "./src/screens/PricingScreen";
import { AppTab, TabBar } from "./src/components/TabBar";

const screens: Record<AppTab, React.ComponentType> = {
  home: HomeScreen,
  booking: BookingScreen,
  pricing: PricingScreen
};

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const Screen = screens[activeTab];

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Screen />
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
    </SafeAreaProvider>
  );
}
