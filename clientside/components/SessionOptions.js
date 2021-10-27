import React, { useRef, useEffect } from "react";
import {FlatList,StyleSheet,View} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {FONT_SIZE,box,LINE,cantPress,COLORS} from "../stylesheets/theme";
import { GOOGLE_MAPS_API_KEY } from "@env";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";

import {selectDestination,selectOrigin,setDestination,setOrigin,setStatus,
} from "../slices/sessionSlice";
import {selectSID} from "../slices/userSlice";
import SocketConnection from '../socket.js';
import { UserStatus } from "../enums/UserStatus";
import DriverListModalButton from "./DriverListModal";
import BecomeDriverModalButton from "./BecomeDriverModalButton";

/**User frontend options */
const options = [
  {
    id: "rider",
    title: "Be a rider",
    button: DriverListModalButton,
  },
  {
    id: "driver",
    title: "Be a driver",
    button: BecomeDriverModalButton,
  },
];

const SessionOptions = () => {
  Location.installWebGeolocationPolyfill();
  navigator.geolocation.getCurrentPosition(Location.getCurrentPositionAsync());

  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const sid = useSelector(selectSID);

  const originRef = useRef();
  const destRef = useRef();

  useEffect(() => {
    if (origin) {
      originRef.current?.setAddressText(origin.description);
    }
    if (destination) {
      destRef.current?.setAddressText(destination.description);
    }
  }, []);

  return (
    <View>
      <View style={[box.shadows, box.base, { backgroundColor: "white" }]}>
        <GooglePlacesAutocomplete
          ref={originRef}
          styles={googlePlacesStyle}
          placeholder="Enter starting point"
          fetchDetails={true}
          nearbyPlacesAPI="GoogleReverseGeocoding"
          debounce={200}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
            components: "country:aus",
          }}
          returnKeyType={"search"}
          minLength={2}
          enablePoweredByContainer={false}
          currentLocation={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description
                  ? data.description
                  : data.formatted_address,
              })
            );
          }}
        />
        <GooglePlacesAutocomplete
          ref={destRef}
          styles={googlePlacesStyle}
          placeholder="Enter destination"
          fetchDetails={true}
          nearbyPlacesAPI="GoogleReverseGeocoding"
          debounce={200}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
            components: "country:aus",
          }}
          returnKeyType={"search"}
          maxLength={2}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );
          }}
        />
      </View>
      <View style={origin && destination ? null : cantPress}>
        <FlatList
          data={options}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingTop: 10,
          }}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <item.button/>
          )}
        />
      </View>
    </View>
  );
};

//allows us to import to other pages
export default SessionOptions;

//stylesheet
const styles = StyleSheet.create({
  font: {
    fontSize: FONT_SIZE.text,
  },
  horizontalLine: {
    borderBottomColor: "lightgray",
    borderBottomWidth: LINE.width,
    paddingBottom: 7,
    marginBottom: 7,
  },
  sessionButtons: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 15,
  },
  sessionButtonsText: {
    fontSize: FONT_SIZE.text,
    color: "white",
  },
});

const googlePlacesStyle = StyleSheet.create({
  textInput: {
    fontSize: FONT_SIZE.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
    height: null,
  },
});
