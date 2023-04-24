import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import "yup-phone";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import defaultStyles from "../../config/styles";
import colors from "../../config/colors";
import FormImagePicker from "../../components/forms/FormImagePicker";
import SubmitButton from "./../../components/forms/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantDetails,
  getRestaurantUserId,
  updateRestaurantDetails,
} from "./restaurantSlice";
import { uploadFiles } from "../../helpers/uploadHelper";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  // profilePicture: Yup.string().required(),

  // thumbnailPicture: Yup.string().required(),

  name: Yup.string().required().min(3).label("Restaurant Name"),

  description: Yup.string().label("Description"),

  address: Yup.string().required().min(4).label("Location"),

  phoneNumber: Yup.string()
    .phone("NP", true, "${path} is invalid")
    .required()
    .label("Phone Number"),

  PAN: Yup.string().min(9).max(9).label("Pan/Vat No."),

  // email: Yup.string().email().label("Email"),

  // deliveryHours: Yup.string().min(6).label("Delivery Hours"),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const restaurantId = useSelector((state) => state.restaurantSlice.restaurantUserId);
  const restaurantUser = useSelector((state) => state.restaurantSlice.restaurantUser);

  useEffect(() => {
    dispatch(getRestaurantUserId());
    dispatch(getRestaurantDetails(restaurantId));
  }, [restaurantId]);

  const register = async (details) => {
    if (details.profilePicture) {
      const profileImageLink = await uploadFiles(details.profilePicture);
      details = { ...details, profileImageLink };
    }
    if (details.thumbnailPicture) {
      const imageLink = await uploadFiles(details.thumbnailPicture);
      details = { ...details, imageLink };
    }
    try {
      const res = await dispatch(updateRestaurantDetails(details)).unwrap();
      if (res) {
        navigation.navigate("Feed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <View style={styles.formContainer}>
          <Form
            initialValues={{
              profilePicture: null,
              thumbnailPicture: null,
              name: restaurantUser.name,
              description: "",
              address: restaurantUser.address,
              phoneNumber: restaurantUser.primaryPhoneNumber?.toString(),
              PAN: restaurantUser.PAN.toString(),
              // email: "",
              // deliveryHours: "",
            }}
            onSubmit={(values) => register(values)}
            validationSchema={validationSchema}
          >
            <View style={styles.imageArea}>
              <View style={styles.profile}>
                <FormImagePicker name="profilePicture" dimension={{ width: 93, height: 93 }} />
              </View>
              <Text style={styles.FormText}>Profile Picture</Text>
            </View>

            <View style={styles.imageArea}>
              <View style={styles.thumbnail}>
                <FormImagePicker
                  name="thumbnailPicture"
                  dimension={{ width: width - 80 - 5, height: width / 2.2 - 5 }}
                />
              </View>
              <Text style={styles.FormText}>Thumbnail Image</Text>
            </View>

            <FormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Restaurant Name"
            />
            <FormField autoCorrect={false} icon="city" name="address" placeholder="Location" />
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
              name="PAN"
              placeholder="PAN/VAT No."
              // secureTextEntry
              // textContentType="password"
            />
            {/* <FormField
              autoCorrect={false}
              icon="email"
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
            /> */}
            {/* <FormField
              autoCorrect={false}
              icon="clock"
              name="deliveryHours"
              placeholder="Delivery Hours"
            /> */}

            <FormField
              autoCorrect={false}
              icon="account"
              name="description"
              placeholder="Description"
            />
            <SubmitButton title="Save Changes" />
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
    alignItems: "center",
  },

  imageArea: {
    display: "flex",
    marginBottom: 25,
    alignItems: "center",
  },

  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: colors.secondary,
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  thumbnail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: colors.secondary,
    width: width - 80,
    height: width / 2.2,
    borderRadius: 9,
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
