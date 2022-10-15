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
  restaurantName: Yup.string().required().min(3).label("Restaurant Name"),

  description: Yup.string().required().min(3).label("Description"),

  location: Yup.string().required().min(4).label("Location"),

  phoneNumber: Yup.string()
    .phone("NP", true, "${path} is invalid")
    .required()
    .label("Phone Number"),

  panVatNo: Yup.string().required().min(6).max(14).label("Pan/Vat No."),

  email: Yup.string().required().email().label("Email"),

  deliveryHours: Yup.string().required().min(6).label("Delivery Hours"),
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
                restaurantName: "",
                description: "",
                location: "",
                phoneNumber: "",
                panVatNo: "",
                email: "",
                deliveryHours: "",
              }}
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={validationSchema}
            >
              <FormField
                autoCorrect={false}
                icon="account"
                name="restaurantName"
                placeholder="Restaurant Name"
              />
              <FormField
                autoCorrect={false}
                icon="account"
                name="description"
                placeholder="Description"
              />
              <FormField autoCorrect={false} icon="city" name="location" placeholder="Location" />
              <FormField
                autoCorrect={false}
                icon="phone"
                name="phoneNumber"
                placeholder="Phone Number"
              />
              <FormField
                autoCorrect={false}
                icon="file"
                name="panVatNo"
                placeholder="PAN/VAT No."
              />
              <FormField
                autoCorrect={false}
                icon="email"
                name="email"
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              <FormField
                autoCorrect={false}
                icon="clock"
                name="deliveryHours"
                placeholder="Delivery Hours"
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
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 25,
  },
});
