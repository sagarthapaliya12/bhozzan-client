import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import colors from "../../../config/colors";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getTodays } from "../../../screens/Customer/customerSlice";

const { height, width } = Dimensions.get("window");

const TopDishes = () => {
  const dispatch = useDispatch();

  const todays = useSelector((state) => state.customerSlice.todaysDishes);

  // console.log("jnjn", todays.dish);

  useEffect(() => {
    dispatch(getTodays());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Dishes</Text>

      <View style={styles.mainContainer}>
        {todays?.map((item, index) => {
          return (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.itemDetail}>
                <Text style={styles.dishName}>{item.dish[0].name}</Text>
                <Text style={styles.restaurantName}>{item.restaurant[0].name}</Text>
                {/* <View style={styles.locationContainer}>
                  <Entypo
                    name="location-pin"
                    size={24}
                    color={colors.primary}
                    style={{ fontSize: 20 }}
                  />
                  <Text style={styles.location}>{item.restaurant[0].address}</Text>
                </View> */}
              </View>

              <View style={styles.priceCart}>
                <View>
                  <Text style={{ color: colors.secondary, fontSize: 20 }}>
                    Rs.&nbsp;{item.dish[0].price}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.addToBasketbtn}
                onPress={() => console.log("Dish Id:", item.dish[0]._id)}
              >
                <Text style={styles.addToBasketText}>Add to Basket</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TopDishes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    marginBottom: 35,
    paddingHorizontal: 10,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    // margin: 10,
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width / 2.4,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 7,
    margin: 10,
    flexDirection: "column",
    elevation: 2,
    shadowColor: colors.lightGray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  mainContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemDetail: {
    alignItems: "center",
  },
  dishName: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  restaurantName: {
    color: colors.gray,
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
  addToBasketbtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 25,
    marginTop: 10,
  },
  addToBasketText: {
    color: colors.screen,
    fontWeight: "700",
  },
});
