import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "../config/mapStyles";
import getMyLocation from "../utils/getMyLocation";
import colors from "../config/colors";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantDetails } from "./Restaurant/restaurantSlice";

const ChooseLocation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { subject } = route.params;

  const restaurantAddress = useSelector((state) => state.restaurantSlice.restaurantUser.address);

  const [mapArea, setMapArea] = useState(null);
  const [markerCoord, setMarkerCoord] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [markerAddress, setMarkerAddress] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const currentLocation = await getMyLocation();

        setMapArea({
          latitude:
            subject === "restaurant"
              ? Number(restaurantAddress.latitude)
              : currentLocation.coords.latitude,
          longitude:
            subject === "restaurant"
              ? Number(restaurantAddress.longitude)
              : currentLocation.coords.longitude,

          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        setMarkerCoord({
          latitude:
            subject === "restaurant"
              ? Number(restaurantAddress.latitude)
              : currentLocation.coords.latitude,
          longitude:
            subject === "restaurant"
              ? Number(restaurantAddress.longitude)
              : currentLocation.coords.longitude,
        });

        // setMapArea({
        //   latitude: currentLocation.coords.latitude,
        //   longitude: currentLocation.coords.longitude,
        //   latitudeDelta: 0.05,
        //   longitudeDelta: 0.05,
        // });
        // setMarkerCoord({
        //   latitude: currentLocation.coords.latitude,
        //   longitude: currentLocation.coords.longitude,
        // });
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

  const confirmLocation = async () => {
    if (subject === "customer")
      navigation.navigate("Checkout", {
        order: route.params.order,
        address: { markerCoord, markerAddress },
      });

    if (subject === "restaurant") {
      try {
        const res = await dispatch(updateRestaurantDetails({ address: markerCoord })).unwrap();
        if (res) {
          navigation.popToTop();
        }
      } catch (err) {}
    }

    if (subject === "user") {
      try {
        console.log("Change Address To:", markerCoord);
        // const res = await dispatch(editUserProfile({ address: markerCoord })).unwrap();
        // if (res) {
        navigation.popToTop();
        // }
      } catch (err) {}
    }

    if (subject === "registerUser") {
      navigation.navigate("RegisterScreen", { address: markerCoord });
    }

    if (subject === "registerRestaurant") {
      navigation.navigate("RestaurantSignup", { address: markerCoord });
    }
  };

  const _map = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={mapArea}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
        onPress={(event) => setMarkerCoord(event.nativeEvent.coordinate)}
      >
        <Marker title="Delivery Location" coordinate={markerCoord} draggable={true} />
      </MapView>
      {markerCoord && (
        <View style={styles.locationCard}>
          <View style={styles.addressContainer}>
            <Entypo name="location-pin" size={40} color="black" />
            <View>
              <Text style={styles.addressText}>{`${markerCoord.longitude},`}</Text>
              <Text style={styles.addressText}>{`${markerCoord.latitude}`}</Text>
              {markerAddress && (
                <Text style={styles.addressText}>{`${
                  markerAddress.street ? `${markerAddress.street},` : ""
                } ${markerAddress.city ? `${markerAddress.city},` : ""} ${markerAddress.city}, ${
                  markerAddress.subregion
                }, ${markerAddress.country}`}</Text>
              )}
            </View>
          </View>
          <Button style={styles.confirmButton} onPress={confirmLocation}>
            <Text style={styles.btnText}>Confirm Location</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default ChooseLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  locationCard: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addressContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  addressText: {
    color: colors.black,
    fontSize: 17,
  },
  confirmButton: {
    backgroundColor: colors.secondary,
    color: colors.screen,
    borderRadius: 15,
    height: 50,
    justifyContent: "center",
    width: "100%",
  },
  btnText: { color: colors.screen, fontSize: 20, fontWeight: "700" },
});
