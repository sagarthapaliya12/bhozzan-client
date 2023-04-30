import React, { useEffect, useState } from "react";
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
import profilePic from "../../../assets/App-Logos.png";
import thumbnail from "../../../assets/thumbnail.jpg";
import { getAllRestaurants } from "../../../screens/Restaurant/restaurantSlice";
import { setRestaurantSearch } from "../../../redux/ui/uiSlice";
import updateAddress from "../../../utils/getRestaurantListWithAddress";

const { width } = Dimensions.get("window");

const TopRestaurants = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurantSlice.restaurantList);

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  const [updatedRestaurant, setUpdatedRestaurant] = useState([]);
  useEffect(() => {
    (async () => {
      const newRestaurantList = await updateAddress(restaurants, "RestaurantsList");
      setUpdatedRestaurant(newRestaurantList);
    })();
  }, [restaurants]);

  const displayRestaurants = () => {
    return updatedRestaurant.map((item) => {
      return (
        <TouchableWithoutFeedback
          key={item._id}
          style={styles.restaurantContainer}
          onPress={() => {
            // dispatch(setSearch(item._id));
            dispatch(setRestaurantSearch(item._id));
            navigation.navigate("RestaurantProfile");
          }}
        >
          <View style={{ padding: 5 }}>
            <View style={styles.thumbnailContainer}>
              <Image
                style={styles.restaurantImage}
                source={
                  item.imageLink
                    ? {
                        uri: item.imageLink,
                      }
                    : thumbnail
                }
              />
            </View>
            <View style={styles.restaurantDetail}>
              <View style={styles.profileContainer}>
                <Image
                  style={styles.restaurantProfile}
                  source={item.profileImageLink ? { uri: item.profileImageLink } : profilePic}
                />
              </View>
              <View>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.restaurantLocation} numberOfLines={1} ellipsizeMode="tail">
                  {item.address &&
                    `${item.address.street ? `${item.address.street},` : ""} ${
                      item.address.city ? `${item.address.city},` : ""
                    } ${item.address.city}, ${item.address.subregion}, ${item.address.country}`}
                </Text>
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
    marginBottom: 60,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    margin: 10,
    marginBottom: 5,
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
    maxWidth: 270,
  },
});
