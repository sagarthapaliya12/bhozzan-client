import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyReservation } from "../../redux/reservation/reservationSlice";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import { Ionicons, Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const MyReservation = () => {
  const dispatch = useDispatch();

  const reservations = useSelector((state) => state.reservationSlice.reservationList);

  useEffect(() => {
    dispatch(getMyReservation());
  }, []);

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={{ paddingBottom: 100, marginBottom: 278 }}
      >
        {reservations.map((reservation) => {
          return (
            <View style={styles.reservationContainer} key={reservation._id}>
              <Text style={styles.showTime}>
                {new Date(reservation.reservedSince).toDateString()}
              </Text>
              <View style={styles.rowOne}>
                <View style={styles.time}>
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
                  <View style={styles.restaurantContainer}>
                    <TouchableHighlight
                      onPress={() =>
                        Linking.openURL(`tel:${reservation.restaurant.primaryPhoneNumber}`)
                      }
                    >
                      <View style={styles.phoneContainer}>
                        <Ionicons name="call" size={24} color={colors.screen} />
                      </View>
                    </TouchableHighlight>
                    <View>
                      <Text style={styles.restaurantName}>{reservation.restaurant.name}</Text>
                      <View style={styles.addressContainer}>
                        <Entypo
                          name="location-pin"
                          size={24}
                          color={colors.primary}
                          style={{ fontSize: 20 }}
                        />
                        {/* <Text style={styles.address}>{reservation.restaurant.address}</Text> */}
                      </View>
                    </View>
                  </View>
                </View>
                <Text style={styles.cost}>Rs. {reservation.cost}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default MyReservation;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
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
    paddingHorizontal: 15,
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
  restaurantContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  restaurantName: {
    color: colors.gray,
    marginLeft: 5,
    fontSize: 20,
  },
  addressContainer: { flexDirection: "row" },
  address: { color: colors.gray },
  phoneContainer: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 24,
    width: 40,
    height: 40,
    justifyContent: "center",
    marginRight: 7,
  },
  reserverphoneNo: {
    color: colors.screen,
    marginLeft: 5,
  },
});
