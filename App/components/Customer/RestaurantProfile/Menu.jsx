import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import colors from "../../../config/colors";
import separateCategories from "../../../utils/separateCategories";
import { getDishesByRestaurantId } from "../../../screens/Restaurant/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";

const { height, width } = Dimensions.get("window");

const Menu = () => {
  const dispatch = useDispatch();

  const restaurantId = useSelector((state) => state.restaurantSlice.search);

  const dishes = useSelector((state) => state.restaurantSlice.dishes);
  // console.log("Dishes: ", dishes);

  useEffect(() => {
    dispatch(getDishesByRestaurantId(restaurantId));
  }, []);

  const MenuItems = [
    {
      _id: 1,
      name: "Chicken Pizza",
      category: "pizza",
      price: "600",
    },
    {
      _id: 2,
      name: "Buff Momo",
      category: "momo",
      price: "110",
    },
    {
      _id: 3,
      name: "Mushroom Pizza",
      category: "pizza",
      price: "500",
    },
    {
      _id: 4,
      name: "Meat Lovers",
      category: "pizza",
      price: "850",
    },

    {
      _id: 5,
      name: "Buff C Momo",
      category: "momo",
      price: "130",
    },
    {
      _id: 6,
      name: "Veg Chowmein",
      category: "chowmein",
      price: "150",
    },
    {
      _id: 7,
      name: "Chicken Fried Momo",
      category: "momo",
      price: "150",
    },
    {
      _id: 8,
      name: "Chicken Chowmein",
      category: "chowmein",
      price: "150",
    },
  ];

  const [filteredMenu, setFilteredMenu] = useState([]);

  useEffect(() => {
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
    // if (dishes.length > 1) separateCategories();
    // if (dishes.length === 0) setFilteredMenu(dishes);
    // else if (dishes.length === 0) setFilteredMenu(dishes);
  }, [dishes]);

  // console.log("Fifjdsifm: ", filteredMenu);
  // let filteredMenu;
  // useEffect(() => {
  //   filteredMenu = separateCategories(dishes);
  // }, [dishes]);

  // console.log("nn", filteredMenu);

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
                <View key={food._id} style={styles.menuItem}>
                  <Text style={{ color: colors.gray, fontSize: 18 }}>{food.name}</Text>
                  <View style={styles.priceCart}>
                    <View>
                      <Text style={{ color: colors.secondary, fontSize: 20 }}>
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
