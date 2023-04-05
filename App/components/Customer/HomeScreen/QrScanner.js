import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useDispatch } from "react-redux";
import { deliverOrder } from "../../../screens/Restaurant/orderSlice";
// import AppButton from "./../../AppButton";
import Screen from "../../Screen";
import { useNavigation } from "@react-navigation/native";

const QrScanner = () => {
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState("");
  const [permission, setPermission] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const handleDeliever = async () => {
      // console.log("i am here");
      await dispatch(deliverOrder(orderId)).then((res) => {
        // console.log("dsfs", res);
      });
    };

    if (orderId) {
      handleDeliever();
      navigation.navigate("Feed");
    }
  }, [orderId]);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === "granted") {
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

  // if (orderId)
  //   return (
  //     <Screen>
  //       <View style={styles.container}>
  //         <Text>Order ID: {orderId}</Text>
  //         <AppButton title="Scan Again" onPress={() => setOrderId(null)} />
  //       </View>
  //     </Screen>
  //   );

  if (permission)
    return (
      <Screen>
        <BarCodeScanner
          style={[styles.container]}
          onBarCodeScanned={({ data }) => {
            try {
              setOrderId(JSON.parse(data).orderId);
            } catch (error) {
              console.log("Unable to parse: ", error);
            }
          }}
        >
          {/* <Text style={styles.text}> Scan the QR Code</Text> */}
        </BarCodeScanner>
      </Screen>
    );

  return <View style={styles.container}></View>;
};

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
