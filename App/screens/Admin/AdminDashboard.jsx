import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
import ThakaliBhansaProfile from "../../assets/restaurants/Thakali-Bhansa.png";
import greenHotelProfile from "../../assets/restaurants/green-hotel.png";
import bajekoSekuwaProfile from "../../assets/restaurants/bajeko-sekuwa.png";
import newariKhajaProfile from "../../assets/restaurants/Newari-khaja-ghar.png";
import anganSweetsProflie from "../../assets/restaurants/angan-sweets.png";

const { height, width } = Dimensions.get("window");

const Restaurants = [
  {
    id: 1,
    name: "Dhanvi Hotel",
    location: "Satdobato",
    profile: ThakaliBhansaProfile,
  },
  {
    id: 2,
    name: "The Green Hotel",
    location: "Jhamsikhel",
    profile: greenHotelProfile,
  },
  {
    id: 3,
    name: "Bajeko Sekuwa-The Himalayan Grill",
    location: "Sinamangal",
    profile: bajekoSekuwaProfile,
  },
  {
    id: 4,
    name: "KFC Restaurant",
    location: "Durbarmarg",
    profile: newariKhajaProfile,
  },
  {
    id: 5,
    name: "Aangan Sweets",
    location: "Putalisadak",
    profile: anganSweetsProflie,
  },
];

const AdminDashboard = ({onPress}) => {
  const displayRestaurants = () => {
    return Restaurants.map((item) => {
      return (
        <TouchableWithoutFeedback
          key={item.id}
          style={styles.restaurantContainer}
          onPress={onPress}
        >
          <View style={styles.mainContainer}>
            <View style={styles.restaurantDetail}>
              <View style={styles.profileContainer}>
                <Image style={styles.restaurantProfile} source={item.profile} />
              </View>
            </View>
            <View>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantLocation}>{item.location}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };
  return (
    <Screen style={styles.container}>
      <ScrollView vertical>{displayRestaurants()}</ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {      
  },
  mainContainer: {
    flexDirection: "row",
    color: colors.screen,
    paddingHorizontal:15,
  },
  restaurantContainer: {
    backgroundColor: colors.screen,
  },
  restaurantDetail: {
    flexDirection: "column",
    paddingVertical: 15,
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
    borderColor: colors.white
  },
  restaurantName: {
    color: colors.white,
    fontSize: 18,
    marginTop:10
  },
  restaurantLocation: {
    color: colors.gray,    
  },
});

export default AdminDashboard;
