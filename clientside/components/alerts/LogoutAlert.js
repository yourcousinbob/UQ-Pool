import { Alert } from "react-native";
import LogOut from "../../util/LogOut";


export const LogoutAlert = (dispatch, sid) =>
    Alert.alert(
        "Logout",
        "Are you sure you wish to log out?",
    [
        { text: "Yes", onPress: () => LogOut(dispatch, sid) },
        { text: "No", onPress: () => console.log("Don't log out") }
    ]
    );

