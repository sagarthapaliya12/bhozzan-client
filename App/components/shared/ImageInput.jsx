import React, { useEffect } from "react";
import { View, Image, TouchableWithoutFeedback, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ImageInput = ({ imageUri, onChangeImage, dimension }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.red,
      borderRadius: dimension.width < 100 ? dimension.width : 10,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      height: dimension.height,
      width: dimension.width,
    },
    image: {
      height: "100%",
      width: "100%",
    },
  });

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("Please grant access permission for media library");
  };

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: onChangeImage },
        { text: "No" },
      ]);
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.error({ ImageError: error });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && <MaterialCommunityIcons color={colors.medium} name="camera" size={40} />}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageInput;
