import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import ImageInput from "../shared/ImageInput";
import ErrorMessage from "./ErrorMessage";

const FormImagePicker = ({ name, dimension }) => {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  const imageUri = values[name];

  const handleChange = (uri) => {
    if (!imageUri) setFieldValue(name, uri);
    else {
      setFieldValue(name, null);
    }
  };

  return (
    <View>
      <ImageInput imageUri={imageUri} onChangeImage={handleChange} dimension={dimension} />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default FormImagePicker;
