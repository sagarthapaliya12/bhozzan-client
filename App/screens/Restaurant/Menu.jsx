import { View, Text, StyleSheet, TouchableHighlight, Dimensions, ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import Constants from "expo-constants";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantUserId, getDishesByRestaurantId, setDishToUpdate } from "./restaurantSlice";
import { useIsFocused } from "@react-navigation/native";
import SnackbarMessage from "../../components/SnackbarMessage";

const { height, width } = Dimensions.get("window");

const Menu = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const restaurantId = useSelector((state) => state.restaurantSlice.restaurantUserId);
  const dishes = useSelector((state) => state.restaurantSlice.dishes);

  useEffect(() => {
    dispatch(getRestaurantUserId());
    dispatch(getDishesByRestaurantId(restaurantId));
  }, [restaurantId, isFocused]);

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {dishes?.map((item, index) => {
          return (
            <View key={index} style={{ marginBottom: 40 }}>
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    backgroundColor: colors.gray,
                    height: 2,
                    width: width,
                    position: "absolute",
                    top: 16,
                  }}
                />
                <View style={styles.menuContainer}>
                  <Text style={styles.title}>{item._id.toUpperCase()}</Text>
                </View>
              </View>
              {item.dishes.map((food) => {
                return (
                  <View key={food._id} style={styles.menuItem}>
                    <Text style={{ color: colors.gray, fontSize: 18 }}>{food.name}</Text>
                    <View style={styles.priceCart}>
                      <View>
                        <Text style={{ color: colors.primary, fontSize: 20 }}>
                          Rs.&nbsp;{food.price}
                        </Text>
                      </View>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <TouchableHighlight
                        style={styles.editButton}
                        onPress={() => {
                          dispatch(setDishToUpdate(food));
                          navigation.navigate("EditMenu");
                        }}
                      >
                        <Entypo name="edit" size={15} color={colors.screen} />
                      </TouchableHighlight>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.addMenu}>
        <TouchableHighlight style={styles.addButton} onPress={() => navigation.navigate("AddMenu")}>
          <Ionicons name="add" size={30} color={colors.screen} />
        </TouchableHighlight>
      </View>
      <SnackbarMessage subject="restaurant" />
    </Screen>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screen,
    paddingTop: Constants.statusBarHeight,
    height: height,
  },
  menuContainer: {
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: colors.gray,
  },
  editButton: {
    backgroundColor: colors.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addMenu: {
    position: "absolute",
    flex: 1,
    right: 10,
    bottom: 15,
  },
  addButton: {
    backgroundColor: colors.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  priceCart: { alignItems: "center" },
});
