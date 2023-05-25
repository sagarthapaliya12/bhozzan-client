import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
const { width, height } = Dimensions.get("window");
import table from "../../assets/table.png";
import seats from "../../assets/chair.png";

import Draggable from "../../components/Restaurant/Tables/Draggable";
import DeleteZone from "../../components/Restaurant/Tables/DeleteZone";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import { useDispatch } from "react-redux";
import { addSeats } from "./restaurantSlice";
import { useNavigation } from "@react-navigation/native";

const circleSize = width - 36;
const itemSize = width / 5;
const radius = circleSize / 2 - itemSize / 2;
const center = radius;

const AddSeats = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [movingDraggable, setMovingDraggable] = useState(null);
  const [releaseDraggable, setReleaseDraggable] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setMovingDraggable(null);
    setReleaseDraggable(null);
    return () => {};
  }, [items]);

  const handleSeats = () => {
    var arr = [...items];
    arr.push(seats);
    setItems(arr);
  };

  const confirmTable = () => {
    if (items.length > 0) {
      dispatch(addSeats(items.length));
      navigation.navigate("ConfirmTable");
    }
  };

  const degToRad = (deg) => {
    return (deg * Math.PI) / 180;
  };

  const setup = (index) => {
    const dividedAngle = 360 / items.length;
    const angleRad = degToRad(270 + index * dividedAngle);
    const x = radius * Math.cos(angleRad) + center;
    const y = radius * Math.sin(angleRad) + center;
    return { x, y };
  };

  const onMovingDraggable = (movingDraggable) => {
    setMovingDraggable(movingDraggable);
  };

  const onReleaseDraggable = (releaseDraggable) => {
    setMovingDraggable(null);
    setReleaseDraggable(releaseDraggable);
  };

  const swap = (index1, index2) => {
    var arr = [...items];
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    setItems(arr);
  };

  const deleteItem = (index) => {
    var arr = [...items];
    arr.splice(index, 1);
    setItems(arr);
  };

  //////////////////////////////////////////////////
  //////////////////// Header //////////////////////
  /////////////////////////////////////////////////
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={{ color: colors.secondary, fontSize: 19 }}>No. of Seats: {items.length}</Text>
        <View style={styles.headerBtnContainer}>
          {/* ///////////////////////////////*/}
          {/* ////////// Add Seats //////////*/}
          {/* ///////////////////////////////*/}
          <TouchableOpacity
            style={styles.addSeatsBtn}
            onPress={() => {
              handleSeats();
            }}
          >
            <Feather name="plus" color={"#20232A"} size={24} />
            <Text style={{ marginLeft: 4, fontSize: 16 }}>Add Seats</Text>
          </TouchableOpacity>

          {/* ///////////////////////////////*/}
          {/* /////////// Confirm ///////////*/}
          {/* ///////////////////////////////*/}
          <TouchableOpacity
            style={styles.addTableBtn}
            onPress={() => {
              confirmTable();
            }}
          >
            <Feather name="check" color={"#20232A"} size={24} />
            <Text style={{ marginLeft: 4, fontSize: 16 }}>Confirm Table</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /////////////////////////////////////////
  //////////// Seats > 10 ////////////////
  ///////////////////////////////////////
  const renderLessthan10 = () => {
    return (
      <View style={styles.lessThan10Container}>
        <DeleteZone
          movingDraggable={movingDraggable}
          releaseDraggable={releaseDraggable}
          deleteItem={deleteItem}
        />
        <View style={styles.circleViewContainer}>
          <View style={styles.tableContainer}>
            <Image source={table} style={styles.tableImg} />
          </View>
          {items.map((item, index) => {
            const { x, y } = setup(index);
            return (
              <Draggable
                key={index}
                index={index}
                movingDraggable={movingDraggable}
                onMovingDraggable={onMovingDraggable}
                releaseDraggable={releaseDraggable}
                onReleaseDraggable={onReleaseDraggable}
                swap={swap}
                position={{
                  position: "absolute",
                  left: x,
                  top: y,
                }}
                renderChild={(isMovedOver) => {
                  return (
                    <View
                      style={[isMovedOver && styles.lessThan10ItemMovedOver, styles.lessThan10Item]}
                    >
                      <Image source={seats} style={styles.img} />
                    </View>
                  );
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  /////////////////////////////////////////
  //////////// Seats > 10 ////////////////
  ///////////////////////////////////////
  const render10AndMore = () => {
    return (
      <View style={styles.moreThan10Container}>
        <DeleteZone
          movingDraggable={movingDraggable}
          releaseDraggable={releaseDraggable}
          deleteItem={deleteItem}
        />
        <View style={[styles.tableContainerMoreThan10]}>
          <View style={styles.tableContainer}>
            <Image source={table} style={styles.tableImg} />
          </View>
        </View>
        <View style={styles.squaresViewContainer}>
          {items.map((item, index) => {
            const { x, y } = setup(index);
            return (
              <Draggable
                key={index}
                index={index}
                movingDraggable={movingDraggable}
                onMovingDraggable={onMovingDraggable}
                releaseDraggable={releaseDraggable}
                onReleaseDraggable={onReleaseDraggable}
                swap={swap}
                renderChild={(isMovedOver) => {
                  return (
                    <View
                      style={[isMovedOver && styles.moreThan10ItemMovedOver, styles.moreThan10Item]}
                    >
                      <Image source={seats} style={styles.img} />
                    </View>
                  );
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Screen>
      {/* <SafeAreaView style={styles.safeAreaView}> */}
      {/* <StatusBar backgroundColor={"#20232A"} barStyle="light-content" /> */}
      {/* <View style={styles.viewContainer}> */}
      {renderHeader()}
      <ScrollView
        scrollEnabled={!movingDraggable}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        contentContainerStyle={styles.scrollView}
      >
        {items.length < 10 ? renderLessthan10() : render10AndMore()}
      </ScrollView>
      {/* </View> */}
      {/* </SafeAreaView> */}
    </Screen>
  );
};

export default AddSeats;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#20232A",
  },
  viewContainer: {
    flex: 1,
    width,
    backgroundColor: "#20232A",
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 18,
  },
  header: {
    width,
    alignItems: "center",
    paddingHorizontal: 18,
    marginVertical: 20,
  },
  headerBtnContainer: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 10,
  },
  addSeatsBtn: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  addTableBtn: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  lessThan10Container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: height * 0.2,
  },
  circleViewContainer: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  tableContainerMoreThan10: {
    backgroundColor: colors.secondary,
    width: "90%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  tableContainer: {
    // backgroundColor: colors.secondary,
    // borderRadius: width / 1.5,
    // width: width / 3,
    // height: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  tableImg: {
    width: width / 3,
    height: width / 3,
  },
  centerCircleTxt: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  lessThan10Item: {
    width: itemSize,
    height: itemSize,
    borderRadius: itemSize / 2,
    overflow: "hidden",
  },
  lessThan10ItemMovedOver: {
    borderWidth: 6,
    borderColor: "#FEDC33",
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  moreThan10Container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: height * 0.2,
  },
  myFriendsRecView: {
    width: "90%",
    height: width / 3,
    borderRadius: 12,
    // backgroundColor: "#ff4c6f",
    justifyContent: "center",
    alignItems: "center",
  },
  myFriendsRecViewTxt: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  squaresViewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 16,
  },
  moreThan10Item: {
    width: itemSize,
    height: itemSize,
    borderRadius: 8,
    margin: 6,
    overflow: "hidden",
  },
  moreThan10ItemMovedOver: {
    borderWidth: 6,
    borderColor: "#FEDC33",
  },
});
