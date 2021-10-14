import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Image,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { COLORS, BOX } from "../stylesheets/theme";
import ValidatedTextInput from "../components/ValidatedTextInput";
import { MapStateToProps, connect, useSelector } from "react-redux";
import { selectSID } from "../slices/userSlice";

class BecomeDriverScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			registration: "",
			capacity: "",
			validRegistration: true,
			validCapacity: false,
		};
	}

	/* This section should check that registration was previously successful from the user slice.
    If so, don't render and just go straight to initial page
    else render    
    */
	componentDidMount() {}

	async registerDriver() {
		// Check that all fields are valid
		if (
			!(
				this.state.registration &&
				this.state.capacity
			)
		) {
			console.log("Invalid rego");
			return;
		}

		try {
			const response = await fetch("https://uqpool.xyz:7777/driver", {
				method: "POST",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					// not sure if we need the stringify tbh
					sid: this.props.sid,
					registration: this.state.registration,
                    capacity: this.state.capacity
				}),
			});

			const json = await response.json();
			if (json.msg == "Driver Succesfully Added") {
				// alert the user
				//navigation.navigate("LoginScreen") can't call hooks in function
				this.props.navigation.navigate("HomeScreen");
			} else {
				console.log(json.msg);

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
			<View
				style={{
					backgroundColor: COLORS.primary,
					height: "100%",
					paddingTop: 50,
				}}
			>
				<View style={{ height: "40%", width: "100%", padding: 20 }}>
					<Image
						style={{
							resizeMode: "contain",
							height: "90%",
							width: "100%",
						}}
						source={require("../assets/registrationPicture.png")}
					/>
				</View>

				<ScrollView
					style={{
						height: "60%",
						width: "100%",
						backgroundColor: "white",
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
					}}
				>
					<View style={{ paddingVertical: 25 }}>
						<ValidatedTextInput
							style={styles.input}
							onChangeText={(registration) => this.setState({ registration })}
							placeholder='Registration of Car'
							value={this.state.registration}
							pattern={"^[A-Z0-9_.-]{6,6}"} //6 Character Rego
							onValidation={(validRegistration) => this.setState({ validRegistration })}
						/>

						<ValidatedTextInput
							style={styles.input}
							onChangeText={(capacity) => {
								this.setState({ capacity });
							}}
							placeholder='Car Capacity'
							value={this.state.capacity}
							pattern={"^[1-9]{1,1}"} //A number between 1 and 10
							onValidation={(Capacity) => this.setState({ Capacity })}
						/>

						<TouchableOpacity
							onPress={() => this.registerDriver()}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Become A Driver!</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}

function mapStateToProps(state) { 
	return { sid: selectSID(state) }
}

export default connect(mapStateToProps, null)(BecomeDriverScreen);

const styles = StyleSheet.create({
	input: {
		backgroundColor: "white",
		paddingHorizontal: "3%",
		paddingVertical: "4%",
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
		fontSize: 16,
	},
});