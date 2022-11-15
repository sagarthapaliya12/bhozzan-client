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
import { getOrders } from "./orderSlice";

const OrderStatus = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.orderSlice.orderStatusState);
  const orders = useSelector((state) => state.orderSlice.orders);

  const [listData, setListData] = useState();
  // orders.map((order, index) => ({
  //   key: order._id,

  //   // name: RestaurantList.name,
  //   // location: RestaurantList.location,
  //   // profile: RestaurantList.profile,
  // }))

  // console.l;

  useEffect(() => {
    dispatch(getOrders(status));
    setListData(
      orders.map((order) => ({
        key: order._id,
        dishes: order.dishes,
      }))
    );
  }, [status]);

  // console.log("List Data: ", listData);

  const acceptRow = (rowMap, rowKey) => {
    console.log("This restaurant is accepted", rowKey);
  };

  //   const closeRow = (rowMap, rowKey) => {
  //     if (rowMap[rowKey]) {
  //       rowMap[rowKey].closeRow();
  //     }
  //   };

  const deleteRow = (rowMap, rowKey) => {
    // closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const VisibleItem = (props) => {
    const { data, rowHeightAnimatedValue, removeRow, leftActionState, rightActionState } = props;
    // console.log("data is kk", typeof data, data);

    // console.log(data.hasOwnProperty("_id"));
    // console.log("dishes is here", data.dishes);
    //
    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[
          styles.rowFront,
          // { height: rowHeightAnimatedValue }
        ]}
      >
        <TouchableHighlight
        // style={styles.rowFrontVisible}
        >
          <View style={styles.mainContainer}>
            <View style={styles.restaurantDetail}>
              {/* <View style={styles.profileContainer}>
                <Image style={styles.restaurantProfile} source={data.item.profile} />
              </View> */}
            </View>
            {console.log("Test: ", data.item.dishes)}
            {/* {data.item.dishes.map((dish) => (
              <View>
                <Text style={styles.name} numberOfLines={1}>
                  {dish.dishId}
                </Text>
                <Text></Text>
              </View>
            ))} */}

            {data.item.dishes.map((dish) => {
              return (
                <View style={styles.VisibleData}>
                  <Text style={styles.name} numberOfLines={1}>
                    Name: {dish.dishId}
                  </Text>
                  <Text style={styles.location} numberOfLines={1}>
                    Quantity: {dish.quantity}
                  </Text>
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
        removeRow={() => deleteRow(rowMap, data.item.key)}
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
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View
        style={[
          styles.rowBack,
          //  { height: rowHeightAnimatedValue }
        ]}
      >
        {!rightActionActivated && (
          <TouchableOpacity style={[styles.frontLeftBtn]} onPress={onAccept}>
            <MaterialCommunityIcons
              name="checkbox-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {/* {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}
          >
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )} */}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}
          >
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}
            >
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
              >
                <MaterialCommunityIcons name="trash-can-outline" size={25} color="#fff" />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(80);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        // rowHeightAnimatedValue={rowHeightAnimatedValue}
        onAccept={() => acceptRow(rowMap, data.item.key)}
        // onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StatusBar backgroundColor="#161B22" barStyle="light-content" />
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        // disableRightSwipe
        leftActivationValue={100}
        rightActivationValue={-100}
        leftActionValue={0}
        rightActionValue={-100}
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
    // flexDirection: "row",
    color: colors.screen,
  },
  restaurantDetail: {
    flexDirection: "column",
  },
  profileContainer: {
    backgroundColor: colors.gray,
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  VisibleData: {
    // flex: 1,
    flexDirection: "column",
  },
  restaurantProfile: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: colors.white,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: colors.screen,
    borderRadius: 5,
    height: 80,
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
    height: 80,
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
    height: 80,
    paddingRight: 17,
    backgroundColor: "green",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
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
