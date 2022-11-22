import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Linking,
} from "react-native";
import Screen from "../../components/Screen";
import QrGenerator from "../../components/Customer/QrGenerator";
import { useSelector } from "react-redux";
import colors from "../../config/colors";
import pizzaHut from "../../assets/pizza-hut.png";
import { Entypo, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const OrderHistoryDetail = () => {
  const orderDetail = useSelector((state) => state.orderSlice.orderHistoryDetail);

  return (
    <Screen>
      <QrGenerator />
      <View>
        <View style={styles.restaurantContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={styles.restaurantImg} source={pizzaHut} />
            <View style={styles.itemDetail}>
              <Text style={styles.restaurantName}>{orderDetail.restaurant.name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Entypo name="location-pin" size={20} color={colors.primary} />
                <Text style={styles.address}>{orderDetail.restaurant.address}</Text>
              </View>
            </View>
          </View>
          <TouchableHighlight
            style={styles.callBtn}
            onPress={() => Linking.openURL(`tel:${orderDetail.restaurant.primaryPhoneNumber}`)}
          >
            <Ionicons name="call" size={30} color="black" />
          </TouchableHighlight>
        </View>

        <View style={styles.dishContainer}>
          <View style={styles.yourOrderContainer}>
            <Text style={styles.yourOrderText}>YOUR ORDERS</Text>
          </View>
          {orderDetail.dishes.map((dish) => {
            return (
              <View key={dish._id} style={styles.dishItem}>
                <View>
                  <Text style={styles.dishTitle}>{dish.name}</Text>
                  <Text style={styles.qtyText}>Quantity: {dish.quantity}</Text>
                  <Text style={styles.qtyText}>Rate: Rs. {dish.rate}</Text>
                </View>
                <Text style={styles.priceText}>Rs. {dish.price}</Text>
              </View>
            );
          })}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>{orderDetail.totalPrice}</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default OrderHistoryDetail;

const styles = StyleSheet.create({
  restaurantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  restaurantImg: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  restaurantName: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 22,
  },
  address: {
    color: colors.gray,
  },
  callBtn: {
    backgroundColor: colors.gray,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dishContainer: {
    paddingHorizontal: 15,
    marginTop: 12,
  },
  yourOrderContainer: {
    alignItems: "center",
    backgroundColor: colors.gray,
    paddingVertical: 5,
  },
  yourOrderText: { fontWeight: "700", fontSize: 16, color: colors.screen },
  dishItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
  dishTitle: {
    color: colors.gray,
    paddingVertical: 2,
    fontSize: 20,
    fontWeight: "600",
  },
  qtyText: {
    color: colors.gray,
    paddingVertical: 2,
    fontWeight: "600",
  },
  priceText: {
    color: colors.secondary,
    fontSize: 20,
  },
  totalContainer: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  totalText: {
    fontWeight: "700",
    fontSize: 22,
    color: colors.screen,
  },
});
