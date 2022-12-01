import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableHighlight,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import Screen from "../../components/Screen";
import tableImg from "../../assets/table.png";
import colors from "../../config/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getReservationByTableRestaurant } from "../../redux/reservation/reservationSlice";

const { width } = Dimensions.get("window");

const ReservationDetail = () => {
  const dispatch = useDispatch();

  const tableId = useSelector((state) => state.tableSlice.tableId);
  const reservations = useSelector((state) => state.reservationSlice.reservationList);
  const tableInfo = useSelector((state) => state.tableSlice.tableInfo);

  useEffect(() => {
    dispatch(getReservationByTableRestaurant(tableId));
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 25 }}>
          <Image style={styles.tableImg} source={tableImg} />
          <View style={styles.itemDetail}>
            <Text style={styles.tableName}>{tableInfo.name}</Text>
            <Text style={styles.seats}>No. of Seats: {tableInfo.seats}</Text>
            <Text style={styles.rate}>Rate: Rs.{tableInfo.rate}</Text>
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
            {reservations.map((reservation) => {
              return (
                <View style={styles.reservationContainer} key={reservation._id}>
                  <Text style={styles.showTime}>
                    {new Date(reservation.reservedSince).toLocaleDateString()}
                  </Text>
                  <View style={styles.rowOne}>
                    <View style={styles.time}>
                      {/* <Text style={styles.timeText}>Time:</Text> */}
                      <View style={styles.timeContainer}>
                        <View style={{ marginRight: 10 }}>
                          <Text style={styles.showTime}>
                            {new Date(reservation.reservedSince).toLocaleTimeString()}
                          </Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                          <Text style={styles.showTime}>To</Text>
                        </View>
                        <View>
                          <Text style={styles.showTime}>
                            {new Date(reservation.reservedUntil).toLocaleTimeString()}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.reservedByContainer}>
                        <Text style={styles.reservedBy}>Reserved By:</Text>
                        <View style={{}}>
                          {/* <View style={styles.phoneContainer}> */}
                          <TouchableHighlight
                            onPress={() =>
                              Linking.openURL(`tel:${reservation.customer.phoneNumber}`)
                            }
                          >
                            <View
                              // style={{
                              //   flexDirection: "row",

                              //   // alignItems: "center",
                              //   // justifyContent: "center",
                              // }}
                              style={styles.phoneContainer}
                            >
                              <Ionicons name="call" size={20} color={colors.screen} />
                              <Text style={styles.reserverName}>
                                {reservation.customer.firstName +
                                  " " +
                                  reservation.customer.lastName}
                              </Text>
                            </View>
                          </TouchableHighlight>
                          {/* </View> */}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.cost}>Rs. {reservation.cost}</Text>
                  </View>
                </View>
              );
            })}
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
    paddingVertical: 20,
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
    fontSize: 18,
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
    color: colors.screen,
    marginLeft: 5,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 24,
    width: 130,
    // justifyContent: "center",
  },
  reserverphoneNo: {
    color: colors.screen,
    marginLeft: 5,
  },
});
