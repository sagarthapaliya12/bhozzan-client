import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import colors from "../../config/colors";
import { useState } from "react";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBasketDishes } from "./customerSlice";
import SubmitButton from "../../components/forms/SubmitButton";
import Form from "../../components/forms/Form";
import Screen from "../../components/Screen";
import { useIsFocused } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const BasketDetail = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [quantity, setQuantity] = useState({});
  const [subTotalToDisplay, setSubTotalToDisplay] = useState(0);

  const basketDishes = useSelector((state) => state.customerSlice.basketDishes);
  const basketRestaurant = useSelector((state) => state.customerSlice.basketRestaurantSearch);

  useEffect(() => {
    dispatch(getBasketDishes(basketRestaurant));
  }, [isFocused]);

  useEffect(() => {
    let quan = {};
    basketDishes.map((dish) => {
      quan = { ...quan, [dish.dish._id]: 1 };
    });
    setQuantity(quan);
  }, [basketDishes]);

  useEffect(() => {
    updateTotal();
  }, [quantity]);

  const updateCountOnCart = (id) => {
    const itemToUpdate = basketDishes.find((item) => item.dish._id === id);
    itemToUpdate.quantity = quantity[id];
  };

  const updateTotal = () => {
    // const selectedItems = basketDishes.filter((item) => item.selection);
    let subTotal = 0;
    basketDishes.forEach((item) => {
      subTotal += quantity[item.dish._id] * item.dish.price;
    });
    setSubTotalToDisplay(subTotal);
  };

  const incrementCount = (id) => {
    if (quantity[id] < 10) {
      setQuantity({ ...quantity, [id]: ++quantity[id] });
      updateCountOnCart(id);
      updateTotal();
    }
  };

  const decrementCount = (id) => {
    if (quantity[id] > 1) {
      setQuantity({ ...quantity, [id]: --quantity[id] });
      updateCountOnCart(id);
      updateTotal();
    }
  };

  const checkout = () => {
    // console.log("sdsdsd", basketDishes);
    // let item = [];
    // let item;

    basketDishes.forEach((foodDetail, index) => {
      let { category, name, __v, price, ...item } = foodDetail.dish;
      item = { ...item, dishId: foodDetail.dish._id };

      console.log("Gigg: ", item);
    });
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {basketDishes.map((dish) => {
          return (
            <View key={dish.dish._id} style={styles.categoryItem}>
              <View style={styles.itemDetail}>
                <Text style={{ color: colors.gray, fontSize: 18 }}>{dish.dish.name}</Text>
                <View style={styles.cart}>
                  <AntDesign
                    name="minuscircle"
                    size={24}
                    color={colors.gray}
                    onPress={() => decrementCount(dish.dish._id)}
                  />
                  <Text style={{ color: colors.gray, margin: 10, fontSize: 20 }}>
                    {quantity[dish.dish._id]}
                  </Text>
                  <AntDesign
                    name="pluscircle"
                    size={24}
                    color={colors.gray}
                    onPress={() => incrementCount(dish.dish._id)}
                  />
                </View>
              </View>
              <View style={styles.priceCart}>
                <View>
                  <Text style={{ color: colors.secondary, fontSize: 20 }}>
                    Rs.&nbsp;{quantity[dish.dish._id] * dish.dish.price}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
        <Divider style={{ backgroundColor: colors.secondary, height: 2 }} />
        <View style={styles.displayTotal}>
          <Text style={{ color: colors.white, fontWeight: "600", fontSize: 30 }}>Total:</Text>
          <Text style={{ color: colors.secondary, fontWeight: "600", fontSize: 30 }}>
            {subTotalToDisplay}
          </Text>
        </View>
        {/* 
      <Form onSubmit={checkout}>
        <SubmitButton title="Confirm Order" />
      </Form> */}
        <Pressable style={styles.checkoutButton} onPress={checkout}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
            Confirm Order
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
};

export default BasketDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    width: width,
    paddingHorizontal: 20,
  },
  menuContainer: {
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "600",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 10,
  },
  itemDetail: {},
  restaurantName: {
    color: colors.white,
    fontWeight: "600",
  },
  priceCart: { alignItems: "center" },
  cart: {
    flexDirection: "row",
    alignItems: "center",
  },
  displayTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  checkoutButton: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },
});
