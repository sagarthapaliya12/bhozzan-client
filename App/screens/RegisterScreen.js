import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import "yup-phone";

import Screen from "../components/Screen";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitButton from "../components/forms/SubmitButton";
import defaultStyles from "../config/styles";

const validationSchema = Yup.object().shape({
	first: Yup.string().required().min(3).label("First Name"),
	last: Yup.string().required().min(3).label("Last Name"),

	number: Yup.string()
		.phone("NP", true, "${path} is invalid")
		.required()
		.label("Phone Number"),

	email: Yup.string().required().email().label("Email"),

	password: Yup.string().required().min(6).max(14).label("Password"),
	confirmPassword: Yup.string()
		.required()
		.min(6)
		.max(14)
		.oneOf([Yup.ref("password")], "passwords do not match")
		.label("Password"),
});

function RegisterScreen() {
	return (
		<Screen style={styles.container}>
			<View style={styles.logoContainer}>
				<Image
					source={require("../assets/App-Logo.jpg")}
					style={styles.logo}
				></Image>
			</View>

			<View style={styles.formContainer}>
				<Form
					initialValues={{
						first: "",
						last: "",
						number: "",
						email: "",
						password: "",
						confirmPassword: "",
					}}
					onSubmit={(values) => console.log(values)}
					validationSchema={validationSchema}
				>
					<FormField
						autoCorrect={false}
						icon="account"
						name="first"
						placeholder="First Name"
					/>
					<FormField
						autoCorrect={false}
						icon="account"
						name="last"
						placeholder="Last Name"
					/>
					<FormField
						autoCorrect={false}
						icon="phone"
						name="number"
						placeholder="Phone Number"
					/>
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
					<FormField
						autoCapitalize="none"
						autoCorrect={false}
						icon="lock"
						name="confirmPassword"
						placeholder="Confirm password"
						secureTextEntry
						textContentType="password"
					/>
					<SubmitButton title="Register" />
				</Form>
			</View>

			<Text style={{ color: defaultStyles.colors.medium }}>
				Already have an account?
				<Text onPress={() => console.log("clicked")} style={defaultStyles.link}>
					Login
				</Text>
			</Text>

			<Text onPress={() => console.log("clicked")} style={defaultStyles.link}>
				Register Your Restaurant Here
			</Text>
		</Screen>
	);
}

const styles = StyleSheet.create({
	logoContainer: {
		position: "absolute",
		top: 25,
		alignItems: "center",
	},
	logo: {
		width: 100,
		height: 100,
		borderRadius: 50,
		top: 20,
	},
	
	formContainer: {
		width: "90%",
		position: "fixed",
		top: 20,
	},

	container: {
		flex: 1,
		backgroundColor: defaultStyles.colors.screen,
		justifyContent: "flex-end",
		alignItems: "center",
		padding: 20,
	},
});

export default RegisterScreen;
