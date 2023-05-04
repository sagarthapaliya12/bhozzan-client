import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import colors from "../../config/colors";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getDishesByCategory } from "../Restaurant/restaurantSlice";
import Screen from "../../components/Screen";
import SnackbarMessage from "../../components/SnackbarMessage";
import AddToBasketButton from "../../components/Customer/AddToBasketButton";
import updateAddress from "../../utils/updateAddressFromList.js";

const { width } = Dimensions.get("window");

const BrowseCategory = () => {
  const dispatch = useDispatch();

  const categoryState = useSelector((state) => state.restaurantSlice.categoryState);
  const dishes = useSelector((state) => state.restaurantSlice.categoryDish);

  useEffect(() => {
    dispatch(getDishesByCategory(categoryState));
  }, []);

  const [updatedDishes, setUpdatedDishes] = useState([]);
  useEffect(() => {
    (async () => {
      const newDishList = await updateAddress(dishes, "BrowseCategory");
      setUpdatedDishes(newDishList);
    })();
  }, [dishes]);

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {updatedDishes.map((food) => {
          return (
            <View key={food._id} style={styles.categoryItem}>
              <View style={styles.itemDetail}>
                <Text style={{ color: colors.gray, fontSize: 18 }}>{food.name}</Text>
                <Text style={styles.restaurantName}>{food.restaurant.name}</Text>
                <View style={styles.locationContainer}>
                  <Entypo
                    name="location-pin"
                    size={24}
                    color={colors.primary}
                    style={{ fontSize: 20 }}
                  />
                  <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
                    {food.restaurant.address &&
                      `${
                        food.restaurant.address.street ? `${food.restaurant.address.street},` : ""
                      } ${food.restaurant.address.city ? `${food.restaurant.address.city},` : ""} ${
                        food.restaurant.address.city
                      }, ${food.restaurant.address.subregion}, ${food.restaurant.address.country}`}
                  </Text>
                </View>
              </View>
              <View style={styles.priceCart}>
                <View>
                  <Text style={{ color: colors.secondary, fontSize: 20 }}>
                    Rs.&nbsp;{food.price}
                  </Text>
                </View>
                <AddToBasketButton dishId={food._id} />
              </View>
            </View>
          );
        })}
      </ScrollView>
      <SnackbarMessage subject="customer" />
    </Screen>
  );
};

export default BrowseCategory;

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "600",
    // backgroundColor: colors.gray,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    maxWidth: 200,
  },
  priceCart: { alignItems: "center" },
  cart: {
    flexDirection: "row",
    alignItems: "center",
  },
});
