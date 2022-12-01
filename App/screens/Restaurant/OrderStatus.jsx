import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
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
  console.log(status);
  const orders = useSelector((state) => state.orderSlice.orders);
  console.log(orders);

  useEffect(() => {
    dispatch(getOrders(status));
    // setListData(
    //   orders.map((order) => ({
    //     key: order._id,
    //     dishes: order.dishes,
    //   }))
    // );
  }, [status, isFocused]);

  // console.log("List Data: ", listData);

  const acceptRow = (_rowMap, orderId) => {
    {
      console.log("This restaurant is accepted", orderId);
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
    const { data, rowHeightAnimatedValue} = props;

    return (
      <Animated.View style={[styles.rowFront, 
      // { height: rowHeightAnimatedValue }
      ]}>
        <TouchableHighlight style={styles.rowFrontVisible}>
          <View style={styles.mainContainer}>
            {/* {console.log("Test: ", data.item.dishes)} */}

            {data?.item.dishes.map((dish) => {
              return (
                <View key={dish.dishId._id}>
                  <Text style={styles.name}>Name: {dish.dishId.name}</Text>
                  <Text style={styles.location}>Quantity: {dish.quantity}</Text>
                </View>
              );
            })}
            <Text style={{ color: "white" }}>Total Price: {data.item.totalPrice}</Text>
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

  const HiddenItemWithActions = (props) => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onAccept,
      onDelete,
    } = props;

    return (
      <Animated.View
        style={[
          styles.rowBack,
          // { height: rowHeightAnimatedValue }
        ]}
      >
        {(!rightActionActivated && status === "pending" && (
          <TouchableOpacity style={[styles.frontLeftBtn]} onPress={onAccept}>
            <MaterialCommunityIcons
              name="checkbox-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )) ||
          (status === "accepted" && (
            <TouchableOpacity style={[styles.frontLeftBtn]} onPress={onAccept}>              
              <Text>Dispatch</Text>
            </TouchableOpacity>
          ))}

        {(!leftActionActivated && status === "pending" && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={onDelete}
          >
            <MaterialCommunityIcons name="trash-can-outline"  style={styles.trash} size={25} color="#fff" />
          </TouchableOpacity>
        )) ||
          (status === "accepted" && (
            <TouchableOpacity
              style={[
                styles.backRightBtn,
                styles.backRightBtnRight,
                { backgroundColor: colors.secondary },
              ]}
              onPress={onDelete}
            >            
              <Text>Serve</Text>
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
        // disableRightSwipe
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
  mainContainer: {
    flexDirection: "column",
    color: colors.screen,
  },
  restaurantDetail: {
    flexDirection: "column",
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: colors.screen,
    borderRadius: 5,
    // height: 80,
    margin: 5,
    marginBottom: 10,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: colors.screen,
    borderRadius: 5,
    // height: 80,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: colors.screen,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    height: 80,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 75,
  },
  frontLeftBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
    backgroundColor: "green",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    height: 80,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    // height: 25,
    // width: 25,
    marginRight: 7,
    overflow: "hidden",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF",
  },
  location: {
    fontSize: 12,
    color: "#999",
  },
});
