import {React, useState} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ListItem from "../../components/ListItem";
import Screen from '../../components/Screen';

const messages = [
	{
		id: 1,
		title: "Hamro Newari Bhansa",
		description: "Get flat 10% discount on Authentic Newari Cousines Week",
		image: require("../../assets/restaurants/everest-arirang-korean-restaurant.jpg"),
	},
	{
		id: 2,
		title: "Kathmandu GreenView Hotel",
		description: "One tree planted on every Rs.1000 and above order",
		image: require("../../assets/restaurants/kfc-profile.png"),
	},
	{
		id: 3,
		title: "Thakali Khana Ghar",
		description: "Hajur kata, Thakali Khana yeta",
		image: require("../../assets/restaurants/kfc.jpg"),
	},
];

function Notifications(props) {
   // const [messages, setMessages] = useState(initialMessages);

	return (
		<Screen style={styles.container}>
			<FlatList
				data={messages}
				keyExtractor={(message) => message.id.toString()}
				renderItem={({ item }) => (
					<ListItem
						title={item.title}
						description={item.description}
						image={item.image}
						onPress={() => console.log("Message Selected")}
					/>
				)}
				ItemSeparatorComponent={() => (
					<View
						style={{ width: "100%", height: 1, backgroundColor: "#c5cdd9" }}
					/>
				)}

			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
      marginVertical: -31,
	},
});

export default Notifications;
