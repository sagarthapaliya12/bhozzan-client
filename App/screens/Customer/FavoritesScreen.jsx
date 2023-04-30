import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from "react-native";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import { getFavoriteRestaurant, removeFavoriteRestaurant, setSearch } from "./customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import profilePic from "../../assets/App-Logos.png";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import updateAddress from "../../utils/getRestaurantListWithAddress";

const { width } = Dimensions.get("window");

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const favouriteRestaurant = useSelector((state) => state.customerSlice.favoriteRestaurants);

  useEffect(() => {
    dispatch(getFavoriteRestaurant());
  }, []);

  const handleDelete = (restaurantId) => {
    dispatch(removeFavoriteRestaurant(restaurantId));
  };

  const [updatedFavoriteRestaurant, setUpdatedFavoriteRestaurant] = useState([]);
  useEffect(() => {
    (async () => {
      const newFavoriteRestaurantList = await updateAddress(favouriteRestaurant, "RestaurantsList");
      setUpdatedFavoriteRestaurant(newFavoriteRestaurantList);
    })();
  }, [favouriteRestaurant]);

  return (
    <Screen>
      <ScrollView>
        {updatedFavoriteRestaurant?.map((restaurant) => {
          return (
            <TouchableHighlight
              key={restaurant._id}
              onPress={() => {
                dispatch(setSearch(restaurant._id));
                navigation.navigate("RestaurantProfile");
              }}
            >
              <View style={styles.container}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={styles.restaurantImg}
                    source={
                      restaurant.profileImageLink
                        ? { uri: restaurant.profileImageLink }
                        : profilePic
                    }
                  />
                  <View style={styles.itemDetail}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Entypo name="location-pin" size={20} color={colors.primary} />
                      <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
                        {restaurant.address &&
                          `${restaurant.address.street ? `${restaurant.address.street},` : ""} ${
                            restaurant.address.city ? `${restaurant.address.city},` : ""
                          } ${restaurant.address.city}, ${restaurant.address.subregion}, ${
                            restaurant.address.country
                          }`}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableHighlight
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(restaurant._id)}
                >
                  <MaterialIcons name="delete" size={24} color={colors.screen} />
                </TouchableHighlight>
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray,
  },
  restaurantImg: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  restaurantName: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 22,
  },
  address: {
    color: colors.gray,
    maxWidth: 270,
  },
  deleteBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
