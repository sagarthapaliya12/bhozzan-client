import axios from "axios";

export const uploadFiles = async (image, folder) => {

  REACT_APP_CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/bhozzan/image/upload";
  REACT_APP_CLOUD_NAME = "bhozzan";
  REACT_APP_UPLOAD_PRESET = "bhozzan";

  try {
    const file = {
      uri: image,
      type: `test/${image.split(".").pop()}`,
      name: `test.${image.split(".").pop()}`,
    };

    console.log("Image Test", file);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "bhozzan");
    formData.append("cloud_name", "bhozzan");

    const { data } = await axios.post(REACT_APP_CLOUDINARY_URL, formData);

    console.log("test", data);

  } catch (error) {
    throw new Error("Error uploading the files");
  }
};
