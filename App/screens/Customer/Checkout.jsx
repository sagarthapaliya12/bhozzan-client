import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import colors from "../../config/colors";
import { Divider } from "react-native-paper";
import { useDispatch } from "react-redux";
import Screen from "../../components/Screen";
import { useRoute } from "@react-navigation/native";
import { placeOrder } from "../Restaurant/orderSlice";
import MessagePopUpModal from "../../components/MessagePopUpModal";
import { toggleShowMessageModal } from "../../redux/ui/uiSlice";

const { width } = Dimensions.get("window");

const Checkout = () => {
  const route = useRoute();
  const { order, subTotalToDisplay } = route.params.order;
  const { markerCoord, markerAddress } = route.params.address;

  const dispatch = useDispatch();
  //   const navigation = useNavigation();

  const checkout = async () => {
    const tempOrder = { order, deliveryLocation: markerCoord };
    // console.log("Sfsdf", tempOrder);
    try {
      const res = await dispatch(placeOrder(order)).unwrap();
      if (res) dispatch(toggleShowMessageModal(true));
      // if (!res.error) dispatch(toggleShowMessageModal(true));
    } catch (err) {}
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        {order.map((dish) => {
          return (
            <View key={dish.dishId} style={styles.orderItem}>
              <View>
                <Text style={styles.dishTitle}>{dish.name}</Text>
                <Text style={styles.qtyText}>Qty: {dish.quantity}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.priceText}>Rs.&nbsp;{dish.quantity * dish.price}</Text>
              </View>
            </View>
          );
        })}
        <Divider style={{ backgroundColor: colors.secondary, height: 2 }} />
        <View style={styles.displayTotal}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.subTotalText}>{`Rs. ${subTotalToDisplay}`}</Text>
        </View>

        <View style={styles.addressContainer}>
          <View style={styles.addressTitle}>
            <Entypo name="location-pin" size={28} color={colors.screen} />
            <Text style={{ color: colors.screen, fontSize: 20, fontWeight: 700 }}>
              Delivery Location:
            </Text>
          </View>
          <Text style={{ color: colors.screen, fontSize: 18 }}>{`${
            markerAddress.street ? `${markerAddress.street},` : ""
          } ${markerAddress.city ? `${markerAddress.city},` : ""} ${markerAddress.city}, ${
            markerAddress.subregion
          }, ${markerAddress.country}`}</Text>
        </View>

        <Pressable style={styles.checkoutButton} onPress={checkout}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
            Confirm Order
          </Text>
        </Pressable>
      </ScrollView>
      <MessagePopUpModal parent="Checkout" subject="order" />
    </Screen>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    width: width,
    paddingHorizontal: 20,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  dishTitle: { color: colors.gray, fontSize: 20, fontWeight: 700 },
  qtyText: { color: colors.gray, fontSize: 15 },
  rightContainer: { alignItems: "flex-end", position: "relative" },
  priceText: { color: colors.secondary, fontSize: 20 },
  displayTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginBottom: 30,
  },
  totalText: { color: colors.white, fontWeight: "600", fontSize: 30 },
  subTotalText: { color: colors.secondary, fontWeight: "600", fontSize: 30 },
  checkoutButton: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },

  addressContainer: {
    marginBottom: 10,
    width: "100%",
    marginBottom: 20,
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 8,
  },
  addressTitle: {
    display: "flex",
    flexDirection: "row",
  },
});
