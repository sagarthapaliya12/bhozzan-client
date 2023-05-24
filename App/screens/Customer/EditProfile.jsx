import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import "yup-phone";
import Screen from "../../components/Screen";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import defaultStyles from "../../config/styles";
import colors from "../../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { SubmitButton } from "../../components/forms";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(2).label("First Name"),

  lastName: Yup.string().required().min(3).label("Last Name"),

  phoneNumber: Yup.string()
    .phone("NP", true, "${path} is invalid")
    .required()
    .label("Phone Number"),

  address: Yup.string().required().min(4).label("Address"),
});

const EditProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.customerSlice.user);

  const handleSubmit = async (userInfo) => {
    console.log("User Info", userInfo);
    // dispatch(updateUserInfo(userInfo));
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber?.toString(),
                // address: user.address,
              }}
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={validationSchema}
            >
              <FormField
                autoCorrect={false}
                icon="account"
                name="firstName"
                placeholder="First Name"
              />
              <FormField
                autoCorrect={false}
                icon="account"
                name="lastName"
                placeholder="Last Name"
              />

              <FormField
                autoCorrect={false}
                icon="phone"
                name="phoneNumber"
                placeholder="Phone Number"
              />

              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="city"
                name="address"
                placeholder="Address"
              />

              {/* <Pressable style={styles.saveButton} onPress={() => console.log("submitted")}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
                  Save Changes
                </Text>
              </Pressable> */}

              <SubmitButton title="Save Changes" />
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.screen,
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    display: "flex",
    width: "90%",
    marginVertical: 20,
  },

  text: {
    color: defaultStyles.colors.medium,
    fontSize: 14,
    textAlign: "right",
    textDecorationLine: "underline",
  },
  saveButton: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 20,
  },
});
