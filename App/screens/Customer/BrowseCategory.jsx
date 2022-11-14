import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import colors from "../../config/colors";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getDishesByCategory } from "../Restaurant/restaurantSlice";
import { Ionicons } from "@expo/vector-icons";
import { addToBasket } from "./customerSlice";
import { toggleShowSnackbar } from "../../redux/ui/uiSlice";

const { height, width } = Dimensions.get("window");

const BrowseCategory = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.restaurantSlice.categoryState);
  const dishes = useSelector((state) => state.restaurantSlice.categoryDish);

  useEffect(() => {
    dispatch(getDishesByCategory(categoryState));
  }, []);

  const handleBasket = (dishId) => {
    dispatch(addToBasket(dishId));
    dispatch(toggleShowSnackbar(true));
  };

  // const [noOfItem, setNoOfItem] = useState(0);

  // const incrementCount = () => {
  //   setNoOfItem((prevCount) => prevCount + 1);
  //   // setNoOfItem({ ...noOfItem, [id]: ++noOfItem[id] });
  // };

  // const decrementCount = () => {
  //   // console.log(noOfItem);
  //   // noOfItem[id] >= 1 ? setNoOfItem({ ...noOfItem, [id]: --noOfItem[id] }) : '';
  //   noOfItem >= 1 ? setNoOfItem((prevCount) => prevCount - 1) : "";
  // };
  return (
    <ScrollView style={styles.container}>
      {/* <Text>{categoryState}</Text> */}
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
                <Text style={{ color: colors.secondary, fontSize: 20 }}>Rs.&nbsp;{food.price}</Text>
              </View>
              <TouchableHighlight onPress={() => handleBasket(food._id)}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.secondary,
                    borderRadius: 15,
                    marginTop: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                >
                  <Ionicons name="basket" size={30} color={colors.screen} />
                  <Text style={{ color: colors.v }}>Add To Basket</Text>
                </View>
              </TouchableHighlight>
              {/* <View style={styles.cart}>
                <AntDesign
                  name="minuscircle"
                  size={24}
                  color={colors.gray}
                  onPress={() => decrementCount()}
                />
                <Text style={{ color: colors.gray, margin: 10, fontSize: 20 }}>{noOfItem}</Text>
                <AntDesign
                  name="pluscircle"
                  size={24}
                  color={colors.gray}
                  onPress={() => incrementCount()}
                />
              </View> */}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default BrowseCategory;

const styles = StyleSheet.create({
  container: { backgroundColor: colors.screen },
  menuContainer: {
    // backgroundColor: colors.gray,
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
