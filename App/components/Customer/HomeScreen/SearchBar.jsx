import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { React, useState } from "react";
import colors from "../../../config/colors";
import RestaurantProfile from "../../../screens/Customer/RestaurantProfile";
import SearchDropdown from "../../shared/SearchDropdown";

export default function SearchBar(props) {
  const [dataSource] = useState([
    "kfc",
    "thakali bhansa",
    "newari khaja",
    "narayan dai ko momo",
    "angan sweets",
    "biryani house",
    "italiyan bakery",
    "sheikh curry restro",
    "durbar hotel",
    "hotel shangri la",
    "bajeko sukuti",
    "bota momo",
  ]);
  const [filtered, setFiltered] = useState(dataSource);
  const [searching, setSearching] = useState(false);

  const onSearch = (text) => {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = dataSource.filter((item) => {
        if (item.match(temp)) return item;
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(dataSource);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search Restaurants" style={styles.input} onChangeText={onSearch} />
      <FontAwesome name="search" size={24} style={styles.icon} />
      {searching && (
        <SearchDropdown
          onPress={(item) => {
            setSearching(false);
            props.navigation.navigate("dataSource", { item: item });
          }}
          dataSource={filtered}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#f4eded",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    color: "#000",
    borderWidth: 1,
  },
  icon: {
    position: "absolute",
    top: 12,
    right: 20,
    color: colors.darkGray,
  },
});
