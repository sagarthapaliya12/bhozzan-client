import { View, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BrowseCategories from "../components/Customer/HomeScreen/BrowseCategories";
import colors from "../config/colors";
import socket from "../utils/socket";
import React, { useEffect } from "react";
import TopRestaurants from "../components/Customer/HomeScreen/TopRestaurants";
import LocalCusines from "../components/Customer/HomeScreen/LocalCusines";
import { useDispatch } from "react-redux";
import { getAllDishes } from "./Restaurant/restaurantSlice";
import SearchBar from "./../components/Customer/HomeScreen/SearchBar";
import TopDishes from "../components/Customer/HomeScreen/TopDishes";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDishes());
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar />
        <BrowseCategories onPress={() => navigation.navigate("BrowseCategory")} />
        <LocalCusines />
        <TopRestaurants />
        <TopDishes />
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
