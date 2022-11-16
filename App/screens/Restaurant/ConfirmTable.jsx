import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Screen from "../../components/Screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Form from "../../components/forms/Form";
import defaultStyles from "../../config/styles";
import * as Yup from "yup";
import FormField from "../../components/forms/FormField";
import SubmitButton from "../../components/forms/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { addNewTable } from "./restaurantSlice";

const validationSchema = Yup.object().shape({
  price: Yup.number().required().label("Price"),
  name: Yup.string().required().min(1).label("Name"),
});

const ConfirmTable = () => {
  const dispatch = useDispatch();
  const noOfSeats = useSelector((state) => state.restaurantSlice.noOfSeats);

  const addTable = (info) => {
    const tableInfo = { seats: noOfSeats, rate: info.price, name: info.name };
    console.log("Info: ", tableInfo);
    dispatch(addNewTable(tableInfo));
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                price: "",
                name: "",
              }}
              onSubmit={(info) => {
                addTable(info);
              }}
              validationSchema={validationSchema}
            >
              <Text style={styles.text}>No. of Seats: {noOfSeats}</Text>
              <Text style={styles.text}>Table Rate: &#40;per hour&#41;</Text>
              <FormField autoCorrect={false} name="price" />
              <Text style={styles.text}>Table Name:</Text>
              <FormField autoCorrect={false} name="name" />
              <View style={{ marginTop: 15 }}>
                <SubmitButton title="Add Table" />
              </View>
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default ConfirmTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.screen,
    alignItems: "center",
    padding: 20,
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
});
