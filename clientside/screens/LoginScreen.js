import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Image,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { COLORS, BOX } from "../stylesheets/theme";
import ValidatedTextInput from "../components/ValidatedTextInput";
import {
	useDispatch,
	MapDispatchToProps,
	connect,
	useSelector,
} from "react-redux";
import { useNavigation } from "@react-navigation/core";
import userSlice, {
	selectAuthentication,
	setAuthentication,
	setFirst,
	setLast,
	setEmail,
	setPhone,
	setSID,
	setTokens,
} from "../slices/userSlice";
import SocketConnection from "../socket.js";
import { LoginFailureAlert } from "../components/alerts/LoginAlert";

function RegistrationButton() {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("RegistrationScreen")}
			style={styles.button}
		>
			<Text style={styles.buttonText}>Sign Up</Text>
		</TouchableOpacity>
	);
}

export class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sid: "",
			password: "",
			validSid: false,
			token: null,
			socket: null,
		};
	}

	/* This section should check that registration was previously successful from the user slice.
    If so, don't render and just go straight to initial page
    else render    
    */

	componentDidMount() {}

	async loginUser() {
		// Check that all fields are valid
		if (!this.state.validSid) {
			console.log("Invalid Student ID Format");
			return;
		}

		try {
			const response = await fetch("https://uqpool.xyz:7777/login", {
				method: "POST",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					// not sure if we need the stringify tbh
					sid: this.state.sid,
					password: this.state.password,
				}),
			});

			const json = await response.json();

			if (json.msg == "Successful Login") {
				//store login details from server
				this.props.setAuthentication(json.auth_token);
				this.props.setLast(json.last_name);
				this.props.setEmail(json.email);
				this.props.setPhone(json.phone);
				this.props.setFirst(json.first_name);
				this.props.setSID(json.sid);
				this.props.setTokens(json.tokens);
				connection = SocketConnection.getConnection();
				connection.sendPayload("login", { sid: json.sid });
				connection.recievePayload("login", () => {});
			} else {
				console.log(json.msg);
				LoginFailureAlert();
				// Switch to the initial state of the app
			}
		} catch (error) {
			console.log("Caught Error");
			console.log(error);
		} finally {
			// Just in case this is required
		}
	}

	render() {
		return (
			<View style={{ backgroundColor: COLORS.primary, height: "100%" }}>
				<View
					style={{ display: "flex", flexDirection: "column", paddingTop: 50 }}
				>
					<View style={{ height: "40%", width: "100%", padding: 20 }}>
						<Image
							style={{
								resizeMode: "contain",
								height: "100%",
								width: "100%",
							}}
							source={require("../assets/stacked_logo.png")}
						/>
					</View>

					<View
						style={{
							height: "60%",
							width: "100%",
							backgroundColor: "white",
							borderTopStartRadius: 20,
							borderTopEndRadius: 20,
							paddingVertical: 25,
						}}
					>
						<Image
							style={{
								resizeMode: "contain",
								height: "30%",
								width: "100%",
							}}
							source={require("../assets/UQ_Auth.png")}
						/>
						<ValidatedTextInput
							style={styles.input}
							onChangeText={(sid) => {
								this.setState({ sid });
							}}
							placeholder='UQ Username'
							value={this.state.sid}
							//pattern={'^[a-zA-Z0-9.]+@uq.edu.au|[a-zA-Z0-9.]+@uqconnect.edu.au'}
							//pattern={'^(s|uq)\d{7}$'}
							pattern={"^[0-9]{8}$"}
							onValidation={(validSid) => this.setState({ validSid })}
						/>

						<TextInput
							style={styles.input}
							onChangeText={(password) => {
								this.setState({ password });
							}}
							placeholder='Password'
							value={this.state.password}
							secureTextEntry={true}
						/>
						<TouchableOpacity
							onPress={() => this.loginUser()}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
						<RegistrationButton />
					</View>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setAuthentication: (authentication_token) =>
			dispatch(setAuthentication(authentication_token)),

		setSID: (sid) => dispatch(setSID(sid)),

		setFirst: (first_name) => dispatch(setFirst(first_name)),

		setLast: (last_name) => dispatch(setLast(last_name)),

		setPhone: (phone) => dispatch(setPhone(phone)),

		setEmail: (email) => dispatch(setEmail(email)),

		setTokens: (tokens) => dispatch(setTokens(tokens)),
	};
};

function mapStateToProps(state) {
	return {
		authentication_token: state.user.authentication_token,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
  
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        paddingHorizontal: "3%",
        paddingVertical:"4%",
        marginVertical: "1%",
        marginHorizontal: "7%",
        borderRadius: BOX.borderRadius,
        borderColor: COLORS.primary,
        borderWidth: 1,
    },
    button: {
        backgroundColor: COLORS.primary,
        marginHorizontal: "25%",
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: BOX.borderRadius,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16
    }
});
