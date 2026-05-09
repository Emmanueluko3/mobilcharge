import { colors } from "@mobilcharge/ui";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Screen } from "../components/Screen";

export function BookingScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Request a charge for now or later</Text>
        <Text style={styles.subtitle}>Add your car details, book, and go</Text>
      </View>
      <View style={styles.form}>
        <TextInput placeholder="Car Model" style={styles.input} />
        <TextInput placeholder="Recharge Address" style={styles.input} />
        <TextInput placeholder="Battery level" keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="Kilometres left" keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="Description" multiline style={[styles.input, styles.textarea]} />
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 24
  },
  title: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    marginTop: 8
  },
  form: {
    padding: 24,
    gap: 14
  },
  input: {
    borderColor: "#D3D9E4",
    borderRadius: 6,
    borderWidth: 1,
    color: "#000000",
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: "top"
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingVertical: 14
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800"
  }
});
