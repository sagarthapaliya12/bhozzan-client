import { View, Text, StyleSheet, TouchableHighlight, Dimensions, ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import colors from "../../config/colors";
import separateCategories from "../../utils/separateCategories";
import Screen from "./../../components/Screen";

const { height, width } = Dimensions.get("window");

const MenuItems = [
  {
    id: 1,
    title: "Chicken Pizza",
    category: "pizza",
    price: "600",
  },
  {
    id: 2,
    title: "Mushroom Pizza",
    category: "pizza",
    price: "500",
  },
  {
    id: 3,
    title: "Meat Lovers",
    category: "pizza",
    price: "850",
  },
  {
    id: 4,
    title: "Buff Momo",
    category: "momo",
    price: "110",
  },
  {
    id: 5,
    title: "Buff C Momo",
    category: "momo",
    price: "130",
  },
  {
    id: 6,
    title: "Veg Chowmein",
    category: "chowmein",
    price: "150",
  },
  {
    id: 7,
    title: "Chicken Fried Momo",
    category: "momo",
    price: "150",
  },
];

const filteredMenu = separateCategories(MenuItems);

const Menu = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {filteredMenu.map((item, index) => {
        return (
          <View key={index} style={{ marginBottom: 40 }}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  backgroundColor: colors.gray,
                  height: 2,
                  width: width,
                  position: "absolute",
                  top: 16,
                }}
              />
              <View style={styles.menuContainer}>
                <Text style={styles.title}>{item[0].category.toUpperCase()}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableHighlight
                  style={styles.editButton}
                  onPress={() => navigation.navigate("EditMenu")}
                >
                  <Entypo name="edit" size={24} color={colors.screen} />
                </TouchableHighlight>
              </View>
            </View>
            {item.map((food) => {
              return (
                <View key={food.id} style={styles.menuItem}>
                  <Text style={{ color: colors.gray, fontSize: 18 }}>{food.title}</Text>
                  <View style={styles.priceCart}>
                    <View>
                      <Text style={{ color: colors.primary, fontSize: 20 }}>
                        Rs.&nbsp;{food.price}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}
      <View style={styles.addMenu}>
        <TouchableHighlight style={styles.addButton} onPress={() => navigation.navigate("AddMenu")}>
          <Ionicons name="add" size={30} color={colors.screen} />
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  menuContainer: {
    // backgroundColor: colors.screen,
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: colors.gray,
  },
  editButton: {
    backgroundColor: colors.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addMenu: {
    // alignItems: "right",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  addButton: {
    backgroundColor: colors.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: colors.black,
  },
  priceCart: { alignItems: "center" },
});
