import { FontAwesome5 } from "@expo/vector-icons";
import { brand, colors } from "@mobilcharge/ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { useTranslation } from "react-i18next";

export function HomeScreen() {
  const { t } = useTranslation();

  const features = [
    ["plug", t("CONVENIENT EV CHARGING"), t("Charge your electric vehicle anytime, anywhere with our on-demand service.")],
    ["calendar-alt", t("USER-FRIENDLY SCHEDULING"), t("Easily schedule and manage your charging sessions with our intuitive web and mobile planner.")],
    ["bolt", t("LEVEL 3 CHARGING - 80KW (MAX 220A)"), t("Get a fast charge for your vehicle with our high-speed mobile charging service.")],
    ["headset", t("24/7 CUSTOMER SUPPORT"), t("Our customer support team is available to assist you with any questions.")]
  ];

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.brand}>{brand.name}</Text>
        <Text style={styles.title}>{t("Free Your EV. MTL Mobile Charging.")}</Text>
        <Text style={styles.copy}>
          {t("Say goodbye to the hassles of EV charging with MobilCharge, available throughout Montreal. Whether you're at the office or at home, we'll come to you, providing a stress-free charging experience.")}
        </Text>
      </View>
      <View style={styles.grid}>
        {features.map(([icon, title, text]) => (
          <View key={title} style={styles.card}>
            <FontAwesome5 name={icon as any} size={26} color={colors.primary} />
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardText}>{text}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#111827",
    paddingHorizontal: 24,
    paddingVertical: 64
  },
  brand: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20
  },
  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 42
  },
  copy: {
    color: "#E5E7EB",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16
  },
  grid: {
    padding: 16,
    gap: 16
  },
  card: {
    alignItems: "center",
    borderColor: "#EBEEF3",
    borderRadius: 6,
    borderWidth: 1,
    padding: 24
  },
  cardTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 16,
    textAlign: "center"
  },
  cardText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center"
  }
});
