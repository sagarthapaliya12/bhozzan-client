import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import { Entypo } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const BasketList = () => {
  const navigation = useNavigation();

  const Bakery = [
    {
      id: 1,
      restaurantName: "Markhu Bakery",
      location: "Jawalakhel, Lalitpur",
    },
    {
      id: 2,
      restaurantName: "Markhu Bakery",
      location: "Gwarko, Lalitpur",
    },
    {
      id: 3,
      restaurantName: "Markhu Bakery",
      location: "Tinkune, Kathmandu",
    },
  ];

  return (
    <Screen>
      <ScrollView>
        {Bakery.map((item) => {
          return (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() => navigation.navigate("BasketDetail")}
            >
              <View style={styles.basketItem}>
                <Image
                  source={require("../../assets/restaurants/kfc-profile.png")}
                  style={styles.avatar}
                />
                <View style={styles.itemDetail}>
                  <Text style={styles.restaurantName}>{item.restaurantName}</Text>
                  <View style={styles.locationContainer}>
                    <Entypo
                      name="location-pin"
                      size={24}
                      color={colors.primary}
                      style={{ fontSize: 20 }}
                    />
                    <Text style={styles.location}>{item.location}</Text>
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
    </Screen>
  );
};

export default BasketList;

const styles = StyleSheet.create({
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
