import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { BOX, COLORS, FONT_SIZE } from "../stylesheets/theme";
import * as Location from "expo-location";

import DropOffModalButton from "../components/DropOffModalButton";

export default function MapScreen() {
  const [latitude, setLatitude] = useState(-27.497);
  const [longitude, setLongitude] = useState(153.0134);
  const latitudeDelta = 0.005;
  const longitudeDelta = 0.005;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access foreground location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest, // android won't work without this :(
      });
      console.log(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        showsMyLocationButton={true}
        showsUserLocation={true}
        region={{
          latitude: latitude,
          longitude: longitude,
          longitudeDelta: longitudeDelta,
          latitudeDelta: latitudeDelta,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
      <View style={styles.bubble}>
        <DropOffModalButton/>
        <Text>Some More Text</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
  bubble: {
    backgroundColor: "white",
    borderRadius: BOX.borderRadius,
    marginHorizontal: "10%",
    padding: 15,
    width: "80%",
    position: "absolute",
    bottom: "15%",
    display: "flex",
  },
});
