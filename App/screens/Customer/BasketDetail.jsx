import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import colors from "../../config/colors";
import { useState, useEffect } from "react";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getBasketDishes, removeBasketDish } from "./customerSlice";
import { placeOrder } from "../Restaurant/orderSlice";
import Screen from "../../components/Screen";
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import MessagePopUpModal from "../../components/MessagePopUpModal";
import { toggleShowMessageModal } from "../../redux/ui/uiSlice";

const { width } = Dimensions.get("window");

const BasketDetail = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [quantity, setQuantity] = useState({});
  const [subTotalToDisplay, setSubTotalToDisplay] = useState(0);

  const basketDishes = useSelector((state) => state.customerSlice.basketDishes);
  const basketRestaurant = useSelector((state) => state.customerSlice.basketRestaurantSearch);
  const status = useSelector((state) => state.orderSlice.status);

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

  const handleDelete = (dishId) => {
    dispatch(removeBasketDish(dishId));
  };

  const checkout = async () => {
    const order = basketDishes.map((item) => {
      const dish = item.dish;
      return { dishId: dish._id, restaurant: dish.restaurant, quantity: quantity[dish._id] };
    });

    try {
      const res = await dispatch(placeOrder(order)).unwrap();
      if (!res.error) dispatch(toggleShowMessageModal(true));
    } catch (err) {}
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
              <View style={styles.rightContainer}>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(dish.dish._id)}
                >
                  <MaterialIcons name="delete" size={24} color={colors.screen} />
                </TouchableOpacity>
                <View style={styles.priceCart}>
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
        <Pressable style={styles.checkoutButton} onPress={checkout}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
            Confirm Order
          </Text>
        </Pressable>
      </ScrollView>
      <MessagePopUpModal parent="BasketDetail" subject="order" />
    </Screen>
  );
};

export default BasketDetail;

const styles = StyleSheet.create({
  containerFirst: {
    backgroundColor: colors.screen,
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
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
  rightContainer: { alignItems: "flex-end", position: "relative" },
  deleteBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
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
