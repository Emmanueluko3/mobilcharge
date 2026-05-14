import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface MapProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: Array<{
    id: string;
    position: {
      lat: number;
      lng: number;
    };
    title?: string;
  }>;
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

const WebMap: React.FC<MapProps> = ({
  center = { lat: 6.5244, lng: 3.3792 },
  zoom = 12,
  markers = [],
  onClick,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onClick}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.title}
        />
      ))}
    </GoogleMap>
  ) : (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      Loading Maps...
    </div>
  );
};

export default React.memo(WebMap);
