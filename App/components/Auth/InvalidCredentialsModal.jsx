import * as React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import colors from "../../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowInvalidCredentialsModal } from "../../redux/ui/uiSlice";

const InvalidCredentialsModal = () => {
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20, borderRadius: 8 };

  const dispatch = useDispatch();

  const visible = useSelector((state) => state.uiSlice.showInvalidCredentialsModal);
  const errMsg = useSelector((state) => state.authSlice.errorMsg);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => dispatch(toggleShowInvalidCredentialsModal(false))}
          contentContainerStyle={containerStyle}
        >
          <View style={styles.container}>
            <Text style={{ fontWeight: "600", fontSize: 22 }}>
              {/* Invalid Credentials */}
              {errMsg}
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
                  onPress={() => dispatch(toggleShowInvalidCredentialsModal(false))}
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

export default InvalidCredentialsModal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: colors.g,
    // alignItems: "center",
  },
});
