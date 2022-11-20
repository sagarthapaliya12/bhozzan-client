import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React, { useEffect } from "react";
import colors from "../../config/colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../Restaurant/orderSlice";

const { height, width } = Dimensions.get("window");

const OrderHistoryList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const orderHistories = useSelector((state) => state.orderSlice.orderHistories);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, []);

  return (
    <ScrollView style={styles.container}>
      {orderHistories?.map((item) => {
        return (
          <View key={item._id} style={styles.categoryItem}>
            <View style={styles.itemDetail}>
              <Text style={styles.title}>Order #{item._id.slice(4, 9)}</Text>
              <Text style={styles.restaurantName}>{item.restaurant[0].name}</Text>
              <View style={styles.locationContainer}>
                <Entypo
                  name="location-pin"
                  size={24}
                  color={colors.primary}
                  style={{ fontSize: 20 }}
                />
                <Text style={styles.location}>{item.restaurant[0].address}</Text>
              </View>
            </View>

            <View style={styles.priceCart}>
              <View>
                <Text style={{ color: colors.primary, fontSize: 20 }}>
                  Rs.&nbsp;{item.totalPrice}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default OrderHistoryList;

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
