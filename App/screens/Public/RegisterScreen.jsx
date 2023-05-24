import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import "yup-phone";
import Screen from "../../components/Screen";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import SubmitButton from "../../components/forms/SubmitButton";
import defaultStyles from "../../config/styles";
import { registerUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import MessagePopUpModal from "../../components/MessagePopUpModal";
import { toggleShowMessageModal } from "../../redux/ui/uiSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormikContext } from "formik";
import * as Location from "expo-location";
import ChooseLocationButton from "../../components/ChooseLocationButton";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(3).label("First Name"),
  lastName: Yup.string().required().min(3).label("Last Name"),

  phoneNumber: Yup.string()
    .phone("NP", true, "${path} is invalid")
    .required()
    .label("Phone Number"),

  // address: Yup.object().required(),

  password: Yup.string().required().min(6).max(14).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .min(6)
    .max(14)
    .oneOf([Yup.ref("password")], "passwords do not match")
    .label("Password"),
});

function RegisterScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  // const { setFieldValue } = useFormikContext();

  const status = useSelector((state) => state.authSlice.status);
  const address = route.params?.address;

  // useEffect(() => {
  //   // setFieldValue("address", address);
  // }, [address]);

  useEffect(() => {
    if (status === "success") dispatch(toggleShowMessageModal(true));
  }, [status]);

  const register = (values) => {
    // console.log("Address", address);
    values = { ...values, address };
    console.log("Values", values);
    dispatch(registerUser(values));
  };

  const [markerAddress, setMarkerAddress] = useState(null);
  useEffect(() => {
    if (address) {
      (async () => {
        try {
          const address = await Location.reverseGeocodeAsync(address);
          setMarkerAddress(address[0]);
        } catch (err) {
          console.log("Map Error", err);
        }
      })();
    }
  }, [address]);

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/App-Logos.png")} style={styles.logo}></Image>
          </View>

          <View style={styles.formContainer}>
            <Form
              initialValues={{
                firstName: "",
                lastName: "",
                password: "",
                confirmPassword: "",
                phoneNumber: "",
                address: {},
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => register(values)}
              // setFieldValue={setFieldValue}
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
              {/* <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="city"
                name="address"
                placeholder="Address"
              /> */}
              {/* <FormField name="address" /> */}
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
              <ChooseLocationButton
                address={address}
                markerAddress={markerAddress}
                subject="registerUser"
              />

              {/* <TouchableOpacity
                style={{
                  borderWidth: 1,
                  padding: 8,
                  marginVertical: 8,
                  borderRadius: 10,
                  borderColor: colors.lightGray,
                }}
                name="address"
                onPress={() => navigation.navigate("ChooseLocation", { subject: "Register" })}
              >
                <View style={{ flexDirection: "row", alignItems: "center", overflow: "hidden" }}>
                  <Entypo name="location-pin" size={40} color={colors.white} />
                  <Text style={{ color: colors.white }} numberOfLines={1}>
                    {address
                      ? markerAddress
                        ? `${markerAddress.street ? `${markerAddress.street},` : ""} ${
                            markerAddress.city ? `${markerAddress.city},` : ""
                          } ${markerAddress.city}, ${markerAddress.subregion}, ${
                            markerAddress.country
                          }`
                        : `${address.latitude} ${address.longitude}`
                      : "Choose Address"}
                  </Text>
                </View>
              </TouchableOpacity> */}
              <SubmitButton title="Register" onPress={() => navigation.navigate("LoginScreen")} />
            </Form>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  color: defaultStyles.colors.medium,
                }}
              >
                Already have an account?&nbsp;
              </Text>
              <Pressable onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.text}>Login</Text>
              </Pressable>
            </View>
          </View>

          <Pressable onPress={() => navigation.navigate("RestaurantSignup")}>
            <Text style={defaultStyles.link}>Register Your Restaurant Here</Text>
          </Pressable>
        </View>
        <MessagePopUpModal parent="RegisterScreen" subject="auth" />
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
    marginTop: 30,
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
