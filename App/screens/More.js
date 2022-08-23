import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./../components/AppText";

function More(props) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.logout}
				onPress={() => console.log("clicked")}
			>
				<MaterialCommunityIcons name="logout" size={30} color="white" />
			</TouchableOpacity>

			<View style={styles.info}>
				<Image source={require("../assets/Avatar.jpg")} style={styles.avatar} />
				<AppText style={{color: "white"}}>Sabin Karki</AppText>

				<View style={styles.details}>
					<MaterialCommunityIcons name="email" size={30} color="white" />
					<AppText style={{color: "white", marginLeft: 10}}>sth@gmail.com</AppText>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#161B22",
	},

	logout: {
		position: "absolute",
		right: 10,
		top: 10,
	},
	info: {
		marginVertical: 60,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "green",
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		// top: 80,
	},
	details: {
		flexDirection: "row",
	},
});

export default More;
