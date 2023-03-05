import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import colors from "../../config/colors";
import AppText from "../../components/AppText";
// import AppButton from "../../components/AppButton";
// import ListItem from "../../components/ListItem";
// import Icon from "../../components/Icon";

import { logout, reset } from "../Public/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./customerSlice";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading/Loading";

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

const More = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.customerSlice.user);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.logout} onPress={() => handleLogout()}>
        <MaterialCommunityIcons name="logout" size={30} color="white" />
      </TouchableOpacity> */}

      {user ? (
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
              Reward Points: {user.rewardPoints}
            </AppText>
          </View>

          <View style={styles.features}>
            <Pressable
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              onPress={() => navigation.navigate("OrderHistory")}
            >
              <MaterialCommunityIcons name="history" size={24} color={colors.gray} />
              <Text style={styles.bottomText}>Order History</Text>
            </Pressable>
            <Pressable
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              onPress={() => navigation.navigate("MyReservation")}
            >
              <AntDesign name="calendar" size={24} color={colors.gray} />
              <Text style={styles.bottomText}>My Reservations</Text>
            </Pressable>
            <Pressable
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              onPress={() => navigation.navigate("FavoritesScreen")}
            >
              <AntDesign name="heart" size={24} color="red" />
              <Text style={styles.bottomText}>My Favorites</Text>
            </Pressable>
            <Pressable
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              onPress={() => handleLogout()}
            >
              <MaterialCommunityIcons name="logout" size={24} color={colors.white} />
              <Text style={styles.bottomText}>Logout</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#161B22",
  },

  logout: {
    position: "absolute",
    right: 20,
    top: 40,
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
    width: "100%",
    paddingVertical: 15,
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
  bottomText: {
    color: colors.gray,
    marginHorizontal: 10,
    fontSize: 18,
  },
  features: { width: "100%", alignItems: "center", marginTop: 30 },
  bottomRow: {
    width: "90%",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
});

export default More;
