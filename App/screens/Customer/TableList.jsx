import { View, Text, TouchableHighlight, StyleSheet, Image, FlatList } from "react-native";
import React, { useEffect } from "react";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import tableImg from "../../assets/table.png";
import { getTablesByRestaurant } from "../../redux/table/tableSlice";
import { useDispatch, useSelector } from "react-redux";

const TableList = () => {
  const dispatch = useDispatch();

  const restaurantId = useSelector((state) => state.customerSlice.searchedRestaurantId);
  const tableList = useSelector((state) => state.tableSlice.tableList);

  useEffect(() => {
    dispatch(getTablesByRestaurant(restaurantId));
  }, [restaurantId]);

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={tableList}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <View style={styles.header}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text>No.of Seats: {item.seats}</Text>
                </View>
                <Image source={tableImg} style={styles.tableImg} />
                <TouchableHighlight style={styles.button}>
                  <Text style={styles.btnText}>Reserve</Text>
                </TouchableHighlight>
              </View>
            );
          }}
        />
      </View>
    </Screen>
  );
};

export default TableList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "auto",
    // alignItems: "center",
    width: "100%",
    paddingHorizontal: 19,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    width: 120,
    backgroundColor: colors.gray,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
    flex: 1,
    margin: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  tableImg: {
    width: 50,
    height: 50,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 8,
    paddingHorizontal: 18,
    borderRadius: 19,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "700",
  },
});
