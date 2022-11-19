import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../config/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const DateTime = () => {
  const [cDate, setCDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(
    cDate.getFullYear() + "-" + (cDate.getMonth() + 1) + "-" + cDate.getDate()
  );
  const [startTime, setStartTime] = useState(cDate.getHours() + ":" + cDate.getMinutes());
  const [endTime, setEndTime] = useState(cDate.getHours() + ":" + cDate.getMinutes());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || cDate;
    setShow(Platform.OS === "ios");
    setCDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate();
    let fStartTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    let fEndTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setDate(fDate);
    setStartTime(fStartTime);
    setEndTime(fEndTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleReservation = () => {
    const reservation = {
      tableId: "test",
      reservedSince: `${date}T${startTime}`,
      reservedUntil: date + endTime,
    };
    console.log("Test:", reservation);
  };

  return (
    <View>
      <Text style={styles.textSecondary}>Select Date:</Text>
      <TouchableHighlight onPress={() => showMode("date")}>
        <View style={styles.dateContainer}>
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={styles.textMain}>{date}</Text>
        </View>
      </TouchableHighlight>

      <View style={styles.time}>
        <Text style={styles.textSecondary}>Select Time:</Text>
        <View style={styles.timeWrapper}>
          <TouchableHighlight onPress={() => showMode("time")}>
            <View style={styles.timeContainer}>
              <Ionicons name="time" size={24} color="black" />
              <Text style={styles.textMain}>{startTime}</Text>
            </View>
          </TouchableHighlight>
          <Text style={styles.to}> TO</Text>
          <TouchableHighlight onPress={() => showMode("time")}>
            <View style={styles.timeContainer}>
              <Ionicons name="time" size={24} color="black" />
              <Text style={styles.textMain}>{endTime}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={cDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
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
