import * as Location from "expo-location";

const updateAddress = async (list, subject) => {
  for (const item of list) {
    if (subject === "RestaurantsList") {
      const markerAddress = await Location.reverseGeocodeAsync(item.address);
      item.address = markerAddress[0];
    }
    if (subject === "BrowseCategory") {
      const markerAddress = await Location.reverseGeocodeAsync(item.restaurant.address);
      item.restaurant.address = markerAddress[0];
    }
  }
  return list;
};

export default updateAddress;
