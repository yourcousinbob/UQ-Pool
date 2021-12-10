import { Alert } from "react-native";

/* Alert for an unsuccesful registration attempt */
export const RegistrationFailureAlert = () =>
    Alert.alert(
        "Registration Unsuccessful",
        "A user is already registered with your details",
    [
        { text: "Ok"},
    ]
    );

/* Alert for a successful registration attempt */
export const RegistrationSuccessfulAlert = () =>
    Alert.alert(
        "Registration has been successful",
        "Welcome to UQPool!",
    [
        { text: "Ok"},
    ]
);