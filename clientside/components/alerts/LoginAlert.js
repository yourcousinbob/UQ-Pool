import { Alert } from "react-native";

/* Alert for an unsuccesful login attempt */
export const LoginFailureAlert = () =>
    Alert.alert(
        "Login Unsuccessful",
        "Invalid id or password were given",
    [
        { text: "Ok"},
    ]
    );