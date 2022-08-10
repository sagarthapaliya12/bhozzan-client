import React from "react";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";
import { Image, View, StyleSheet } from "react-native";
import colors from "../config/colors";

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

				<View style={styles.btnContainer}>
					<AppButton title={"login"} />
					<AppButton title={"register"} />
				</View>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: colors.screen,
	},

	logoContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: 100,
		height: 100,
		borderRadius: 50,
		top: 30,
	},
	btnContainer: {
		padding: 30,
		height: "100%",
		width: "100%",
        // backgroundColor: "red"
	},
});

export default LoginScreen;
