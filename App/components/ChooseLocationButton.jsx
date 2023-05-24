import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChooseLocationButton = ({ address, markerAddress, subject }) => {
  const navigation = useNavigation();

  //   const handleNavigation = () => {
  // if (subject === "registerRestaurant")
  //   navigation.navigate("ChooseLocation", { subject: "Register" });
  // else if (subject === "registerRestaurant")

  // switch (subject) {
  //   case "registerUser":
  //     navigation.navigate("ChooseLocation", { subject: "Register" });
  //     break;
  //   case "registerRestaurant":
  //     console.log("Selected fruit: banana");
  //     break;
  //   default:
  //     console.log("Unknown fruit");
  // }
  //   };

  return (
    <TouchableOpacity
      style={styles.container}
      name="address"
      onPress={() => navigation.navigate("ChooseLocation", { subject })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", overflow: "hidden" }}>
        <Entypo name="location-pin" size={40} color={colors.white} />
        <Text style={{ color: colors.white }} numberOfLines={1}>
          {address
            ? markerAddress
              ? `${markerAddress.street ? `${markerAddress.street},` : ""} ${
                  markerAddress.city ? `${markerAddress.city},` : ""
                } ${markerAddress.city}, ${markerAddress.subregion}, ${markerAddress.country}`
              : `${address.latitude} ${address.longitude}`
            : "Choose Address"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChooseLocationButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: colors.lightGray,
  },
});
