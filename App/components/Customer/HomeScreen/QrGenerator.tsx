import React from "react";
// import PropTypes from 'prop-types'
import { View, StyleSheet, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { QrCodeProps } from "../../Restaurant/QrCodeProps";
import { StackScreenProps } from "../../../navigation/StackScreenProps";

const QrGenerator: React.FunctionComponent<StackScreenProps> = (props) => {
  const { navigation } = props;
  const payload: QrCodeProps = {
    name: "Donald Trump",
    number: "9841499883",
    message: "Transaction completed successfully",
  };
  return (
    <View style={styles.container}>
      <QRCode size={200} value={JSON.stringify(payload)} />

      {/* <View style={styles.button}>
        <Button title="Scan Qr Code" onPress={() => navigation.navigate("QrScanner")} />
      </View> */}
    </View>
  );
};

// QrGenerator.propTypes = {}

export default QrGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginTop: 10,
  },
});
