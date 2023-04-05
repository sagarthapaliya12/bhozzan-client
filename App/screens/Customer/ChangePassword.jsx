import { View, Text } from "react-native";
import React from "react";
import Screen from "../../components/Screen";

const ChangePassword = () => {
  return (
    <Screen>
      <Text>ChangePassword</Text>
      {/* <Form
              initialValues={{
                oldPassword: "",
                confirmPassword: "s",
                confirmNewPassword:"",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => register(values)}
            ></Form> */}
    </Screen>
  );
};

export default ChangePassword;
