import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableHighlight } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTablesByRestaurant } from "../../redux/table/tableSlice";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import { getRestaurantUserId } from "./restaurantSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const TableList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const restaurantId = useSelector((state) => state.restaurantSlice.restaurantUserId);
  const tableList = useSelector((state) => state.tableSlice.tableList);

  useEffect(() => {
    dispatch(getRestaurantUserId());
  }, []);

  useEffect(() => {
    dispatch(getTablesByRestaurant(restaurantId));
  }, [restaurantId]);

  return (
    <Screen>
      <ScrollView>
        {tableList?.map((table) => {
          return (
            <View key={table._id} style={styles.container}>
              <View style={styles.itemDetail}>
                <Text style={styles.tableName}>{table.name}</Text>
                <Text style={styles.description}>No. of Seats: {table.seats}</Text>
                <Text style={styles.description}>Rate: {table.rate}</Text>
              </View>

              <View style={styles.statusContainer}>
                <Text style={styles.deliverStatus}>
                  {table.isReserved ? "Reserved" : "Not Reserved"}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.addTable}>
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => navigation.navigate("AddSeats")}
        >
          <Ionicons name="add" size={30} color={colors.screen} />
        </TouchableHighlight>
      </View>
    </Screen>
  );
};

export default TableList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tableName: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 25,
  },
  description: {
    color: colors.gray,
  },
  statusContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 22,
  },
  deliverStatus: {
    color: colors.screen,
    fontSize: 15,
  },
  addTable: {
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
});
