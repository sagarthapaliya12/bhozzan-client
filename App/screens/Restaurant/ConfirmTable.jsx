import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Screen from "../../components/Screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Form from "../../components/forms/Form";
import defaultStyles from "../../config/styles";
import * as Yup from "yup";
import FormField from "../../components/forms/FormField";
import SubmitButton from "../../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  price: Yup.number().required().label("Price"),
  name: Yup.string().required().min(3).label("Name"),
});

const ConfirmTable = () => {
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
              onSubmit={(dish) => {
                console.log("sdcdsc");
                addDish(dish);
              }}
              validationSchema={validationSchema}
            >
              <Text style={styles.text}>Table Price:</Text>
              <FormField autoCorrect={false} name="price" />
              <Text style={styles.text}>Position Description:</Text>
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
