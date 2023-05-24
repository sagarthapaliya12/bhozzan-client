import { View, Text, StyleSheet, ScrollView, Image, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasketCount,
  getBasketDishes,
  getBasketRestaurants,
  setBasketRestaurantSearch,
} from "./customerSlice";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import EmptyBasket from "../../components/Customer/EmptyBasket";
import updateAddress from "../../utils/updateAddressFromList.js";
import profilePic from "../../assets/App-Logos.png";

const BasketList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const basketRestaurants = useSelector((state) => state.customerSlice.basketRestaurants);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getBasketRestaurants());
    dispatch(getBasketCount());
  }, [isFocused]);

  const [updatedBasketList, setUpdatedBasketList] = useState([]);
  useEffect(() => {
    (async () => {
      const newBasketList = await updateAddress(basketRestaurants, "RestaurantsList");
      setUpdatedBasketList(newBasketList);
    })();
  }, [basketRestaurants]);

  if (updatedBasketList?.length === 0) return <EmptyBasket />;

  return (
    <Screen>
      <ScrollView style={styles.layout}>
        {updatedBasketList?.map((item) => {
          return (
            <TouchableWithoutFeedback
              key={item._id}
              onPress={async () => {
                dispatch(setBasketRestaurantSearch(item._id));
                await dispatch(getBasketDishes(item._id)).unwrap();
                navigation.navigate("BasketDetail");
              }}
            >
              <View style={styles.container}>
                <View style={styles.basketItem}>
                  <Image
                    source={item.profileImageLink ? { uri: item.profileImageLink } : profilePic}
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
                </View>
                <View style={styles.itemCount}>
                  <Text style={{ fontWeight: "700" }}>{item.count}</Text>
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
    maxWidth: 270,
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
