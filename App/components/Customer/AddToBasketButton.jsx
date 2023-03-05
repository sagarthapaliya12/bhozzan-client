import { View, TouchableHighlight, StyleSheet } from "react-native";
import colors from "../../config/colors";
import { Ionicons } from "@expo/vector-icons";
import { addToBasket } from "../../screens/Customer/customerSlice";
import { toggleShowSnackbar } from "../../redux/ui/uiSlice";
import { useDispatch } from "react-redux";

const AddToBasketButton = ({ dishId }) => {
  const dispatch = useDispatch();

  const handleBasket = async () => {
    await dispatch(addToBasket(dishId)).then((res) => {
      if (!res.error) dispatch(toggleShowSnackbar(true));
    });
  };

  return (
    <TouchableHighlight onPress={() => handleBasket(dishId)}>
      <View style={styles.button}>
        <Ionicons name="basket" size={30} color={colors.screen} />
        {/* <Text style={{ color: colors.v }}>&nbsp;Add</Text> */}
      </View>
    </TouchableHighlight>
  );
};

export default AddToBasketButton;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginTop: 5,
    paddingVertical: 5,
    // paddingHorizontal: 10,
    paddingHorizontal: 15,
  },
});

{
  /* <View style={styles.cart}>
                      <AntDesign
                        name="minuscircle"
                        size={24}
                        color={colors.gray}
                        onPress={() => decrementCount()}
                      />
                      <Text style={{ color: colors.gray, margin: 10, fontSize: 20 }}>
                        {noOfItem}
                      </Text>
                      <AntDesign
                        name="pluscircle"
                        size={24}
                        color={colors.gray}
                        onPress={() => incrementCount()}
                      />
                    </View> */
}
