import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Icon from "./Icon";


const ListItem = ({ image, title, description, onPress, iconComponent }) => (
	<TouchableHighlight underlayColor={colors.light} onPress={onPress}>
		<View style={styles.container}>
			{iconComponent && <Icon/>}
			{image && <Image source={image} style={styles.image} />}
			<View style={styles.details}>
				<Text numberOfLines={1} style={styles.title}>
					{title}
				</Text>
				{description && (
					<Text numberOfLines={2} style={styles.description}>
						{description}
					</Text>
				)}
			</View>
			<MaterialCommunityIcons
				name="chevron-right"
				size={24}
				color={colors.medium}
			/>
		</View>
	</TouchableHighlight>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: colors.screen,
		padding: 15,
		alignItems: "center",
	},
	description: {
		fontWeight: "300",
		color: colors.medium,
	},
	details: {
		justifyContent: "center",
		marginLeft: 10,
		flex: 1,
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 50,
	},
	title: {
        color: colors.white,
		fontSize: 16,
		fontWeight: "600",
	},
});

export default ListItem;
