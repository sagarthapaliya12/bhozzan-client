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
import Constants from 'expo-constants';

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
    <View style={styles.container}>
      <ScrollView>
        {basketRestaurants.map((item) => {
          return (
            <TouchableWithoutFeedback
              key={item._id}
              onPress={() => {
                dispatch(setBasketRestaurantSearch(item._id));
                navigation.navigate("BasketDetail");
              }}
            >
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
                {/* <View style={{ height: 5, backgroundColor: colors.gray }}>
                  <Divider style={{ backgroundColor: colors.gray, height: 1, zIndex: 1000 }} />
                </View> */}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default BasketList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
    paddingTop: Constants.statusBarHeight, 
  },
  basketItem: {
    flexDirection: "row",
    alignItems: "center",
    width: width,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  itemDetail: {
    // color: colors.white,
  },
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
  cart: {
    flexDirection: "row",
    alignItems: "center",
  },
});
