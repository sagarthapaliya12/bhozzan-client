import React from "react";
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

const validationSchema = Yup.object().shape({
  foodName: Yup.string().required().min(3).label("Food Name"),
  foodPrice: Yup.number().required().label("Food Price"),
});

const pizzas = [
  { id: "1", foodName: "Chicken Pizza", foodPrice: 400 },
  { id: "2", foodName: "Mushroom Pizza", foodPrice: 600 },
  { id: "3", foodName: "Sausage Pizza", foodPrice: 500 },
];

const EditMenu = () => {
  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            {pizzas.map((pizza) => {
              return (
                <Form
                  key={pizza.id}
                  initialValues={{
                    foodName: pizza.foodName,
                    foodPrice: pizza.foodPrice,
                  }}
                  // onSubmit={(values) => register(values)}
                  validationSchema={validationSchema}
                >
                  <Text style={styles.text}>Food Name:</Text>
                  <FormField
                    autoCorrect={false}
                    // icon="account"
                    // placeholder="Food Name"
                    name="foodName"
                    // value={}
                  />
                  <Text style={styles.text}>Price:</Text>
                  <FormField
                    autoCorrect={false}
                    // icon="lock"
                    // placeholder="Food Price"
                    name="foodPrice"
                  />
                  <Divider
                    style={{ backgroundColor: colors.secondary, height: 2, marginTop: 10, marginBottom: 25 }}
                  />
                </Form>
              );
            })}
            <Pressable style={styles.saveButton} onPress={() => console.log("Oh yah giggity")}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
                Save Changes
              </Text>
            </Pressable>
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
