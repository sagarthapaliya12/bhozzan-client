import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import colors from "../../config/colors";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import ListItem from "../../components/ListItem";
import Icon from "../../components/Icon";

import { logout } from "../Public/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./customerSlice";

// const buttonItems = [
//   {
//     id: 1,
//     title: "Order History",
//     icons: {
//       name: "login",
//       backgroundColor: "#000",
//     },
//   },
//   {
//     id: 2,
//     title: "My Favorites",
//     icons: {
//       name: "login",
//       backgroundColor: "#fff",
//     },
//   },
// ];

const More = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.customerSlice.user);
  console.log("User is: ", user);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={() => handleLogout()}>
        <MaterialCommunityIcons name="logout" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.info}>
        <Image source={require("../../assets/Avatar.jpg")} style={styles.avatar} />
        <AppText style={{ color: "white" }}>{`${user.firstName} ${user.lastName}`}</AppText>

        <View style={styles.details}>
          <Ionicons name="call" size={24} color="white" />
          <AppText style={{ color: "white", marginLeft: 10 }}>{user.phoneNumber}</AppText>
        </View>

        <View style={styles.details}>
          <MaterialIcons name="location-city" size={24} color="white" />
          <AppText style={{ color: "white", marginLeft: 10, marginBottom: 20 }}>
            {user.address}
          </AppText>
        </View>

        <View style={styles.details}>
          <AntDesign name="star" size={24} color="gold" />
          <AppText style={{ color: "white", marginLeft: 10, color: "gold" }}>
            Reward Pts: {user.rewardPoints}
          </AppText>
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
          <Pressable
            style={styles.bottomRow}
            android_ripple={{ color: colors.lightGray, borderless: true }}
            onPress={() => navigation.navigate("OrderHistory")}
          >
            <MaterialCommunityIcons name="history" size={24} color="black" />
            <Text style={{ color: "black", marginHorizontal: 10, fontSize: 18 }}>
              Order History
            </Text>
          </Pressable>              
        </View>

        <View style={styles.bottomContainerSecond}>
          <Pressable
            style={styles.bottomRow}
            android_ripple={{ color: colors.lightGray, borderless: true }}
            onPress={() => navigation.navigate("FavoritesScreen")}
          >
            <AntDesign name="heart" size={24} color="black" />
            <Text style={{ color: "black", marginHorizontal: 10, fontSize: 18 }}>
              My Favorites
            </Text>
          </Pressable>              
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
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
    width: "80%",
    marginTop: 60,
    backgroundColor: colors.primary,
    borderRadius: 50,
    overflow: 'hidden',
  },
  bottomContainerSecond: {
    width: "80%",
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 50,
    overflow: 'hidden',
  },
  bottomRow: {
    width: "100%",
    flexDirection: "row",  
    padding: 15,
  },

});

export default More;
