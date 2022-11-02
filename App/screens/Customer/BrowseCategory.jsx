import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import colors from "../../config/colors";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getDishesByCategory } from "../Restaurant/restaurantSlice";

const { height, width } = Dimensions.get("window");

const BrowseCategory = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.restaurantSlice.categoryState);
  const dishes = useSelector((state) => state.restaurantSlice.categoryDish);

  useEffect(() => {
    dispatch(getDishesByCategory(categoryState));
  }, []);

  const Bakery = [
    {
      id: 1,
      title: "Cheese Cake",
      restaurantName: "Markhu Bakery",
      location: "Jawalakhel, Lalitpur",
      price: "600",
    },
    {
      id: 2,
      title: "Pastry",
      restaurantName: "Markhu Bakery",
      location: "Jawalakhel, Lalitpur",
      price: "500",
    },
    {
      id: 3,
      title: "Butter Cookies",
      restaurantName: "Markhu Bakery",
      location: "Jawalakhel, Lalitpur",
      price: "850",
    },
    {
      id: 4,
      title: "Croissant",
      restaurantName: "Markhu Bakery",
      location: "Jawalakhel, Lalitpur",
      price: "110",
    },
    {
      id: 5,
      title: "Cream Pie",
      restaurantName: "Markhu Bakery",
      location: "Jawalakhel, Lalitpur",
      price: "130",
    },
    {
      id: 6,
      title: "Blueberry Muffin",
      restaurantName: "Markhu Bakery",
      location: "Jawalakhel, Lalitpur",
      price: "150",
    },
    {
      id: 7,
      title: "Vanilla Cake",
      restaurantName: "Markhu Bakery",
      location: "Jawalakhel, Lalitpur",
      price: "150",
    },
    {
      id: 8,
      title: "Red Muffin",
      restaurantName: "Markhu Bakery",
      location: "Jawalakhel, Lalitpur",
      price: "150",
    },
  ];

  const [noOfItem, setNoOfItem] = useState(0);

  const incrementCount = () => {
    setNoOfItem((prevCount) => prevCount + 1);
    // setNoOfItem({ ...noOfItem, [id]: ++noOfItem[id] });
  };

  const decrementCount = () => {
    // console.log(noOfItem);
    // noOfItem[id] >= 1 ? setNoOfItem({ ...noOfItem, [id]: --noOfItem[id] }) : '';
    noOfItem >= 1 ? setNoOfItem((prevCount) => prevCount - 1) : "";
  };
  return (
    <ScrollView style={styles.container}>
      <Text>{categoryState}</Text>
      {dishes.map((item) => {
        return (
          <View key={item._id} style={styles.categoryItem}>
            <View style={styles.itemDetail}>
              <Text style={{ color: colors.gray, fontSize: 18 }}>{item.name}</Text>
              <Text style={styles.restaurantName}>test{item.restaurantName}</Text>
              <View style={styles.locationContainer}>
                <Entypo
                  name="location-pin"
                  size={24}
                  color={colors.primary}
                  style={{ fontSize: 20 }}
                />
                <Text style={styles.location}>test{item.location}</Text>
              </View>
            </View>
            <View style={styles.priceCart}>
              <View>
                <Text style={{ color: colors.primary, fontSize: 20 }}>Rs.&nbsp;{item.price}</Text>
              </View>
              <View style={styles.cart}>
                <AntDesign
                  name="minuscircle"
                  size={24}
                  color={colors.gray}
                  onPress={() => decrementCount()}
                />
                <Text style={{ color: colors.gray, margin: 10, fontSize: 20 }}>{noOfItem}</Text>
                <AntDesign
                  name="pluscircle"
                  size={24}
                  color={colors.gray}
                  onPress={() => incrementCount()}
                />
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default BrowseCategory;

const styles = StyleSheet.create({
  container: { backgroundColor: colors.screen },
  menuContainer: {
    // backgroundColor: colors.gray,
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "600",
    // backgroundColor: colors.gray,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemDetail: {
    // color: colors.white,
  },
  restaurantName: {
    color: colors.white,
    fontWeight: "600",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    color: colors.white,
  },
  priceCart: { alignItems: "center" },
  cart: {
    flexDirection: "row",
    alignItems: "center",
  },
});
