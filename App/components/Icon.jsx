import React from "react";
import { View} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon(name, size = 40, backgroundColor = "#ffff", iconColor = "#0000") {
	return (
		<View
			style={{
				height: size,
				width: size,
				borderRadius: size / 2,
				backgroundColor,
			}}
		>
			<MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
		</View>
	);
}

export default Icon;
