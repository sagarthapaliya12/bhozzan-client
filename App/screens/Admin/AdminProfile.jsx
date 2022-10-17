import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import ListItem from "../../components/ListItem";
import { logout } from "../Public/authSlice";
import { useDispatch } from "react-redux";

const AdminProfile = ({ navigation }) => {
  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={() => handleLogout()}>
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

export default AdminProfile;
