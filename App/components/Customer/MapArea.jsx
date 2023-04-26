import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { markers } from "../../datas/MapData";
import { mapStyle } from "../../config/mapStyles";
import getMyLocation from "../../utils/getMyLocation";
import colors from "../../config/colors";
import { Button } from "react-native-paper";

// import StarRating from '../components/StarRating';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapArea = () => {
  const initialMapState = {
    markers,
    categories: [
      {
        name: "Fastfood Center",
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
      },
      {
        name: "Restaurant",
        icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: "Dineouts",
        icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />,
      },
      {
        name: "Snacks Corner",
        icon: <MaterialCommunityIcons name="food" style={styles.chipsIcon} size={18} />,
      },
      {
        name: "Hotel",
        icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      },
    ],
    region: {
      latitude: 27.625349,
      longitude: 85.556063,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
  };

  const [state, setState] = useState(initialMapState);

  const [mapArea, setMapArea] = useState(null);
  const [markerCoord, setMarkerCoord] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markerAddress, setMarkerAddress] = useState(null);
  // console.log("sds", markerAddress);

  useEffect(() => {
    (async () => {
      try {
        const currentLocation = await getMyLocation();

        setMapArea({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setMarkerCoord({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (err) {
        console.log("Error: ", err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const address = await Location.reverseGeocodeAsync(markerCoord);
      setMarkerAddress(address[0]);
    })();
  }, [markerCoord]);

  const confirmLocation = () => {
    console.log("Submit", markerCoord);
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      // if (index >= state.markers.length) {
      //   index = state.markers.length - 1;
      // }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          // const { coordinate } = state.markers[index];
          // _map.current.animateToRegion(
          //   {
          //     ...coordinate,
          //     latitudeDelta: state.region.latitudeDelta,
          //     longitudeDelta: state.region.longitudeDelta,
          //   },
          //   350
          // );
        }
      }, 10);
    });
  });

  // const interpolations = state.markers.map((marker, index) => {
  //   const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];

  //   const scale = mapAnimation.interpolate({
  //     inputRange,
  //     outputRange: [1, 1.5, 1],
  //     extrapolate: "clamp",
  //   });

  //   return { scale };
  // });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={mapArea}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
        onPress={(event) => setMarkerCoord(event.nativeEvent.coordinate)}
        // onRegionChange={(region) => console.log(region)}
      >
        {/* {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../../assets/mapMarker.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })} */}
        {/* <Marker coordinate={testLocation} title="Marker"></Marker> */}
        <Marker
          title="Marker"
          coordinate={markerCoord}
          draggable={true}
          // onDragStart={(e) => console.log("Test: ", e.nativeEvent.coordinate)}
          // onDragEnd={(e) => {
          //   console.log("Test: ", e.nativeEvent.coordinate);
          //   setMarkerCoord(e.nativeEvent.coordinate);
          // }}
        />
      </MapView>
      {/* <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View> */}
      {/* <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {/* <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image source={marker.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#FF6347",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#FF6347",
                      },
                    ]}
                  >
                    Have a Look
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView> */}
      {markerAddress && (
        <View
          style={{
            backgroundColor: colors.white,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 10,
            paddingVertical: 15,
            margin: 15,
            borderRadius: 8,
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 10,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Entypo name="location-pin" size={24} color="black" />
            <Text style={{ color: colors.black, fontSize: 17 }}>{`${
              markerAddress.street ? `${markerAddress.street},` : ""
            } ${markerAddress.city ? `${markerAddress.city},` : ""} ${markerAddress.city}, ${
              markerAddress.subregion
            }, ${markerAddress.country}`}</Text>
          </View>
          <Button
            style={{
              backgroundColor: colors.secondary,
              color: colors.screen,
              borderRadius: 15,
              height: 50,
              justifyContent: "center",
              width: "100%",
            }}
            onPress={confirmLocation}
          >
            <Text style={{ color: colors.screen, fontSize: 20, fontWeight: "700" }}>
              Confirm Location
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default MapArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
