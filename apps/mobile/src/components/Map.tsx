import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MapProps {
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers?: Array<{
    id: string;
    coordinate: Coordinate;
    title?: string;
    description?: string;
    pinColor?: string;
  }>;
  polyline?: Coordinate[];
  onPress?: (coordinate: Coordinate) => void;
  style?: ViewStyle;
}

const Map: React.FC<MapProps> = ({
  initialRegion,
  markers,
  polyline,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={(e) => onPress && onPress(e.nativeEvent.coordinate)}
      >
        {markers?.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
          />
        ))}
        {polyline && (
          <Polyline
            coordinates={polyline}
            strokeWidth={4}
            strokeColor="#1E90FF"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
