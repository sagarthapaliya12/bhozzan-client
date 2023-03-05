import {
  View,
  Text,
  StyleSheet,
  // TouchableOpacity,
  // TouchableHighlight,
  Dimensions,
  ScrollView,
} from "react-native";
import { useEffect } from "react";
import colors from "../../config/colors";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getDishesByCategory } from "../Restaurant/restaurantSlice";
import Screen from "../../components/Screen";
import SnackbarMessage from "../../components/SnackbarMessage";
import AddToBasketButton from "../../components/Customer/AddToBasketButton";

const { height, width } = Dimensions.get("window");

const BrowseCategory = () => {
  const dispatch = useDispatch();

  const categoryState = useSelector((state) => state.restaurantSlice.categoryState);
  const dishes = useSelector((state) => state.restaurantSlice.categoryDish);

  useEffect(() => {
    dispatch(getDishesByCategory(categoryState));
  }, []);

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {dishes.map((food) => {
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
                  <Text style={styles.location}>{food.restaurant.address}</Text>
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
  },
  priceCart: { alignItems: "center" },
  cart: {
    flexDirection: "row",
    alignItems: "center",
  },
});
