import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowSnackbar } from "../redux/ui/uiSlice";

const SnackbarRestaurant = () => {
  const dispatch = useDispatch();

  const visible = useSelector((state) => state.uiSlice.showSnackbar);
  const { status, successMsg, errorMsg } = useSelector((state) => state.restaurantSlice);

  const onDismissSnackBar = () => {
    dispatch(toggleShowSnackbar(false));
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      style={{
        backgroundColor: "green",
        color: "red",
        borderRadius: 40,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: 10000,
        bottom: 20,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <AntDesign name="checkcircle" size={24} color="white" />
        <Text style={{ color: colors.white, marginLeft: 8 }}>
          {status === "success" && successMsg}
          {status === "failed" && errorMsg}
        </Text>
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
