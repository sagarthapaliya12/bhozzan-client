import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { StackScreenProps } from "../../../navigation/StackScreenProps";
import { QrCodeProps } from "../../Restaurant/QrCodeProps";
import { useDispatch } from "react-redux";
import { deliverOrder } from "../../../screens/Restaurant/orderSlice";
import AppButton from './../../AppButton';

const QrScanner = (props) => {
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState("");
  const [permission, setPermission] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    // const orderId = scanData.orderId;
    dispatch(deliverOrder(orderId));
  }, [orderId]);

  const requestCameraPermission = async () => {
    try {
      const { status, granted } = await BarCodeScanner.requestPermissionsAsync();
      console.log(`Status: ${status}, Granted: ${granted}`);

      if (status === "granted") {
        console.log("Access granted");
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      console.log(error);
      setPermission(false);
    } finally {
      setLoading(false);
    }
  };
  if (loading)
    return (
      <View style={styles.container}>
        <Text>Requesting Permission ...</Text>
      </View>
    );
  if (orderId)
    return (
      <View style={styles.container}>
        <Text>Order ID: {orderId.orderId}</Text>
        <AppButton title="Scan Again" onPress={() => setOrderId(undefined)} />
      </View>
    );
  if (permission)
    return (
      <BarCodeScanner
        style={[styles.container]}
        onBarCodeScanned={({ type, data }) => {
          try {
            // console.log(type);
            // console.log(data);
            let _data = JSON.parse(data);
            setOrderId(_data);
          } catch (error) {
            console.log("Unable to parse: ", error);
          }
        }}
      >
        {/* <Text style={styles.text}> Scan the QR Code</Text> */}
      </BarCodeScanner>
    );

  return <View style={styles.container}></View>;
};

// QrGenerator.propTypes = {}

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    backgroundColor: "black",
    color: "white",
  },
});
