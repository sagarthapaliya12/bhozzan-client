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
import SubmitButton from "../../components/forms/SubmitButton";
import { useDispatch } from "react-redux";
import { registerRestaurant } from "./authSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Restaurant Name"),
  
  primaryPhoneNumber: Yup.string()
  .phone("NP", true, "${path} is invalid")
  .required()
  .label("Phone Number"),
  
  phoneNumbers: Yup.string().min(10).max(23).label("Secondary Contact"),
  
  address: Yup.string().required().min(4).label("Location"),

  PAN: Yup.string().required().min(9).label("Pan/Vat No."),
});

const RestaurantSignup = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(registerRestaurant(values));
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                name: "",
                primaryPhoneNumber: "",
                phoneNumbers: "",
                address: "",
                PAN: "",
              }}
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={validationSchema}
            >
              <FormField
                autoCorrect={false}
                icon="account"
                name="name"
                placeholder="Restaurant Name"
              />

              <FormField
                autoCorrect={false}
                icon="phone"
                name="primaryPhoneNumber"
                placeholder="Primary Phone Number"
              />
              <FormField
                autoCorrect={false}
                icon="phone"
                name="phoneNumbers"
                placeholder="Secondary Contact"
              />
              <FormField autoCorrect={false} icon="city"
              name="address" placeholder="Address" />
              <FormField
                autoCorrect={false}
                icon="file"
                name="PAN"
                placeholder="PAN/VAT No."
              />
              <SubmitButton title="Register" />
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default RestaurantSignup;

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
    marginVertical: 80,
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
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 25,
  },
});