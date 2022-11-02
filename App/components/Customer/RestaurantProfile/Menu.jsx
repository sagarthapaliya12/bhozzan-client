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

  const restaurantId = useSelector((state) => state.customerSlice.searchedRestaurantId);

  const dishes = useSelector((state) => state.restaurantSlice.dishes);

  useEffect(() => {
    dispatch(getDishesByRestaurantId(restaurantId));
  }, [restaurantId]);


  const [noOfItem, setNoOfItem] = useState(0);

  const incrementCount = () => {
    setNoOfItem((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    noOfItem >= 1 ? setNoOfItem((prevCount) => prevCount - 1) : "";
  };

  return (
    <View>
      {dishes.map((item, index) => {
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
                <Text style={styles.title}>{item._id.toUpperCase()}</Text>
              </View>
            </View>
            {item.dishes.map((food) => {
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
