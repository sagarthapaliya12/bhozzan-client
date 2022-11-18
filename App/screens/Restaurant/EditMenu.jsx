import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableHighlight, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Divider } from "react-native-paper";
import * as Yup from "yup";
import "yup-phone";

import Screen from "../../components/Screen";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import defaultStyles from "../../config/styles";
// import api from "../../helpers/axios";
import colors from "../../config/colors";
import { updateDish } from "./restaurantSlice";
import { SubmitButton } from "../../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Food Name"),
  price: Yup.number().required().label("Food Price"),
});

const EditMenu = () => {
  const dispatch = useDispatch();
  const handleSubmit = (updatedDishInfo) => {
    dispatch(updateDish({ id: dishToUpdate._id, dish: updatedDishInfo }));
  };
  const dishToUpdate = useSelector((state) => state.restaurantSlice.dishToUpdate);
  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                name: dishToUpdate.name,
                category: dishToUpdate.category,
                price: `${dishToUpdate.price}`,
              }}
              onSubmit={(dish) => handleSubmit(dish)}
              validationSchema={validationSchema}
            >
              <Text style={styles.text}>Dish Name:</Text>
              <FormField
                autoCorrect={false}
                // icon="account"
                // placeholder="Food Name"
                name="name"
                // value={}
              />
              <Text style={styles.text}>Category:</Text>
              {/* this should be a dropdown */}
              <FormField autoCorrect={false} name="category" />
              <Text style={styles.text}>Price:</Text>
              <FormField
                autoCorrect={false}
                // icon="lock"
                // placeholder="Food Price"
                name="price"
              />
              <Divider
                style={{
                  backgroundColor: colors.secondary,
                  height: 2,
                  marginTop: 10,
                  marginBottom: 25,
                }}
              />
              <SubmitButton title="Save Changes" />
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default EditMenu;

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
    fontSize: 18,
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
