import React, { useRef, useEffect ,useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { selectLocation, selectOrigin, selectDestination } from "../slices/sessionSlice";
import * as Location from "expo-location";

export default function Map() {
    const [latitude, setLatitude] = useState(-27.497);
	const [longitude, setLongitude] = useState(153.0134);
	const latitudeDelta = 0.005;
	const longitudeDelta = 0.005;
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const location = useSelector(selectLocation);
    const mapRef = useRef(null);

 	useEffect(() => {
        if (location) {
		    setLatitude(location.coords.latitude);
		    setLongitude(location.coords.longitude);
    	}
    }, [origin, destination, location]);

    const animateMap = () => {
        mapRef.current.animateToRegion({
            latitude: origin.location.latitude,
            longitude: origin.location.longitude,
            longitudeDelta: longitudeDelta,
            latitudeDelta: latitudeDelta,
	    }, 1000)
    }

  return (
    <MapView
      style={styles.map}
      showsMyLocationButton={true}
	  showsUserLocation={true}
      ref={mapRef}
      region={{
	    latitude: latitude,
		longitude: longitude,
		longitudeDelta: longitudeDelta,
		latitudeDelta: latitudeDelta,
	    }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          lineDashPattern={[1]}
          strokeWidth={3}
          strokeColor='purple'
          onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`)
          }}
          onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
                        }}
          onError={(errorMessage) => {
              console.log(errorMessage)
          }}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
        )}
      {!destination && !origin && (
            <Marker
			    coordinate={{
				    latitude: latitude,
					longitude: longitude,
				}}
			/>
        )}
    </MapView>
  );
};

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
		position: "absolute",
		zIndex: -1,
    }
});
