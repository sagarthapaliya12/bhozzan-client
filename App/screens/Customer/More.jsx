import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import { logout, reset } from "../Public/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./customerSlice";
import { useNavigation } from "@react-navigation/native";
import EditButton from "../../components/shared/EditButton";
import * as Location from "expo-location";

const More = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.customerSlice.user);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const [markerAddress, setMarkerAddress] = useState(null);
  useEffect(() => {
    if (typeof user?.address === "object") {
      // change this condition  to "if (user.address)" {when all users have object as address
      (async () => {
        try {
          const address = await Location.reverseGeocodeAsync(user.address);
          setMarkerAddress(address[0]);
        } catch (err) {
          console.log("Map Error", err);
        }
      })();
    }
  }, [user?.address]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.info}>
          <View
            style={{
              right: 20,
              position: "absolute",
              top: 0,
            }}
          >
            <EditButton />
          </View>

          <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("../../assets/Avatar.jpg")} style={styles.avatar} />
            <AppText style={{ color: "white" }}>{`${user.firstName} ${user.lastName}`}</AppText>

            <View style={styles.details}>
              <Ionicons name="call" size={24} color="white" />
              <AppText style={{ color: "white", marginLeft: 10 }}>{user.phoneNumber}</AppText>
            </View>
          </View>
          <View style={styles.details}>
            <MaterialIcons name="location-city" size={24} color="white" />
            {/* remove this condition when all users have object as address */}
            {typeof user?.address === "object" && (
              <AppText style={{ color: "white", marginLeft: 10, marginBottom: 20 }}>
                {markerAddress &&
                  `${markerAddress.street ? `${markerAddress.street},` : ""} ${
                    markerAddress.city ? `${markerAddress.city},` : ""
                  } ${markerAddress.city}, ${markerAddress.subregion}, ${markerAddress.country}`}
              </AppText>
            )}
          </View>

          <View style={styles.details}>
            <AntDesign name="star" size={24} color="gold" />
            <AppText style={{ color: "white", marginLeft: 10, color: "gold" }}>
              Reward Points: {user.rewardPoints}
            </AppText>
          </View>

          <View style={styles.features}>
            <TouchableOpacity
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              onPress={() => navigation.navigate("OrderHistory")}
            >
              <MaterialCommunityIcons name="history" size={24} color={colors.gray} />
              <Text style={styles.bottomText}>Order History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              onPress={() => navigation.navigate("MyReservation")}
            >
              <AntDesign name="calendar" size={24} color={colors.gray} />
              <Text style={styles.bottomText}>My Reservations</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              onPress={() => navigation.navigate("FavoritesScreen")}
            >
              <AntDesign name="heart" size={24} color="red" />
              <Text style={styles.bottomText}>My Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              // onPress={() => navigation.navigate("ChangeLocation")}
              onPress={() => navigation.navigate("ChangeAddress", { subject: "user" })}
            >
              <Entypo name="location-pin" size={24} color={colors.gray} />
              <Text style={styles.bottomText}>Change Address</Text>
            </TouchableOpacity>
            {/* <Pressable
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Ionicons name="ellipsis-horizontal-circle-sharp" size={24} color={colors.gray} />
              <Text style={styles.bottomText}>Change Password</Text>
            </Pressable> */}
            <TouchableOpacity
              style={styles.bottomRow}
              android_ripple={{ color: colors.lightGray, borderless: true }}
              onPress={() => handleLogout()}
            >
              <MaterialCommunityIcons name="logout" size={24} color={colors.gray} />
              <Text style={styles.bottomText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161B22",
  },

  // logout: {
  //   position: "absolute",
  //   right: 20,
  //   top: 40,
  // },
  info: {
    marginVertical: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
