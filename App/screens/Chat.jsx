import { React, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import { useNavigation } from "@react-navigation/native";

const messages = [
  {
    id: 1,
    title: "Newari Bhansa",
    description: "hello there, wanted to know about the menu items",
    image: require("../assets/restaurants/everest-arirang-korean-restaurant.jpg"),
  },
  {
    id: 2,
    title: "GreenView Hotel",
    description: "what are today's specials?",
    image: require("../assets/restaurants/kfc-profile.png"),
  },
  {
    id: 3,
    title: "Thakali Ghar",
    description: "do you open late on fridays",
    image: require("../assets/restaurants/kfc.jpg"),
  },
];

function Chat(props) {
  // const [messages, setMessages] = useState(initialMessages);
  const navigation = useNavigation();

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.description}
            image={item.image}
            onPress={() => {
              navigation.navigate("Messages Screen", {userName: item.title});
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 1, backgroundColor: "#c5cdd9" }} />
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

export default Chat;