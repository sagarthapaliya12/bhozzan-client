import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import * as Yup from "yup";

import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";
import AppButton from "../components/AppButton";
import defaultStyles from "../config/styles"

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
	return (
		<Screen>
			<View style={styles.screenContainer}>
				<View style={styles.logoContainer}>
					<Image
						source={require("../assets/App-Logo.jpg")}
						style={styles.logo}
					></Image>
				</View>

				<View style={styles.formContainer}>
					<Form
						initialValues={{ email: "", password: "" }}
						onSubmit={(values) => console.log(values)}
						validationSchema={validationSchema}
					>
						<FormField
							autoCapitalize="none"
							autoCorrect={false}
							icon="email"
							keyboardType="email-address"
							name="email"
							placeholder="Email"
							textContentType="emailAddress"
						/>
						<FormField
							autoCapitalize="none"
							autoCorrect={false}
							icon="lock"
							name="password"
							placeholder="Password"
							secureTextEntry
							textContentType="password"
						/>
						<SubmitButton title="Login" />
					</Form>

					<Text onPress={() => console.log("clicked")} style={defaultStyles.link}>
						Forgot Password?
					</Text>
				</View>

				<View style={styles.btnContainer}>
					<AppButton title="register" />
				</View>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: colors.screen,
		justifyContent: "flex-end",
		alignItems: "center",
	},

	logoContainer: {
		position: "absolute",
		top: 70,
		alignItems: "center",
	},
	logo: {
		width: 100,
		height: 100,
		borderRadius: 50,
		top: 30,
	},
	formContainer: {
		width: "90%",
		position: "absolute",
		top: 300,
	},
	btnContainer: {
		padding: 10,
		width: "90%",
		bottom: 0,
	},
});

export default LoginScreen;
