import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowMessageModal } from "../redux/ui/uiSlice";
import { useNavigation } from "@react-navigation/native";
import { reset } from "../screens/Public/authSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

const MessagePopUpModal = (props) => {
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20, borderRadius: 8 };

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const visible = useSelector((state) => state.uiSlice.showMessageModal);
  const [status, setStatus] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const statusAuth = useSelector((state) => state.authSlice.status);
  const successMsgAuth = useSelector((state) => state.authSlice.successMsg);
  const errorMsgAuth = useSelector((state) => state.authSlice.errorMsg);

  const statusConfirmOrder = useSelector((state) => state.orderSlice.status);
  const successMsgConfirmOrder = useSelector((state) => state.orderSlice.successMsg);
  const errorMsgConfirmOrder = useSelector((state) => state.orderSlice.errorMsg);

  const statusTableReserve = useSelector((state) => state.reservationSlice.status);
  const successMsgTableReserve = useSelector((state) => state.reservationSlice.successMsg);
  const errorMsgTableReserve = useSelector((state) => state.reservationSlice.errorMsg);

  useEffect(() => {
    if (props.subject === "auth") {
      setStatus(statusAuth);
      setSuccessMsg(successMsgAuth);
      setErrorMsg(errorMsgAuth);
    }
    if (props.subject === "order") {
      setStatus(statusConfirmOrder);
      setSuccessMsg(successMsgConfirmOrder);
      setErrorMsg(errorMsgConfirmOrder);
    }
    if (props.subject === "reservation") {
      setStatus(statusTableReserve);
      setSuccessMsg(successMsgTableReserve);
      setErrorMsg(errorMsgTableReserve);
    }
  }, [statusAuth, statusConfirmOrder, statusTableReserve]);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          // onDismiss={}
          // onDismiss={() => dispatch(toggleShowMessageModal(false))}
          contentContainerStyle={containerStyle}
        >
          <View>
            <Text style={{ fontWeight: "600", fontSize: 22 }}>
              {status === "success" && successMsg}
              {status === "failed" && errorMsg}
            </Text>
            <View style={{ alignItems: "flex-end" }}>
              <View
                style={{
                  backgroundColor: colors.secondary,
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(toggleShowMessageModal(false));
                    if (status === "success") {
                      if (props.parent === "RegisterScreen") {
                        navigation.navigate("LoginScreen");
                        dispatch(reset());
                      }
                      if (props.parent === "Checkout") {
                        navigation.popToTop();
                        navigation.navigate("More");
                        navigation.navigate("OrderHistory");
                      }
                    }
                  }}
                >
                  <Text>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default MessagePopUpModal;
