import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native";
import colors from "../../config/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSearch } from "../../screens/Customer/customerSlice";
import { setRestaurantSearch } from "../../redux/ui/uiSlice";
import profilePic from "../../assets/App-Logos.png";

export default function SearchDropdown(props) {
  const { dataSource } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {dataSource.length ? (
          dataSource.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setRestaurantSearch(item._id));
                  navigation.navigate("RestaurantProfile");
                }}
                style={styles.itemView}
                key={index}
              >
                <View style={styles.searchList}>
                  {/* <FontAwesome5 name="hotel" size={20} color={colors.darkGray} /> */}
                  <Image
                    style={styles.restaurantProfile}
                    source={item.profileImageLink ? { uri: item.profileImageLink } : profilePic}
                  />
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noResultView}>
            <Text style={styles.noResultText}>No search items matched</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "100%",
    // left: 0,
    // right: 0,
    // bottom: 0,
    backgroundColor: colors.darkGray,
    zIndex: 100,
    elevation: 100,
    width: "90%",
    // justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    // backgroundColor: "red",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  itemView: {
    // backgroundColor: "white",
    backgroundColor: colors.gray,

    height: 50,
    width: "100%",
    marginBottom: 3,
    justifyContent: "center",
    borderRadius: 4,
  },
  searchList: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  restaurantProfile: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  itemText: {
    fontSize: 16,
    color: "black",
    paddingHorizontal: 10,
  },
  noResultView: {
    alignSelf: "center",
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  noResultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
