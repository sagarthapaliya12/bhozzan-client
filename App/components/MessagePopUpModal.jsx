import * as React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowMessageModal } from "../redux/ui/uiSlice";
import { useNavigation } from "@react-navigation/native";
import { reset } from "../screens/Public/authSlice";

const MessagePopUpModal = (props) => {
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20, borderRadius: 8 };

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const visible = useSelector((state) => state.uiSlice.showMessageModal);

  const { status, successMsg, errorMsg } = useSelector((state) => state.authSlice);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => dispatch(toggleShowMessageModal(false))}
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
                <TouchableWithoutFeedback
                  onPress={() => {
                    dispatch(toggleShowMessageModal(false));
                    status === "success" &&
                      props.parent === "RegisterScreen" &&
                      navigation.navigate("LoginScreen");
                    dispatch(reset());
                  }}
                >
                  <Text>OK</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default MessagePopUpModal;
