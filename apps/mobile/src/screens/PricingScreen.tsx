import { colors } from "@mobilcharge/ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";

const plans = [
  ["VISITOR", "Electric vehicle owners seeking a quick charging solution"],
  ["Membership", "Electric vehicle owners seeking a recurring charging solution"],
  ["Tailored Plan", "Hotels, event centers, fleets, dealerships, businesses, events, etc."]
];

export function PricingScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Choose the plan that fits your charging needs</Text>
      </View>
      <View style={styles.list}>
        {plans.map(([name, description]) => (
          <View key={name} style={styles.card}>
            <Text style={styles.plan}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.link}>JOIN US</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    padding: 24,
    paddingVertical: 44
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34
  },
  list: {
    padding: 16,
    gap: 16
  },
  card: {
    borderColor: "#EBEEF3",
    borderRadius: 6,
    borderWidth: 1,
    padding: 22
  },
  plan: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "800"
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 18
  }
});
