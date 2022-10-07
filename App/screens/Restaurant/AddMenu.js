import React from "react";
import { View, Text, StyleSheet, TouchableHighlight, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectList from "react-native-dropdown-select-list";
import { useState } from "react";
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

  foodPrice: Yup.string().required().min(6).max(14).label("Food Price"),
});

const data = [
  { key: "1", value: "Dessert" },
  { key: "2", value: "Fast Food" },
  { key: "3", value: "Soups" },
  { key: "4", value: "Salads" },
  { key: "5", value: "Snacks" },
  { key: "6", value: "Drinks" },
];

const AddMenu = () => {
  const [selected, setSelected] = useState("");

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                foodName: "",
                foodPrice: "",
              }}
              //   onSubmit={(values) => register(values)}
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
              <Text style={styles.text}>Category:</Text>
              <SelectList
                data={data}
                setSelected={setSelected}
                dropdownStyles={{ backgroundColor: colors.screen, color: "green" }}
                dropdownItemStyles={{ marginHorizontal: 0 }}
                dropdownTextStyles={{ color: "white" }}
                placeholder="Select Category"
              />

              <Pressable style={styles.saveButton} onPress={() => console.log("Oh yah giggity")}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
                  Add Food
                </Text>
              </Pressable>
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default AddMenu;

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
