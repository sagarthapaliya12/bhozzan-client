import * as Location from "expo-location";

const updateAddress = async (list, subject) => {
  const tempList = list.map((item) => ({ ...item })); //shift to tempList since objects are passed by reference which changes the original value
  for (const item of tempList) {
    if (subject === "RestaurantsList") {
      const markerAddress = await Location.reverseGeocodeAsync(item.address);
      item.address = markerAddress[0];
    }
    if (subject === "BrowseCategory") {
      const markerAddress = await Location.reverseGeocodeAsync(item.restaurant.address);
      item.restaurant.address = markerAddress[0];
    }
  }
  return tempList;
};

export default updateAddress;
