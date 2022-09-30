import React from "react";
import { View, Text, StyleSheet, TouchableHighlight, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import "yup-phone";

import Screen from "../../components/Screen";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import defaultStyles from "../../config/styles";
import api from "../../helpers/axios";
import colors from "../../config/colors";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(2).label("First Name"),

  lastName: Yup.string().required().min(3).label("Last Name"),

  phoneNumber: Yup.string()
    .phone("NP", true, "${path} is invalid")
    .required()
    .label("Phone Number"),

  email: Yup.string().required().email().label("Email"),
});

const EditProfile = () => {
  const register = async (values) => {
    delete values.confirmPassword;
    console.log(values);
    const { data } = await api.post("/user/register", values);

    console.log(data);
  };
  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
              }}
              onSubmit={(values) => register(values)}
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
                icon="email"
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              <Pressable style={styles.saveButton} onPress={() => console.log("submitted")}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
                  Save Changes
                </Text>
              </Pressable>
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

  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    top: 20,
  },

  formContainer: {
    display: "flex",
    width: "90%",
    marginVertical: 40,
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
