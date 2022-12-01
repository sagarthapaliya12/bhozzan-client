import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import React, { useEffect } from "react";
import colors from "../../../config/colors";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getTodays } from "../../../screens/Customer/customerSlice";

const { height, width } = Dimensions.get("window");

const TopDishes = () => {
  const dispatch = useDispatch();

  const todays = useSelector((state) => state.customerSlice.todaysDishes);

  // console.log("jnjn", todays);

  useEffect(() => {
    dispatch(getTodays());
  }, []);

  return (
    <View style={styles.container}>
      {/* {todays?.map((item, index) => {
        return (
          <View
            key={item.dish._id}
            style={styles.categoryItem}
          >
            <View style={styles.itemDetail}>
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
                  Rs.&nbsp;{item.dish[0].price}
                </Text>
              </View>
            </View>
          </View>
        );
      })} */}
    </View>
  );
};

export default TopDishes;

const styles = StyleSheet.create({
  container: { backgroundColor: colors.screen },

  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    margin: 10,
    marginBottom: 5,
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
