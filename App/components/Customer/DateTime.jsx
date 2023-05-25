import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState, use4 } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../config/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  createReservation,
  getReservationByTableCustomer,
} from "../../redux/reservation/reservationSlice";
import { useSelector } from "react-redux";
import { toggleShowMessageModal } from "../../redux/ui/uiSlice";

const DateTime = () => {
  const dispatch = useDispatch();

  const tableId = useSelector((state) => state.tableSlice.tableId);
  // const status = useSelector((state) => state.tableSlice.status);

  const [cDate, setCDate] = useState(new Date());

  const [showDate, setShowDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const [date, setDate] = useState(
    cDate.getFullYear() + "-" + (cDate.getMonth() + 1) + "-" + cDate.getDate()
  );
  const [startTime, setStartTime] = useState(cDate.getHours() + ":" + cDate.getMinutes());
  const [endTime, setEndTime] = useState(cDate.getHours() + ":" + cDate.getMinutes());

  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || cDate;
    setShowDate(false);
    setCDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate();
    setDate(fDate);
  };

  const handleStartTime = (event, selectedDate) => {
    const currentDate = selectedDate || cDate;
    setShowStartTime(false);
    setCDate(currentDate);
    let tempDate = new Date(currentDate);
    let fStartTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setStartTime(fStartTime);
  };

  const handleEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || cDate;
    setShowEndTime(false);
    setCDate(currentDate);
    let tempDate = new Date(currentDate);
    let fEndTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setEndTime(fEndTime);
  };

  const handleReservation = async () => {
    const reservationDetail = {
      tableId,
      reservedSince: `${date} ${startTime}`,
      reservedUntil: `${date} ${endTime}`,
    };
    await dispatch(createReservation(reservationDetail))
      .then(() => {
        dispatch(toggleShowMessageModal(true));
      });
    // dispatch(getReservationByTableCustomer(tableId));
  };

  return (
    <View>
      <Text style={styles.textSecondary}>Select Date:</Text>
      <TouchableHighlight onPress={() => setShowDate(true)}>
        <View style={styles.dateContainer}>
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={styles.textMain}>{date}</Text>
        </View>
      </TouchableHighlight>

      <View style={styles.time}>
        <Text style={styles.textSecondary}>Select Time:</Text>
        <View style={styles.timeWrapper}>
          <TouchableHighlight onPress={() => setShowStartTime(true)}>
            <View style={styles.timeContainer}>
              <Ionicons name="time" size={24} color="black" />
              <Text style={styles.textMain}>{startTime}</Text>
            </View>
          </TouchableHighlight>
          <Text style={styles.to}> TO</Text>
          <TouchableHighlight onPress={() => setShowEndTime(true)}>
            <View style={styles.timeContainer}>
              <Ionicons name="time" size={24} color="black" />
              <Text style={styles.textMain}>{endTime}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={cDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDate}
        />
      )}

      {showStartTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={cDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleStartTime}
        />
      )}
      {showEndTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={cDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleEndTime}
        />
      )}
      <TouchableOpacity style={styles.confirmBtn} onPress={handleReservation}>
        <Text style={styles.btnText}>Confirm Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  textMain: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.screen,
    marginLeft: 5,
  },
  textSecondary: {
    color: colors.gray,
    marginBottom: 5,
    fontSize: 15,
  },
  dateContainer: {
    backgroundColor: colors.secondary,
    padding: 11,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  time: { marginTop: 15 },
  timeWrapper: {
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
  },
  timeContainer: {
    backgroundColor: colors.secondary,
    padding: 11,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  to: {
    color: colors.gray,
    marginHorizontal: 15,
    fontWeight: "700",
    fontSize: 18,
  },
  confirmBtn: {
    marginVertical: 30,
    backgroundColor: colors.secondary,
    alignItems: "center",
    borderRadius: 30,
  },
  btnText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 22,
    fontWeight: "700",
  },
});
