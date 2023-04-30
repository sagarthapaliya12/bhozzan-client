import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../config/colors";
import { getAllRestaurants, refuteRestaurant } from "../../screens/Restaurant/restaurantSlice";
import { useNavigation } from "@react-navigation/native";
import { setRestaurantSearch } from "../../redux/ui/uiSlice";
import profilePic from "../../assets/App-Logos.png";
import { Entypo } from "@expo/vector-icons";
import updateAddress from "../../utils/getRestaurantListWithAddress";

const { width } = Dimensions.get("window");

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const restaurants = useSelector((state) => state.restaurantSlice.restaurantList);

  const deleteRow = (_rowMap, rowKey) => {
    dispatch(refuteRestaurant(rowKey));
  };

  const [updatedRestaurant, setUpdatedRestaurant] = useState([]);
  useEffect(() => {
    (async () => {
      const newRestaurantList = await updateAddress(restaurants, "RestaurantsList");
      setUpdatedRestaurant(newRestaurantList);
    })();
  }, [restaurants]);

  const VisibleItem = ({
    data,
    rowHeightAnimatedValue,
    // removeRow,
    // leftActionState,
    // rightActionState,
  }) => {
    return (
      <Animated.View style={[styles.rowFront, { height: rowHeightAnimatedValue }]}>
        <TouchableHighlight
          style={styles.rowFrontVisible}
          onPress={() => {
            dispatch(setRestaurantSearch(data.item._id));
            navigation.navigate("RestaurantProfile");
          }}
        >
          <View style={styles.mainContainer}>
            <View style={styles.restaurantDetail}>
              <View style={styles.profileContainer}>
                <Image
                  style={styles.restaurantProfile}
                  source={
                    data.item.profileImageLink ? { uri: data.item.profileImageLink } : profilePic
                  }
                />
              </View>
            </View>

            <View style={{ width: "80%", marginRight: 5 }}>
              <Text style={styles.name}>{data.item.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <Entypo name="location-pin" size={20} color={colors.gray} />
                <Text style={styles.location} numberOfLines={2} ellipsizeMode="tail">{`${
                  data.item.address.street ? `${data.item.address.street},` : ""
                } ${data.item.address.city ? `${data.item.address.city},` : ""} ${
                  data.item.address.city
                }, ${data.item.address.subregion}, ${data.item.address.country}`}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, _rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(80);

    return <VisibleItem data={data} rowHeightAnimatedValue={rowHeightAnimatedValue} />;
  };

  const HiddenItemWithActions = ({
    swipeAnimatedValue,
    leftActionActivated,
    rowActionAnimatedValue,
    rowHeightAnimatedValue,
    onDelete,
  }) => {
    return (
      <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
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
        data={restaurants}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onDelete={() => deleteRow(rowMap, data.item._id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StatusBar backgroundColor="#161B22" barStyle="light-content" />
      <SwipeListView
        // data={restaurants}
        data={updatedRestaurant}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe
        // leftOpenValue={75}
        // leftActivationValue={1000}
        // leftActionValue={0}
        rightOpenValue={-75}
        rightActivationValue={-1000}
        rightActionValue={0}
      />
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
  },
  mainContainer: {
    flexDirection: "row",
    // paddingHorizontal: 10,
    // color: colors.screen,
    // backgroundColor: colors.primary,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.white,
  },
  location: {
    fontSize: 12,
    color: colors.gray,
    maxWidth: 270,
  },
});
