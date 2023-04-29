import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import colors from "../../config/colors";
import { SwipeListView } from "react-native-swipe-list-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { acceptOrder, rejectOrder, dispatchOrder, serveOrder, getOrders } from "./orderSlice";
import { useIsFocused } from "@react-navigation/native";

const OrderStatus = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const status = useSelector((state) => state.orderSlice.orderStatusState);
  const orders = useSelector((state) => state.orderSlice.orders);

  useEffect(() => {
    dispatch(getOrders(status));
  }, [status, isFocused]);

  const acceptRow = (_rowMap, orderId) => {
    {
      // console.log("This restaurant is accepted", orderId);
      status === "pending" && dispatch(acceptOrder(orderId));
    }

    {
      // console.log("This order is dispatched", orderId);
      status === "accepted" && dispatch(dispatchOrder(orderId));
    }
  };

  const deleteRow = (_rowMap, orderId) => {
    {
      console.log("This restaurant is rejected", orderId);
      status === "pending" && dispatch(rejectOrder(orderId));
    }
    {
      // console.log("This order is served", orderId);
      status === "accepted" && dispatch(serveOrder(orderId));
    }
  };

  const VisibleItem = (props) => {
    const { data, rowHeightAnimatedValue } = props;

    return (
      <Animated.View
        style={[
          styles.rowFront,
          // { height: rowHeightAnimatedValue }
        ]}
      >
        <TouchableHighlight style={styles.rowFrontVisible}>
          <View style={styles.mainContainer}>
            <View style={styles.orders}>
              {data?.item.dishes.map((dish) => {
                return (
                  <View key={dish.dishId._id} style={styles.order}>
                    <Text style={styles.dishName}>{dish.dishId.name}</Text>
                    <Text style={styles.quantity}>Qty: {dish.quantity}</Text>
                  </View>
                );
              })}
            </View>
            <Text
              style={{ color: colors.secondary, fontSize: 18 }}
            >{`Rs. ${data.item.totalPrice}`}</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    // const rowHeightAnimatedValue = new Animated.Value(80);
    return (
      <VisibleItem
        data={data}
        // rowHeightAnimatedValue={rowHeightAnimatedValue}
      />
    );
  };

  const HiddenItemWithActions = ({
    // swipeAnimatedValue,
    leftActionActivated,
    rightActionActivated,
    // rowActionAnimatedValue,
    // rowHeightAnimatedValue,
    onAccept,
    onDelete,
  }) => {
    return (
      <Animated.View
        style={[
          styles.rowBack,
          // { height: rowHeightAnimatedValue }
        ]}
      >
        {(!rightActionActivated && status === "pending" && (
          <TouchableOpacity style={styles.frontLeftBtn} onPress={onAccept}>
            <MaterialCommunityIcons
              name="checkbox-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )) ||
          (status === "accepted" && (
            <TouchableOpacity style={styles.frontLeftBtn} onPress={onAccept}>
              <Text style={{ color: colors.white, fontWeight: "700" }}>Dispatch</Text>
            </TouchableOpacity>
          ))}

        {(!leftActionActivated && status === "pending" && (
          <TouchableOpacity style={styles.backRightBtn} onPress={onDelete}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              style={styles.trash}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        )) ||
          (status === "accepted" && (
            <TouchableOpacity
              style={[styles.backRightBtn, { backgroundColor: colors.secondary }]}
              onPress={onDelete}
            >
              <Text style={{ color: colors.screen, fontWeight: "700" }}>Serve</Text>
            </TouchableOpacity>
          ))}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(20);
    // const rowHeightAnimatedValue = new Animated.Value(80);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        // rowHeightAnimatedValue={rowHeightAnimatedValue}
        onAccept={() => acceptRow(rowMap, data.item._id)}
        onDelete={() => deleteRow(rowMap, data.item._id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StatusBar backgroundColor="#161B22" barStyle="light-content" />
      <SwipeListView
        data={orders}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        disableLeftSwipe={
          status === "rejected" || status === "otw" || status === "served" || status === "delivered"
        }
        disableRightSwipe={
          status === "rejected" || status === "otw" || status === "served" || status === "delivered"
        }
        leftActionValue={75}
        rightActionValue={-75}
      />
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
  },

  restaurantDetail: {
    flexDirection: "column",
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: colors.screen,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  frontLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    backgroundColor: "green",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    backgroundColor: "red",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    right: 0,
  },
  // trash: {
  //   marginRight: 7,
  //   overflow: "hidden",
  // },
  rowFront: {
    backgroundColor: colors.screen,
    borderRadius: 5,
    margin: 5,
    marginBottom: 10,
    shadowColor: colors.lightGray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: colors.screen,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  mainContainer: {
    flexDirection: "row",
    color: colors.screen,
    justifyContent: "space-between",
    alignItems: "center",
  },
  orders: { flexDirection: "column" },
  order: { marginVertical: 10 },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF",
  },
  quantity: {
    fontSize: 14,
    color: colors.gray,
  },
});
