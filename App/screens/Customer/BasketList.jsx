import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getBasketRestaurants, setBasketRestaurantSearch } from "./customerSlice";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
const { height, width } = Dimensions.get("window");

const BasketList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const basketRestaurants = useSelector((state) => state.customerSlice.basketRestaurants);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getBasketRestaurants());
  }, [isFocused]);

  return (
    <Screen>
      <ScrollView style={styles.layout}>
        {basketRestaurants?.map((item) => {
          return (
            <TouchableWithoutFeedback
              key={item._id}
              onPress={() => {
                dispatch(setBasketRestaurantSearch(item._id));
                navigation.navigate("BasketDetail");
              }}
            >
              <View style={styles.container}>
                <View style={styles.basketItem}>
                  <Image
                    source={require("../../assets/restaurants/kfc-profile.png")}
                    style={styles.avatar}
                  />
                  <View style={styles.itemDetail}>
                    <Text style={styles.restaurantName}>{item.name}</Text>
                    <View style={styles.locationContainer}>
                      <Entypo
                        name="location-pin"
                        size={24}
                        color={colors.primary}
                        style={{ fontSize: 20 }}
                      />
                      <Text style={styles.location}>{item.address}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.itemCount}>
                  <Text style={{ fontWeight: "700" }}>x</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default BasketList;

const styles = StyleSheet.create({
  layout: {
    marginTop: 40,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  basketItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  itemDetail: {},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  restaurantName: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 19,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    color: colors.white,
  },
  itemCount: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
