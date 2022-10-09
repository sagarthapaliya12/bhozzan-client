import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import colors from "../../config/colors";

import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import SubmitButton from "../../components/forms/SubmitButton";
import AppButton from "../../components/AppButton";
import defaultStyles from "../../config/styles";
import api from "../../helpers/axios";

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .phone("NP", true, "${path} is invalid")
    .required()
    .label("Phone Number"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const login = async (values) => {
    console.log("juju", values);
    const { data } = await api.post("/user/login", values);
    console.log(data);
  };
  return (
    <Screen>
      <KeyboardAwareScrollView contentContainerStyle={styles.screenContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/App-Logo.jpg")} style={styles.logo}></Image>
        </View>

        <View style={styles.formContainer}>
          <Form
            initialValues={{ phoneNumber: "", password: "" }}
            onSubmit={(values) => login(values)}
            validationSchema={validationSchema}
          >
            <FormField
              autoCorrect={false}
              icon="phone"
              name="phoneNumber"
              placeholder="Phone Number"
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
            <SubmitButton
              title="Login"
              // onPress={}
            />
          </Form>

          <TouchableOpacity onPress={() => console.log("clicked")}>
            <Text style={defaultStyles.link}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <AppButton title="Register" onPress={() => navigation.navigate("RegisterScreen")} />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.screen,
    // justifyContent: "flex-end",
    alignItems: "center",
    // overflowX: "hidden"
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
    top: 60,
  },
  formContainer: {
    display: "flex",
    width: "90%",
    marginVertical: 150,
  },
  btnContainer: {
    padding: 10,
    width: "90%",
    marginVertical: 50,

    // position: "absolute"
  },
});

export default LoginScreen;
