import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowSnackbar } from "../redux/ui/uiSlice";

const SnackbarMessage = (props) => {
  const dispatch = useDispatch();

  const visible = useSelector((state) => state.uiSlice.showSnackbar);

  const [status, setStatus] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const statusCustomer = useSelector((state) => state.customerSlice.status);
  const successMsgCustomer = useSelector((state) => state.customerSlice.successMsg);
  const errorMsgCustomer = useSelector((state) => state.customerSlice.errorMsg);

  const statusRestaurant = useSelector((state) => state.restaurantSlice.status);
  const successMsgRestaurant = useSelector((state) => state.restaurantSlice.successMsg);
  const errorMsgRestaurant = useSelector((state) => state.restaurantSlice.errorMsg);

  const statusOrder = useSelector((state) => state.orderSlice.status);
  const successMsgOrder = useSelector((state) => state.orderSlice.successMsg);
  const errorMsgOrder = useSelector((state) => state.orderSlice.errorMsg);

  useEffect(() => {
    if (props.subject === "customer") {
      setStatus(statusCustomer);
      setSuccessMsg(successMsgCustomer);
      setErrorMsg(errorMsgCustomer);
    }
    if (props.subject === "restaurant") {
      setStatus(statusRestaurant);
      setSuccessMsg(successMsgRestaurant);
      setErrorMsg(errorMsgRestaurant);
    }
    if (props.subject === "order") {
      setStatus(statusOrder);
      setSuccessMsg(successMsgOrder);
      setErrorMsg(errorMsgOrder);
    }
  }, [statusCustomer, statusRestaurant, statusOrder]);

  const onDismissSnackBar = () => {
    dispatch(toggleShowSnackbar(false));
  };

  return (
    <Snackbar visible={visible} onDismiss={onDismissSnackBar} style={styles.snackbar}>
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
  snackbar: {
    backgroundColor: "green",
    color: "red",
    borderRadius: 40,
    width: "95%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 10000,
    bottom: 20,
  },
});
