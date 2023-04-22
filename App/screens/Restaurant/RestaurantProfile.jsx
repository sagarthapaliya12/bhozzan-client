import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import { logout } from "../Public/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRestaurantDetails, getRestaurantUserId } from "./restaurantSlice";
import AppButton from "./../../components/AppButton";
import EditButton from "../../components/shared/EditButton";
import { useNavigation } from "@react-navigation/native";
import profilePic from "../../assets/App-Logos.png";
import thumbnail from "../../assets/thumbnail.jpg";

const { width } = Dimensions.get("window");

const RestaurantProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const restaurantId = useSelector((state) => state.restaurantSlice.restaurantUserId);
  const restaurantUser = useSelector((state) => state.restaurantSlice.restaurantUser);

  useEffect(() => {
    dispatch(getRestaurantUserId());
    dispatch(getRestaurantDetails(restaurantId));
  }, [restaurantId]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Screen>
      <SafeAreaView style={styles.container}>
        <View style={styles.info}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profilePicture}
              source={
                restaurantUser.profileImageLink
                  ? {
                      uri: restaurantUser.profileImageLink,
                    }
                  : profilePic
              }
            />
            <Image
              style={styles.thumbnailPicture}
              source={
                restaurantUser.imageLink
                  ? {
                      uri: restaurantUser.imageLink,
                    }
                  : thumbnail
              }
            />
            <View style={styles.editButton}>
              <EditButton />
            </View>
          </View>
          <Text style={styles.title}>{restaurantUser.name}</Text>
          <Text style={styles.descriptionText}>
            {restaurantUser.description ? restaurantUser.description : "---"}
          </Text>
        </View>
        <View style={styles.details}>
          <Entypo name="location-pin" size={24} color={colors.secondary} />
          <Text style={styles.normalText}>&nbsp;{restaurantUser.address}</Text>
        </View>
        <View style={styles.details}>
          <Ionicons name="call" size={24} color={colors.secondary} />
          <Text style={styles.normalText}>&nbsp;&nbsp;{restaurantUser.primaryPhoneNumber}</Text>
        </View>
        <View style={styles.details}>
          <Text style={{ color: colors.secondary }}>DELIVERY HOURS:&nbsp;</Text>
          <Text style={styles.normalText}>10:00 AM - 12:00 PM</Text>
        </View>
        <View style={styles.details}>
          <Text style={{ color: colors.secondary }}>PAN/VAT No:&nbsp;</Text>
          <Text style={styles.normalText}>{restaurantUser.PAN}</Text>
        </View>
        <View style={styles.details}>
          <Text style={{ color: colors.secondary }}>No. of Tables:&nbsp;</Text>
          <Text style={styles.normalText}>{restaurantUser.tables?.length}</Text>
        </View>

        <AppButton
          title="Scan QR Code"
          onPress={() => {
            navigation.navigate("QrScanner");
          }}
        />

        <Pressable
          style={styles.bottomRow}
          android_ripple={{ color: colors.lightGray, borderless: true }}
          onPress={() => handleLogout()}
        >
          <MaterialCommunityIcons name="logout" size={24} color={colors.gray} />
          <Text style={styles.bottomText}>Logout</Text>
        </Pressable>
      </SafeAreaView>
    </Screen>
  );
};

export default RestaurantProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    paddingHorizontal: 20,
  },
  info: {
    // alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 60,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 5,
    position: "absolute",
    zIndex: 100,
    bottom: -50,
    borderColor: colors.white,
    borderWidth: 3,
  },
  thumbnailPicture: {
    width: width - 30,
    height: 175,
    marginVertical: 5,
    borderRadius: 10,
  },
  editButton: {
    position: "absolute",
    right: 0,
    top: 15,
  },
  title: {
    fontSize: 25,
    color: colors.white,
  },
  locationText: {
    color: colors.white,
  },
  descriptionText: {
    color: colors.white,
    marginVertical: 5,
  },
  details: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  normalText: {
    fontSize: 18,
    color: colors.gray,
  },
  bottomRow: {
    width: "90%",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: colors.gray,
    borderBottomWidth: 1,
    marginTop: 20,
  },
  bottomText: {
    color: colors.gray,
    marginHorizontal: 10,
    fontSize: 18,
  },
});
