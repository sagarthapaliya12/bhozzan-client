import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import colors from "../../config/colors";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const BrowseCategory = () => {
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
      location: "Gwarko, Lalitpur",
      price: "500",
    },
    {
      id: 3,
      title: "Butter Cookies",
      restaurantName: "Markhu Bakery",
      location: "Tinkune, Kathmandu",
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
      location: "Kamalpokhari, Kathmandu",
      price: "130",
    },
    {
      id: 6,
      title: "Blueberry Muffin",
      restaurantName: "Markhu Bakery",
      location: "Thimi, Bhaktapur",
      price: "150",
    },
    {
      id: 7,
      title: "Vanilla Cake",
      restaurantName: "Markhu Bakery",
      location: "Sanepa, Lalitpur",
      price: "150",
    },
    {
      id: 8,
      title: "Red Muffin",
      restaurantName: "Markhu Bakery",
      location: "Sallaghari, Bhaktapur",
      price: "150",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {Bakery.map((item) => {
        return (
          <View key={item.id} style={styles.categoryItem}>
            <View style={styles.itemDetail}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.restaurantName}>{item.restaurantName}</Text>
              <View style={styles.locationContainer}>
                <Entypo
                  name="location-pin"
                  size={24}
                  color={colors.primary}
                  style={{ fontSize: 20 }}
                />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>

            <View style={styles.priceCart}>
              <View>
                <Text style={{ color: colors.primary, fontSize: 20 }}>Rs.&nbsp;{item.price}</Text>
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

  title: {
    color: colors.gray,
    paddingVertical: 2,
    fontSize: 16,
    fontWeight: "600",
    // backgroundColor: colors.gray,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // backgroundColor: "orange"
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
