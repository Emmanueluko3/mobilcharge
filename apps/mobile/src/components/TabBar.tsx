import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "@mobilcharge/ui";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export type AppTab = "home" | "booking" | "pricing";

interface TabBarProps {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
}

export function TabBar({ activeTab, onChange }: TabBarProps) {
  const { t } = useTranslation();
  
  const tabs: Array<{ key: AppTab; label: string; icon: string }> = [
    { key: "home", label: t("Home"), icon: "home" },
    { key: "booking", label: t("Booking"), icon: "calendar-alt" },
    { key: "pricing", label: t("Pricing"), icon: "bolt" }
  ];

  return (
    <View style={styles.bar}>
      {tabs.map((tab) => {
        const active = tab.key === activeTab;
        return (
          <Pressable key={tab.key} style={styles.item} onPress={() => onChange(tab.key)}>
            <FontAwesome5
              name={tab.icon}
              size={18}
              color={active ? colors.primary : colors.muted}
            />
            <Text style={[styles.label, active && styles.active]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopColor: "#EBEEF3",
    borderTopWidth: 1,
    backgroundColor: colors.surface,
    paddingVertical: 10
  },
  item: {
    alignItems: "center",
    flex: 1,
    gap: 4
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600"
  },
  active: {
    color: colors.primary
  }
});
