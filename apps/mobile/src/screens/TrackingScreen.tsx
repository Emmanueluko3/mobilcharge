import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { io, Socket } from "socket.io-client";
import { Screen } from "../components/Screen";
import Map from "../components/Map";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@mobilcharge/ui";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client/react";
import { GET_BOOKING_BY_INVOICE } from "../services/queries";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL?.replace('/api', '') || "http://localhost:4000";

export function TrackingScreen({ route, navigation }: any) {
  const { t } = useTranslation();
  const { invoiceId } = route.params || { invoiceId: "mock-invoice" };

  const { data: bookingData, loading } = useQuery<any>(GET_BOOKING_BY_INVOICE, {
    variables: { invoiceId },
    fetchPolicy: "network-only",
  });

  const booking = bookingData?.bookingByInvoice;
  const driverId = booking?.driver?.id || "mock-driver";

  const [driverLocation, setDriverLocation] = useState({
    latitude: 6.5244,
    longitude: 3.3792,
  });
  const [status, setStatus] = useState("PENDING");
  const [eta, setEta] = useState("Calculating...");

  useEffect(() => {
    if (booking?.status) {
      setStatus(booking.status);
    }
  }, [booking]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to tracking socket");
    });

    socket.on(`driverLocation:${driverId}`, (data: any) => {
      setDriverLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });

    socket.on(`bookingStatus:${booking?.id}`, (data: any) => {
      setStatus(data.status);
    });

    return () => {
      socket.disconnect();
    };
  }, [booking?.id, driverId]);

  return (
    <Screen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("Live Tracking")}</Text>
        <View style={{ width: 28 }} />
      </View>

      <Map 
        initialRegion={{
          ...driverLocation,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        markers={[
          { 
            id: 'driver', 
            coordinate: driverLocation, 
            title: t("Your Charger"),
            pinColor: colors.primary 
          }
        ]}
      />

      <View style={styles.bottomCard}>
        <View style={styles.statusRow}>
          <View>
            <Text style={styles.statusLabel}>{t("Current Status")}</Text>
            <Text style={styles.statusValue}>{status.replace('_', ' ')}</Text>
          </View>
          <View style={styles.etaBadge}>
            <Text style={styles.etaText}>{eta}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.driverInfo}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={24} color="#fff" />
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>
              {booking?.driver ? `${booking.driver.firstName} ${booking.driver.lastName}` : t("Awaiting Driver")}
            </Text>
            <Text style={styles.truckInfo}>{t("Charging Truck")}</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
  },
  etaBadge: {
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  etaText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 20,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  driverDetails: {
    flex: 1,
    marginLeft: 16,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  truckInfo: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },
  callButton: {
    backgroundColor: "#22C55E",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
