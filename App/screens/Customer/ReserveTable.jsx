import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Screen from "../../components/Screen";
import tableImg from "../../assets/table.png";
import colors from "../../config/colors";
import DateTime from "../../components/Customer/DateTime";
import { useDispatch, useSelector } from "react-redux";
import MessagePopUpModal from "../../components/MessagePopUpModal";
import getFormattedTime from "../../utils/getFormattedTime";
import { getReservationByTableCustomer } from "../../redux/reservation/reservationSlice";

const { width } = Dimensions.get("window");

const ReserveTable = () => {
  const dispatch = useDispatch();

  const tableId = useSelector((state) => state.tableSlice.tableId);
  const tableInfo = useSelector((state) => state.tableSlice.tableInfo);
  const reservations = useSelector((state) => state.reservationSlice.reservationList);

  useEffect(() => {
    dispatch(getReservationByTableCustomer(tableId));
  }, [tableId]);

  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 25 }}>
            <Image style={styles.tableImg} source={tableImg} />
            <View style={styles.itemDetail}>
              <Text style={styles.tableName}>{tableInfo.name}</Text>
              <Text style={styles.seats}>No. of Seats: {tableInfo.seats}</Text>
              <Text style={styles.rate}>Rate: Rs.{tableInfo.rate}</Text>
            </View>
          </View>
          <DateTime />
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Current Reservations</Text>
            </View>

            {/* <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingBottom: 100, marginBottom: 278 }}
          > */}
            {reservations?.map((reservation) => {
              return (
                <View key={reservation._id} style={styles.reservationContainer}>
                  <View>
                    <Text style={styles.reservationDate}>
                      {new Date(reservation.reservedSince).toDateString()}
                    </Text>
                    <Text style={styles.reservationTime}>
                      {getFormattedTime(reservation.reservedSince)} To{" "}
                      {getFormattedTime(reservation.reservedUntil)}
                    </Text>
                    {/* <Text style={styles.reservationText}>
                      {getFormattedTime(reservation.reservedUntil)}
                    </Text> */}
                  </View>
                </View>
              );
            })}
            {/* </ScrollView> */}
          </View>
        </View>
      </ScrollView>
      <MessagePopUpModal subject="reservation" />
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
  reservationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  reservationDate: { fontSize: 18, color: colors.secondary },
  reservationTime: { fontSize: 16, color: colors.gray },
});
