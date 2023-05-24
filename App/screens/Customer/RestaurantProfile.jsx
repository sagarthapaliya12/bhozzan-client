import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Linking,
} from "react-native";
import { Entypo, Ionicons, MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import profilePic from "../../assets/App-Logos.png";
import Menu from "../../components/Customer/RestaurantProfile/Menu";
import { getRestaurantDetails } from "../Customer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFavoriteRestaurant } from "./customerSlice";
import SnackbarMessage from "../../components/SnackbarMessage";
import { toggleShowSnackbar } from "../../redux/ui/uiSlice";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import thumbnail from "../../assets/thumbnail.jpg";
import Rating from "../../components/Customer/Rating";
import { getRestaurantRating } from "../Restaurant/restaurantSlice";

const { width } = Dimensions.get("window");

const ActionItems = [
  {
    id: 1,
    icon: <Ionicons name="call" size={30} color="black" />,
  },
  {
    id: 2,
    icon: <MaterialIcons name="favorite" size={30} color="black" />,
  },
  {
    id: 3,
    icon: <Ionicons name="chatbox-ellipses-sharp" size={30} color="black" />,
  },
  {
    id: 4,
    icon: <AntDesign name="sharealt" size={30} color="black" />,
  },
];

const RestaurantProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const restaurantId = useSelector((state) => state.uiSlice.restaurantIdSearch);
  const restaurantDetail = useSelector((state) => state.customerSlice.searchedRestaurantInfo);

  useEffect(() => {
    dispatch(getRestaurantDetails(restaurantId));
    dispatch(getRestaurantRating(restaurantId));
  }, []);

  const [markerAddress, setMarkerAddress] = useState({});
  useEffect(() => {
    if (restaurantDetail.address) {
      (async () => {
        const address = await Location.reverseGeocodeAsync(restaurantDetail.address);
        setMarkerAddress(address[0]);
      })();
    }
  }, [restaurantDetail.address]);

  const handleFeatures = (index) => {
    index === 1 && Linking.openURL(`tel:${restaurantDetail.primaryPhoneNumber}`); //only works for android
    index === 2 && addFavourite();
    index === 3 && Linking.openURL(`sms:${restaurantDetail.primaryPhoneNumber}`); //only works for android
    index === 4 &&
      Linking.openURL(`https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley`);
  };

  const addFavourite = () => {
    try {
      dispatch(addFavoriteRestaurant(restaurantId));
      dispatch(toggleShowSnackbar(true));
    } catch (err) {}
    // dispatch(toggleShowSnackbar(false));
  };

  return (
    <Screen>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={{ position: "relative", alignItems: "center", marginBottom: 30 }}>
            <Image
              style={styles.thumbnailPicture}
              source={
                restaurantDetail.imageLink
                  ? {
                      uri: restaurantDetail.imageLink,
                    }
                  : thumbnail
              }
            />
            <Image
              style={styles.profilePicture}
              source={
                restaurantDetail.profileImageLink
                  ? { uri: restaurantDetail.profileImageLink }
                  : profilePic
              }
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{restaurantDetail.name}</Text>
            <View style={styles.location}>
              <Entypo name="location-pin" size={24} color={colors.gray} />
              <Text style={styles.locationText}>{`${
                markerAddress.street ? `${markerAddress.street},` : ""
              } ${markerAddress.city ? `${markerAddress.city},` : ""} ${markerAddress.city}, ${
                markerAddress.subregion
              }, ${markerAddress.country}`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
              <FontAwesome name="star" size={24} color={colors.secondary} />
              <Text
                style={{ color: colors.secondary, fontSize: 20, marginLeft: 8 }}
              >{`4.5 / 5`}</Text>
            </View>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation...
            </Text>
          </View>

          <View style={styles.actions}>
            {ActionItems.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.iconContainer}
                  onPress={() => handleFeatures(item.id)}
                >
                  {item.icon}
                </TouchableOpacity>
              );
            })}
          </View>

          <Rating />

          <TouchableHighlight onPress={() => navigation.navigate("RestaurantTables")}>
            <View style={styles.reservationBtn}>
              <AntDesign name="calendar" size={24} color="black" />
              <Text style={styles.reservationText}>Make Reservation</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.delivery}>
            <Text style={{ color: "green" }}>DELIVERY HOURS</Text>
            <Text style={{ color: colors.white }}>10:00 AM -12:00 PM</Text>
          </View>

          <View>
            <Menu />
          </View>
        </SafeAreaView>
      </ScrollView>
      <SnackbarMessage subject="customer" />
    </Screen>
  );
};

export default RestaurantProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.screen,
    flex: 1,
  },
  profilePicture: {
    position: "absolute",
    bottom: -30,
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 15,
    marginBottom: 5,
    borderWidth: 3,
    borderColor: colors.gray,
  },
  thumbnailPicture: {
    width: width - 30,
    height: 175,
    marginVertical: 5,
    borderRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.secondary,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: colors.gray,
    textAlign: "center",
  },
  descriptionText: {
    marginTop: 8,
    color: colors.white,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width,
    marginTop: 15,
  },
  iconContainer: {
    backgroundColor: colors.gray,
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
  },
  delivery: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  reservationBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 19,
    flexDirection: "row",
  },
  reservationText: {
    fontSize: 18,
    marginLeft: 5,
  },
});
