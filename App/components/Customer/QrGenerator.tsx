import React from "react";
// import PropTypes from 'prop-types'
import { View, StyleSheet, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { QrCodeProps } from "../Restaurant/QrCodeProps";
import { StackScreenProps } from "../../navigation/StackScreenProps";
import colors from "../../config/colors";
import { useSelector } from "react-redux";

const QrGenerator: React.FunctionComponent<StackScreenProps> = (props) => {
  // const { navigation } = props;

  const orderDetail = useSelector((state: any) => state.orderSlice.orderHistoryDetail);

  const payload: QrCodeProps = {
    // name: "John Legend",
    // number: "9845190491",
    // message: "Order has been delivered",
    orderId: orderDetail._id,
  };
  
  return (
    <View style={styles.container}>
      <QRCode 
      size={200}      
      color= {colors.gray} 
      backgroundColor= {colors.screen} 
      // value={JSON.stringify(orderDetail)} 
      value={JSON.stringify(payload)} 
      />

    {/* //   {/* <View style={styles.button}>
    //     <Button title="Scan Qr Code" onPress={() => navigation.navigate("QrScanner")} />
    //   </View> */}
    </View>
  );
};

// QrGenerator.propTypes = {}

export default QrGenerator;

const styles = StyleSheet.create({
  container: {
    paddingVertical:  20,
    alignItems: "center",
    justifyContent: "center",
  },
  // button: {
  //   marginTop: 10,
  // },
});
