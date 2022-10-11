import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import "yup-phone";

import Screen from "../../components/Screen";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import SubmitButton from "../../components/forms/SubmitButton";
import defaultStyles from "../../config/styles";
import api from "../../helpers/axios";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(3).label("First Name"),
  lastName: Yup.string().required().min(3).label("Last Name"),

  phoneNumber: Yup.string()
    .phone("NP", true, "${path} is invalid")
    .required()
    .label("Phone Number"),

  address: Yup.string().required().min(4).label("Address"),

  password: Yup.string().required().min(6).max(14).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .min(6)
    .max(14)
    .oneOf([Yup.ref("password")], "passwords do not match")
    .label("Password"),
});

function RegisterScreen() {
  const register = async (values) => {
    // Remove the confirmPassword field from the set of user input values
    delete values.confirmPassword;
    const { data } = await api.post("/user/register", values);
    console.log(data);
  };
  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/App-Logo.jpg")} style={styles.logo}></Image>
          </View>

          <View style={styles.formContainer}>
            <Form
              initialValues={{
                firstName: "",
                lastName: "",
                password: "",
                confirmPassword: "",
                phoneNumber: "",
                address: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => register(values)}
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
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="confirmPassword"
                placeholder="Confirm password"
                secureTextEntry
                textContentType="password"
              />
              <SubmitButton title="Register" onPress={() => navigation.navigate("LoginScreen")} />
            </Form>

            <View style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
              <Text
                style={{
                  color: defaultStyles.colors.medium,
                  textAlign: "right",
                }}
              >
                Already have an account?
                <TouchableNativeFeedback onPress={() => console.log("clicked")}>
                  <Text style={styles.text}>Login</Text>
                </TouchableNativeFeedback>
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("RestaurantSignup")}>
            <Text style={defaultStyles.link}>Register Your Restaurant Here</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.screen,
    alignItems: "center",
    padding: 20,
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
});

export default RegisterScreen;
