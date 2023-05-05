import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../../../config/colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const NearbyRestaurant = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => navigation.navigate("NearbyRestaurant")}>
        <Text style={styles.title}>Nearby Restaurant</Text>
      </TouchableHighlight>
    </View>
  );
};

export default NearbyRestaurant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    marginBottom: 55,
    paddingHorizontal: 10,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    // margin: 10,
    marginBottom: 20,
  },
});
