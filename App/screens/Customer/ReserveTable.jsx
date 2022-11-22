import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import React from "react";
import Screen from "../../components/Screen";
import tableImg from "../../assets/table.png";
import colors from "../../config/colors";
import DateTime from "../../components/Customer/DateTime";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const ReserveTable = () => {
  const tableId = useSelector((state) => state.tableSlice.tableId);
  const reservations = useSelector((state) => state.reservationSlice.reservationList);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
          <Image style={styles.tableImg} source={tableImg} />
          <View style={styles.itemDetail}>
            <Text style={styles.tableName}>Table 1234</Text>
            <Text style={styles.seats}>No. of Seats: 4</Text>
            <Text style={styles.rate}>Rate: Rs.200</Text>
          </View>
        </View>
        <DateTime />
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Reservations</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingBottom: 100, marginBottom: 278 }}
          >
            {/* {reservationList()}
            {reservationList()}
            {reservationList()}
            {reservationList()}
            {reservationList()}
            {reservationList()}
            {reservationList()} */}
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

export default ReserveTable;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 20,
  },
  tableImg: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  tableName: {
    color: colors.secondary,
    fontWeight: "600",
    fontSize: 25,
  },
  seats: {
    color: colors.gray,
  },
  rate: {
    color: colors.green,
  },
  titleContainer: {
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: colors.gray,
    paddingVertical: 5,
  },
  title: {
    color: colors.gray,
    fontSize: 22,
    fontWeight: "700",
  },
  reservationContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  rowOne: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    // alignItems: "center",
  },
  timeText: {
    color: colors.gray,
    fontSize: 15,
  },
  timeContainer: { flexDirection: "row", alignItems: "center" },
  showTime: {
    color: colors.secondary,
  },
  cost: {
    color: colors.green,
    fontSize: 22,
  },
  reservedByContainer: { flexDirection: "row", alignItems: "center", marginTop: 9 },
  reservedBy: {
    color: colors.gray,
    fontSize: 16,
    marginRight: 10,
  },
  reserverName: {
    color: colors.green,
    marginBottom: 5,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 24,
    width: 130,
    justifyContent: "center",
  },
  reserverphoneNo: {
    color: colors.screen,
    marginLeft: 5,
  },
});
