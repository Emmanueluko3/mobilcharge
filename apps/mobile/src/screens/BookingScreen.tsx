import { colors } from "@mobilcharge/ui";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import * as Location from 'expo-location';
import { Screen } from "../components/Screen";
import Map from "../components/Map";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOKING_MUTATION } from "../services/queries";
import { useTranslation } from "react-i18next";

const STEPS = ["Pick Location", "Vehicle Details", "Charge Goal", "Confirm Booking"];

export function BookingScreen({ navigation }: any) {
  const { t } = useTranslation();
  const STEPS = [t("Pick Location"), t("Vehicle Details"), t("Charge Goal"), t("Confirm Booking")];

  const [step, setStep] = useState(1);
  const [locationReady, setLocationReady] = useState(false);
  const [createBooking, { loading: isSubmitting }] = useMutation<any>(CREATE_BOOKING_MUTATION);
  const [form, setForm] = useState({
    carModel: "",
    batteryLevel: "20",
    batteryTarget: "80",
    isEmergency: false,
    location: null as any,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
        setForm(f => ({ ...f, location: { latitude: coords.latitude, longitude: coords.longitude } }));
      }
      setLocationReady(true);
    })();
  }, []);

  const updateForm = (key: keyof typeof form, val: any) => setForm(f => ({ ...f, [key]: val }));

  const handleNextStep = () => {
    if (step === 1 && !form.location) {
      return Alert.alert(t("Error"), t("Please pick a location."));
    }
    if (step === 2 && !form.carModel.trim()) {
      return Alert.alert(t("Error"), t("Please enter your vehicle model."));
    }
    if (step === 3) {
      const current = parseInt(form.batteryLevel);
      const target = parseInt(form.batteryTarget);
      if (isNaN(current) || isNaN(target) || current >= target) {
        return Alert.alert(t("Error"), t("Target battery must be higher than current battery."));
      }
    }
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        rechargeAddress: "Pinned Location",
        originLat: form.location?.latitude,
        originLng: form.location?.longitude,
        carModel: form.carModel || "Default",
        batteryLevel: parseInt(form.batteryLevel),
        batteryTarget: parseInt(form.batteryTarget),
        reservationAt: new Date().toISOString(),
        isEmergency: form.isEmergency,
      };

      const { data } = await createBooking({ variables: { input: payload } });

      if (data?.createBooking) {
        Alert.alert(t("Success"), t("Booking created successfully!"));
        navigation.navigate("Tracking", { invoiceId: data.createBooking.invoiceId });
      }
    } catch (error: any) {
      const msg = error.graphQLErrors?.[0]?.message || error.message || t("Failed to create booking");
      Alert.alert(t("Error"), msg);
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setStep(s => s - 1)} disabled={step === 1}>
          <Ionicons name="chevron-back" size={24} color={step === 1 ? "transparent" : "#000"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{STEPS[step - 1]}</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.mapWrapper}>
        {!locationReady ? <ActivityIndicator size="large" color={colors.primary} /> : (
          <Map 
            initialRegion={{ ...(form.location || { latitude: 6.5244, longitude: 3.3792 }), latitudeDelta: 0.05, longitudeDelta: 0.05 }}
            onPress={loc => updateForm("location", loc)}
            markers={form.location ? [{ id: 'sel', coordinate: form.location, title: 'Pickup' }] : []}
          />
        )}
      </View>

      <View style={styles.bottomSheet}>
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>{t("Where should we meet you?")}</Text>
            <Text style={styles.stepSubtitle}>{t("Pin your car's location on the map")}</Text>
          </View>
        )}
        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>{t("Tell us about your car")}</Text>
            <TextInput placeholder={t("Vehicle Model")} style={styles.input} value={form.carModel} onChangeText={v => updateForm("carModel", v)} />
            <TouchableOpacity style={[styles.chip, form.isEmergency && styles.chipActive]} onPress={() => updateForm("isEmergency", !form.isEmergency)}>
              <Text style={[styles.chipText, form.isEmergency && styles.chipTextActive]}>{t("Emergency Request")}</Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 3 && (
          <View>
            <Text style={styles.stepTitle}>{t("Charge Status")}</Text>
            <InputGroup label={t("Current Battery (%)")} value={form.batteryLevel} onChange={(v: string) => updateForm("batteryLevel", v)} />
            <InputGroup label={t("Target Battery (%)")} value={form.batteryTarget} onChange={(v: string) => updateForm("batteryTarget", v)} />
          </View>
        )}
        {step === 4 && (
          <View style={styles.summaryCard}>
            <SummaryRow label={t("Car")} value={form.carModel || t("Default")} />
            <SummaryRow label={t("Charge")} value={`${form.batteryLevel}% → ${form.batteryTarget}%`} />
            <SummaryRow label={t("Price")} value="$45.00" isBold />
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.mainButton, isSubmitting && { opacity: 0.7 }]} 
          disabled={isSubmitting}
          onPress={() => step < 4 ? handleNextStep() : handleSubmit()}
        >
          {isSubmitting ? <ActivityIndicator color="#fff" /> : (
            <Text style={styles.mainButtonText}>{step === 4 ? t("Confirm & Request") : t("Next")}</Text>
          )}
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const InputGroup = ({ label, value, onChange }: any) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput keyboardType="numeric" style={styles.input} value={value} onChangeText={onChange} />
  </View>
);

const SummaryRow = ({ label, value, isBold }: any) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={[styles.summaryValue, isBold && { color: colors.primary, fontSize: 18 }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  mapWrapper: { flex: 1 },
  bottomSheet: { backgroundColor: "#fff", padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24, elevation: 5, shadowOpacity: 0.1, shadowRadius: 10 },
  stepTitle: { fontSize: 22, fontWeight: "800", marginBottom: 8 },
  stepSubtitle: { fontSize: 14, color: "#666", marginBottom: 16 },
  input: { backgroundColor: "#F5F7FA", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#E1E4E8", marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  chip: { padding: 12, borderRadius: 20, borderWidth: 1, borderColor: "#ddd", alignSelf: "flex-start" },
  chipActive: { backgroundColor: "#FFEBEE", borderColor: "#FF5252" },
  chipText: { color: "#666", fontWeight: "600" },
  chipTextActive: { color: "#FF5252" },
  summaryCard: { backgroundColor: "#F8FAFC", padding: 16, borderRadius: 16, marginBottom: 20 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  summaryLabel: { color: "#64748B" },
  summaryValue: { fontWeight: "600" },
  mainButton: { backgroundColor: colors.primary, padding: 18, borderRadius: 16, alignItems: "center", marginTop: 10 },
  mainButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
