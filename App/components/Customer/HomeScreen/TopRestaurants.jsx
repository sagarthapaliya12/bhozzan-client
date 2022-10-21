import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import colors from "../../../config/colors";
import kfcRestaurantThumbnail from "../../../assets/restaurants/kfc.jpg";
import kfcRestaurantProfile from "../../../assets/restaurants/kfc-profile.png";
import everestArirangKoreanRestaurantThumbnail from "../../../assets/restaurants/everest-arirang-korean-restaurant.jpg";
import everestArirangKoreanRestaurant from "../../../assets/restaurants/kfc-profile.png";
import { getAllRestaurants, setSearch } from "../../../screens/Restaurant/restaurantSlice";

const { height, width } = Dimensions.get("window");

const Restaurants = [
  {
    id: 1,
    name: "KFC Restaurant",
    location: "Durbarmarg",
    thumbnail: kfcRestaurantThumbnail,
    profile: kfcRestaurantProfile,
  },
  {
    id: 2,
    name: "Everest Korean Restaurant",
    location: "Jhamsikhel",
    thumbnail: everestArirangKoreanRestaurantThumbnail,
    profile: everestArirangKoreanRestaurant,
  },
  {
    id: 3,
    name: "KFC Restaurant",
    location: "Durbarmarg",
    thumbnail: kfcRestaurantThumbnail,
    profile: kfcRestaurantProfile,
  },
];

const TopRestaurants = ({ onPress }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurantSlice.restaurantList);

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  const displayRestaurants = () => {
    return restaurants.map((item) => {
      return (
        <TouchableWithoutFeedback
          key={item._id}
          style={styles.restaurantContainer}
          onPress={() => {
            dispatch(setSearch(item._id))
            navigation.navigate("RestaurantProfile");
          }}
        >
          <View>
            <View style={styles.thumbnailContainer}>
              <Image style={styles.restaurantImage} source={kfcRestaurantThumbnail} />
            </View>
            <View style={styles.restaurantDetail}>
              <View style={styles.profileContainer}>
                <Image style={styles.restaurantProfile} source={kfcRestaurantProfile} />
              </View>
              <View>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.restaurantLocation}>{item.address}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Restaurants</Text>
      <ScrollView horizontal>{displayRestaurants()}</ScrollView>
    </View>
  );
};

export default TopRestaurants;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    margin: 10,
    marginBottom: 20,
  },
  restaurantContainer: {
    marginHorizontal: 20,
    backgroundColor: colors.darkGray,
  },
  thumbnailContainer: {
    width: width - 40,
    height: 200,
    marginTop: 20,
  },
  restaurantImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 5,
    borderWidth: 1,
  },
  profileContainer: {
    backgroundColor: colors.gray,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  restaurantDetail: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  restaurantProfile: {
    width: 50,
    height: 50,
  },
  restaurantName: {
    color: colors.white,
    fontSize: 20,
  },
  restaurantLocation: {
    color: colors.gray,
  },
});
