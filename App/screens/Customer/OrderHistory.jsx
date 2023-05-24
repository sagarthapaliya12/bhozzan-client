import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../config/colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory, setOrderHistoryDetail } from "../Restaurant/orderSlice";
import Screen from "../../components/Screen";
import { TouchableHighlight } from "react-native-gesture-handler";
import StatusStateEnum from "../../enums/statusEnum";
import Loading from "../../components/Loading/Loading";
import updateAddress from "../../utils/updateAddressFromList.js";

const { height, width } = Dimensions.get("window");

const OrderHistoryList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { orderHistories, status } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, []);

  const [updatedOrderHistories, setUpdatedOrderHistories] = useState([]);
  useEffect(() => {
    (async () => {
      const newOrderHistoryList = await updateAddress(orderHistories, "RestaurantsList");
      setUpdatedOrderHistories(newOrderHistoryList);
    })();
  }, [orderHistories]);

  if (status === StatusStateEnum.LOADING)
    return (
      <Screen>
        <Loading />
      </Screen>
    );

  return (
    <Screen>
      <ScrollView>
        {updatedOrderHistories?.map((item) => {
          return (
            <TouchableHighlight
              key={item._id}
              onPress={() => {
                dispatch(setOrderHistoryDetail(item));
                navigation.navigate("OrderHistoryDetail");
              }}
            >
              <View style={styles.categoryItem}>
                <View style={styles.itemDetail}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>Order #{item._id.slice(4, 9)} | </Text>
                    <Text style={styles.location}>{new Date(item.createdAt).toDateString()}</Text>
                  </View>
                  <Text style={styles.restaurantName}>{item.restaurant.name}</Text>
                  <View style={styles.locationContainer}>
                    <Text style={{ color: colors.lightGray, fontSize: 15, fontWeight: "700" }}>
                      Delivery Location:
                    </Text>
                    <View style={styles.locationMain}>
                      <Entypo
                        name="location-pin"
                        size={24}
                        color={colors.primary}
                        style={{ fontSize: 20 }}
                      />
                      <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
                        {item.address &&
                          `${item.address.street ? `${item.address.street},` : ""} ${
                            item.address.city ? `${item.address.city},` : ""
                          } ${item.address.city}, ${item.address.subregion}, ${
                            item.address.country
                          }`}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>
                      {item.status === "otw"
                        ? "On The Way"
                        : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.priceCart}>
                  <View>
                    <Text style={{ color: colors.secondary, fontSize: 20 }}>
                      Rs.&nbsp;{item.totalPrice}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default OrderHistoryList;

const styles = StyleSheet.create({
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
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
  restaurantName: {
    color: colors.white,
    fontWeight: "600",
  },
  locationContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    marginVertical: 4,
  },
  locationMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    color: colors.white,
    maxWidth: 200,
  },
  priceCart: { alignItems: "center" },
  cart: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginTop: 10,
    width: 100,
    alignItems: "center",
  },
  statusText: {
    color: colors.screen,
    fontWeight: "700",
  },
});
