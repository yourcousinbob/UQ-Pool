import { Alert } from "react-native";
import logout from "../../util/logout";

export const LogoutAlert = () =>
    Alert.alert(
        "Logout",
        "Are you sure you wish to log out?",
    [
        { text: "Yes", onPress: () => logout() },
        { text: "No", onPress: () => console.log("Don't log out") }
    ]
    );