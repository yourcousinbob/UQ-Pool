import { Alert } from "react-native";

/* Alert for successful ride request attempt */
export const RideRequestAlert = () =>
    Alert.alert(
        "Ride Request Recieved",
        "Yeet",
    [
        { text: "Ok"},
    ]
    );