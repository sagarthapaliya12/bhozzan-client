import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import "yup-phone";
import { useNavigation } from "@react-navigation/native";

import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import defaultStyles from "../../config/styles";
import api from "../../helpers/axios";
import colors from "../../config/colors";
import FormImagePicker from "../../components/forms/FormImagePicker";
import SubmitButton from "./../../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  images: Yup.array()
    .min(1, "Please select at least one image")
    .max(1, "please select only 1 Profile image"),

  placeholder: Yup.array()
    .min(1, "Please select at least one image")
    .max(1, "please select only 1 Profile image"),

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

const EditProfile = () => {
  const navigation = useNavigation();

  const register = async (values) => {
    delete values.confirmPassword;
    console.log(values);
    const { data } = await api.post("/user/register", values);

    console.log(data);
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <View style={styles.formContainer}>
          <Form
            initialValues={{
              images: [],
              placeholder: [],
              restaurantName: "",
              description: "",
              location: "",
              phoneNumber: "",
              panVatNo: "",
              email: "",
              deliveryHours: "",
            }}
            onSubmit={(values) => register(values)}
            validationSchema={validationSchema}
          >
            <View style={styles.profile}>
              <FormImagePicker name="images" />
            </View>

            <Text style={styles.FormText}>Thumbnail Image:</Text>
            <FormImagePicker name="placeholder" />

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
              keyboardType="number-pad"
            />
            <FormField
              autoCorrect={false}
              icon="file"
              name="panVatNo"
              placeholder="PAN/VAT No."
              secureTextEntry
              textContentType="password"
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

            <SubmitButton title="Save Changes" />
            {/* <SubmitButton
              title="Save Changes"
              onPress={() => {
                navigation.goBack;
              }}
            /> */}

            {/* <Pressable style={styles.saveButton} onPress={() => console.log("message received")}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
                Save Changes
              </Text>
            </Pressable> */}
          </Form>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.screen,
    // alignItems: "center",
    // marginTop: 50,
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
    marginVertical: 20,
    marginHorizontal: 20,
  },

  profile: {
    paddingLeft: 100,
  },

  FormText: {
    color: defaultStyles.colors.medium,
    fontSize: 18,
    marginTop: 10,
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
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },
});
