import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";

const SnackbarMessage = () => {
  const [visible, setVisible] = useState(true);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      style={{
        backgroundColor: "green",
        color: "red",
        borderRadius: 40,
        width: "100%",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        position: "absolute",
        zIndex: 10000,
        bottom: 20,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <AntDesign name="checkcircle" size={24} color="white" />
        <Text style={{ color: colors.white, marginLeft: 8 }}>Added To Favorite.</Text>
      </View>
    </Snackbar>
  );
};

export default SnackbarMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    // position: "absolute",
    // zIndex: 100000,
  },
});
