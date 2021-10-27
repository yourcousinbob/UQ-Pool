import { Alert } from "react-native";

/* Alert for an unsuccesful login attempt */
export const RideRequestAlert = () =>
    Alert.alert(
        "Ride Request Recieved",
        "Yeet",
    [
        { text: "Ok"},
    ]
    );