import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Pressable, Text } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import { logout } from "../Public/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getUserDetails } from "../Customer/customerSlice";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.customerSlice.user);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image source={require("../../assets/Avatar.jpg")} style={styles.avatar} />
        <AppText style={{ color: "white" }}>{`${user?.firstName} ${user?.lastName}`}</AppText>

        <View style={styles.details}>
          <Ionicons name="call" size={24} color="white" />
          <AppText style={{ color: "white", marginLeft: 10 }}>{user?.phoneNumber}</AppText>
        </View>

        <View style={styles.features}>
          <Pressable
            style={styles.bottomRow}
            android_ripple={{ color: colors.lightGray, borderless: true }}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Ionicons name="ellipsis-horizontal-circle-sharp" size={24} color={colors.gray} />
            <Text style={styles.bottomText}>Change Password</Text>
          </Pressable>
          <Pressable
            style={styles.bottomRow}
            android_ripple={{ color: colors.lightGray, borderless: true }}
            onPress={() => handleLogout()}
          >
            <MaterialCommunityIcons name="logout" size={24} color={colors.gray} />
            <Text style={styles.bottomText}>Logout</Text>
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
  info: {
    marginVertical: 30,
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
  features: { width: "100%", alignItems: "center", marginTop: 30 },
  bottomRow: {
    width: "90%",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
  bottomText: {
    color: colors.gray,
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default AdminProfile;
