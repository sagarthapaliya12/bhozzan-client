import * as Location from "expo-location";

const getMyLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    return location;
  } catch (err) {
    console.log("Location Error", err);
  }
};

export default getMyLocation;
