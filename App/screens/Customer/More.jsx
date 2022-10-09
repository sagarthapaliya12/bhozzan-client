import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import ListItem from "../../components/ListItem";
import Icon from "../../components/Icon";

const buttonItems = [
  {
    id: 1,
    title: "Order History",
    icons: {
      name: "login",
      backgroundColor: "#000",
    },
  },
  {
    id: 2,
    title: "My Favorites",
    icons: {
      name: "login",
      backgroundColor: "#fff",
    },
  },
];

const More = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={() => console.log("clicked")}>
        <MaterialCommunityIcons name="logout" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.info}>
        <Image source={require("../../assets/Avatar.jpg")} style={styles.avatar} />
        <AppText style={{ color: "white" }}>Sabin Karki</AppText>

        <View style={styles.details}>
          <MaterialCommunityIcons name="email" size={30} color="white" />
          <AppText style={{ color: "white", marginLeft: 10 }}>sth@gmail.com</AppText>
        </View>

        <View style={styles.editBtn}>
          <AppButton
            title="Edit Profile"
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          />
        </View>

        <View style={styles.bottomContainer}>
          {/* <View style={styles.buttons}>
            <View></View>
            
          </View> */}
          <FlatList
            data={buttonItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                // iconComponent={
                // 	<Icon
                // 		name={item.icons.name}
                // 		backgroundColor={item.icons.backgroundColor}
                // 	/>
                // }  
                onPress={() => {
                 item.id===1 && navigation.navigate("OrderHistory");
                 item.id===2 && navigation.navigate("EditProfile");
                }}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ width: "100%", height: 1, backgroundColor: "#c5cdd9" }} />
            )}
          />
        </View>
      </View>
    </View>
  );
};

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
  editBtn: {
    width: "50%",
    justifyContent: "center",
    marginVertical: 20,
  },
  bottomContainer: {
    width: "85%",
    marginVertical: 60,
    color: colors.white,
  },
});

export default More;
