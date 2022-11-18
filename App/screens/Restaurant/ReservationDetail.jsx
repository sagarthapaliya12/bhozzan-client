import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import React from "react";
import Screen from "../../components/Screen";
import tableImg from "../../assets/table.png";
import colors from "../../config/colors";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const reservationList = () => {
  return (
    <View style={styles.reservationContainer}>
      <View style={styles.rowOne}>
        <View style={styles.time}>
          <Text style={styles.timeText}>Time:</Text>
          <View style={styles.timeContainer}>
            <View style={{ marginRight: 10 }}>
              <Text style={styles.showTime}>2021-12-09</Text>
              <Text style={styles.showTime}>10:00 AM</Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Text style={styles.showTime}>To</Text>
            </View>
            <View>
              <Text style={styles.showTime}>2021-12-09</Text>
              <Text style={styles.showTime}>12:00 PM</Text>
            </View>
          </View>

          <View style={styles.reservedByContainer}>
            <Text style={styles.reservedBy}>Reserved By:</Text>
            <View style={{}}>
              <Text style={styles.reserverName}>Sajag Pradhanang</Text>
              <View style={styles.phoneContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="call" size={20} color={colors.screen} />
                  <Text style={styles.reserverphoneNo}>9841781490</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.cost}>Rs. 200</Text>
      </View>
    </View>
  );
};

const ReservationDetail = () => {
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
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Reservations</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingBottom: 100, marginBottom: 278 }}
          >
            {reservationList()}
            {reservationList()}
            {reservationList()}
            {reservationList()}
            {reservationList()}
            {reservationList()}
            {reservationList()}
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
};

export default ReservationDetail;

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
