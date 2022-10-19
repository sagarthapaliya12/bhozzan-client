import { View, StyleSheet, ScrollView } from "react-native";

import BrowseCategories from "../components/Customer/HomeScreen/BrowseCategories";
import colors from "../config/colors";
import React, { useEffect } from "react";
import TopRestaurants from "../components/Customer/HomeScreen/TopRestaurants";
import LocalCusines from "../components/Customer/HomeScreen/LocalCusines";
import { useDispatch } from "react-redux";
import { getAllDishes } from "./Restaurant/restaurantSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDishes());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <BrowseCategories onPress={() => navigation.navigate("BrowseCategory")} />
        <LocalCusines />
        <TopRestaurants onPress={() => navigation.navigate("RestaurantProfile")} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
  },
});
