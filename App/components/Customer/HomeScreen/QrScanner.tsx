import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { StackScreenProps } from "../../../navigation/StackScreenProps";
import { QrCodeProps } from "../../Restaurant/QrCodeProps";

const QrScanner: React.FunctionComponent<StackScreenProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [scanData, setScanData] = useState<QrCodeProps>();
  const [permission, setPermission] = useState(true);

  useEffect(() => {
    requestCameraPermission();
  }, []);

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
  if (scanData)
    return (
      <View style={styles.container}>
        <Text>
          Name: {scanData.name}, Number: {scanData.number}
        </Text>
        <Button title="Scan Again" onPress={() => setScanData(undefined)} />
      </View>
    );
  if (permission)
    return (
      <BarCodeScanner
        style={[styles.container]}
        onBarCodeScanned={({ type, data }) => {
          try {
            console.log(type);
            console.log(data);
            let _data = JSON.parse(data);
            setScanData(_data);
          } catch (error) {
            console.log("Unable to parse: ", error);
          }
        }}
      >
        <Text style={styles.text}> Scan the QR Code</Text>
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
    color: "white"
  },
});
