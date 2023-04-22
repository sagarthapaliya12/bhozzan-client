import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import bajekoSekuwaProfile from "../../assets/restaurants/bajeko-sekuwa.png";
import { getAllRestaurants } from "../../screens/Restaurant/restaurantSlice";
import { useNavigation } from "@react-navigation/native";
import { setRestaurantSearch } from "../../redux/ui/uiSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const restaurants = useSelector((state) => state.restaurantSlice.restaurantList);

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  return (
    <Screen style={styles.container}>
      <ScrollView vertical>
        {restaurants.map((restaurant) => {
          return (
            <TouchableWithoutFeedback
              key={restaurant._id}
              style={styles.restaurantContainer}
              onPress={() => {
                dispatch(setRestaurantSearch(restaurant._id));
                navigation.navigate("RestaurantProfile");
              }}
            >
              <View style={styles.mainContainer}>
                <View style={styles.restaurantDetail}>
                  <View style={styles.profileContainer}>
                    <Image style={styles.restaurantProfile} source={bajekoSekuwaProfile} />
                  </View>
                </View>
                <View>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantLocation}>{restaurant.address}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  mainContainer: {
    flexDirection: "row",
    color: colors.screen,
    paddingHorizontal: 15,
  },
  restaurantContainer: {
    backgroundColor: colors.screen,
  },
  restaurantDetail: {
    flexDirection: "column",
    paddingVertical: 15,
  },
  profileContainer: {
    backgroundColor: colors.gray,
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  restaurantProfile: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: colors.white,
  },
  restaurantName: {
    color: colors.white,
    fontSize: 18,
    marginTop: 10,
  },
  restaurantLocation: {
    color: colors.gray,
  },
});

export default AdminDashboard;
