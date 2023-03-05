import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useEffect } from "react";
import colors from "../../../config/colors";
import { getDishesByRestaurantId } from "../../../screens/Restaurant/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import AddToBasketButton from "../AddToBasketButton";
const { height, width } = Dimensions.get("window");

const Menu = () => {
  const dispatch = useDispatch();

  const restaurantId = useSelector((state) => state.customerSlice.searchedRestaurantId);

  const dishes = useSelector((state) => state.restaurantSlice.dishes);

  useEffect(() => {
    dispatch(getDishesByRestaurantId(restaurantId));
  }, [restaurantId]);

  return (
    <View>
      {dishes?.map((item, index) => {
        return (
          <View key={index}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  backgroundColor: colors.gray,
                  height: 2,
                  width: width,
                  position: "absolute",
                  top: 16,
                }}
              />
              <View style={styles.menuContainer}>
                <Text style={styles.title}>{item._id.toUpperCase()}</Text>
              </View>
            </View>
            {item.dishes.map((food) => {
              return (
                <View key={food._id} style={styles.menuItem}>
                  <Text style={{ color: colors.gray, fontSize: 18 }}>{food.name}</Text>
                  <View style={styles.priceCart}>
                    <View>
                      <Text style={{ color: colors.secondary, fontSize: 20 }}>
                        Rs.&nbsp;{food.price}
                      </Text>
                    </View>
                    <AddToBasketButton dishId={food._id} />
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {},
  menuContainer: {
    // backgroundColor: colors.gray,
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: colors.gray,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  priceCart: { alignItems: "center" },
  cart: {
    flexDirection: "row",
    alignItems: "center",
  },
});
