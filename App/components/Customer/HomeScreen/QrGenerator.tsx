import React from "react";
// import PropTypes from 'prop-types'
import { View, StyleSheet, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { QrCodeProps } from "../../Restaurant/QrCodeProps";
import { StackScreenProps } from "../../../navigation/StackScreenProps";
import colors from "../../../config/colors";

const QrGenerator: React.FunctionComponent<StackScreenProps> = (props) => {
  const { navigation } = props;
  const payload: QrCodeProps = {
    name: "John Legend",
    number: "9845190491",
    message: "Order has been delivered",
  };
  return (
    <View style={styles.container}>
      <QRCode 
      size={200}      
      color= {colors.secondary} 
      backgroundColor= {colors.screen} 
      value={JSON.stringify(payload)} 
      />

      <View style={styles.button}>
        <Button title="Scan Qr Code" onPress={() => navigation.navigate("QrScanner")} />
      </View>
    </View>
  );
};

// QrGenerator.propTypes = {}

export default QrGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.screen,
  },
  button: {
    marginTop: 10,
  },
});
