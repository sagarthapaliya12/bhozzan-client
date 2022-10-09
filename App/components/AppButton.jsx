import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary" }) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: colors[color] }]}
            onPress={onPress}
		>
			<Text style={styles.text}> {title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		borderRadius: 25,
		padding: 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		elevation: 10,
		marginVertical: 10,
	},

	text: {
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: 20,
		textTransform: "uppercase",
		color: colors.black,
	},
});
export default AppButton;
