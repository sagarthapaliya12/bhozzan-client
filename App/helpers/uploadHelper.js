import { Alert } from "react-native";

export const uploadFiles = async (image) => {
  try {
    const file = {
      uri: image,
      type: `test/${image.split(".").pop()}`,
      name: `test.${image.split(".").pop()}`,
    };

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_NAME); //make sure unsigned upload preset is created in your cloudinary
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "post",
      body: formData,
    });

    try {
      const { secure_url } = await res.json();
      return secure_url;
    } catch (error) {
      console.log("Error Uploading: ", error);
    }
  } catch (error) {
    console.log("Error Uploading: ", error);
    Alert.alert("An Error Occured While Uploading");
    throw new Error("Error uploading the files");
  }
};
