import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import thumbnail from "../../assets/thumbnail.jpg";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "../../config/mapStyles";
import getMyLocation from "../../utils/getMyLocation";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../Restaurant/restaurantSlice";
import profilePic from "../../assets/App-Logos.png";
import colors from "../../config/colors";
import { useNavigation } from "@react-navigation/native";
import { setRestaurantSearch } from "../../redux/ui/uiSlice";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const NearbyRestaurant = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const restaurants = useSelector((state) => state.restaurantSlice.restaurantList);

  const [mapArea, setMapArea] = useState(null);
  const [myCoord, setMyCoord] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

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
        setMyCoord({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (err) {
        console.log("Error: ", err);
      }
    })();
  }, []);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= restaurants.length) {
        index = restaurants.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { address } = restaurants[index];
          _map.current.animateToRegion(
            {
              ...address,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = restaurants.map((_restaurant, index) => {
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={mapArea}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
      >
        {restaurants.map((restaurant, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker key={index} coordinate={restaurant.address} onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={
                    restaurant.profileImageLink ? { uri: restaurant.profileImageLink } : profilePic
                  }
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
        <Marker title="Your Location" coordinate={myCoord} draggable={true} />
      </MapView>

      <Animated.ScrollView
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
        {restaurants.map((restaurant, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={restaurant.imageLink ? { uri: restaurant.imageLink } : thumbnail}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {restaurant.name}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {restaurant.description
                  ? restaurant.description
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setRestaurantSearch(restaurant._id));
                    navigation.navigate("RestaurantProfile");
                  }}
                  style={styles.haveALookBtn}
                >
                  <Text style={styles.haveALookBtnTxt}>Have a Look</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default NearbyRestaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 220,
    width: width * 0.8,
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
    fontSize: 15,
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
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 5,
  },
  haveALookBtn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderColor: "#FF6347",
    borderWidth: 1,
  },
  haveALookBtnTxt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6347",
  },
});
