import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import colors from "../../../config/colors";
import { useState } from "react";
import separateCategories from "../../../utils/separateCategories";

const { height, width } = Dimensions.get("window");

const Menu = () => {
  const MenuItems = [
    {
      id: 1,
      title: "Chicken Pizza",
      category: "pizza",
      price: "600",
    },
    {
      id: 2,
      title: "Buff Momo",
      category: "momo",
      price: "110",
    },
    {
      id: 3,
      title: "Mushroom Pizza",
      category: "pizza",
      price: "500",
    },
    {
      id: 4,
      title: "Meat Lovers",
      category: "pizza",
      price: "850",
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
    {
      id: 8,
      title: "Chicken Chowmein",
      category: "chowmein",
      price: "150",
    },
  ];

  const [filteredMenu, setFilteredMenu] = useState([]);

  const separateCategories = () => {
    const mentioned = {};

    MenuItems.forEach((item) => {
      const registeredCategories = Object.keys(mentioned);
      if (registeredCategories.includes(item.category)) {
        filteredMenu[mentioned[item.category]].push(item);
      } else {
        mentioned[item.category] = filteredMenu.length;
        filteredMenu.push([item]);
      }
    });
  };
  separateCategories();

  // const filteredMenu = separateCategories(MenuItems);

  const [noOfItem, setNoOfItem] = useState(0);

  const incrementCount = () => {
    setNoOfItem((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    noOfItem >= 1 ? setNoOfItem((prevCount) => prevCount - 1) : "";
  };

  return (
    <View>
      {filteredMenu.map((item, index) => {
        return (
          <View key={index}>
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
                    <View style={styles.cart}>
                      <AntDesign
                        name="minuscircle"
                        size={24}
                        color={colors.gray}
                        onPress={() => decrementCount()}
                      />
                      <Text style={{ color: colors.gray, margin: 10, fontSize: 20 }}>
                        {noOfItem}
                      </Text>
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
          </View>
        );
      })}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {},
  menuContainer: {
    // backgroundColor: colors.gray,
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: colors.gray,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  priceCart: { alignItems: "center" },
  cart: {
    flexDirection: "row",
    alignItems: "center",
  },
});
