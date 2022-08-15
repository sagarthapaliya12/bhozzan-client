import { Platform } from "react-native";

import colors from "./colors";

export default {
	colors,

	text: {
		color: colors.dark,
		fontSize: 18,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
	},
	link: {
		color: colors.medium,
		// cursor: 'pointer',
		fontSize: 14,
		textAlign: "right",
		// backgroundColor: "green",
	},
};
