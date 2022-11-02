import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from "react-native";
import Categories from "../../../datas/categoriesList";
import colors from "../../../config/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { changeCategoryState } from "../../../screens/Restaurant/restaurantSlice";

const BrowseCategories = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = (categoryName) => {
    dispatch(changeCategoryState(categoryName));
    navigation.navigate("BrowseCategory");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Categories</Text>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Categories.map((item) => {
            return (
              <TouchableWithoutFeedback key={item.id} onPress={() => handlePress(item.value)}>
                <View style={styles.itemContainer}>
                  <View style={styles.circularBackground}>
                    <Image style={styles.icon} source={item.img} />
                  </View>
                  <Text style={styles.categoryName}>{item.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default BrowseCategories;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    margin: 10,
  },
  circularBackground: {
    backgroundColor: colors.gray,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  icon: {
    width: 50,
    height: 50,
  },
  categoryName: {
    color: colors.gray,
    paddingTop: 10,
  },
  itemContainer: {
    alignItems: "center",
    borderRadius: 25,
    marginHorizontal: 10,
  },
});
