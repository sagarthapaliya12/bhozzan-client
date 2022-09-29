import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../config/colors";
import pizzaHut from "../../assets/pizza-hut.png";
import TableList from "../../components/Restaurant/TableList";

const { height, width } = Dimensions.get("window");

const restaurantInfo = {
  restaurantName: "Pizza Hut",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation...",
  location: "Radhe Radhe, Bhaktapur",
  phoneNo: "9841784512",
  email: "admin@pizzahut.com",
  deliveryHours: "10:00 AM - 12:00 PM",
  panVatNo: "00157964255",
  noOfTables: "4",
};

const RestaurantProfile = ({ navigation }) => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableHighlight
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Entypo name="edit" size={24} color={colors.screen} />
          </TouchableHighlight>
        </View>
        <View style={styles.info}>
          <View>
            <Image style={styles.profilePicture} source={pizzaHut} />
          </View>
          <Text style={styles.title}>{restaurantInfo.restaurantName}</Text>
          <Text style={styles.descriptionText}>{restaurantInfo.description}</Text>
        </View>
        <View style={styles.details}>
          <Entypo name="location-pin" size={24} color={colors.secondary} />
          <Text style={styles.locationText}>&nbsp;{restaurantInfo.location}</Text>
        </View>
        <View style={styles.details}>
          <Ionicons name="call" size={24} color={colors.secondary} />
          <Text style={{ color: colors.white }}>&nbsp;&nbsp;{restaurantInfo.phoneNo}</Text>
        </View>
        <View style={styles.details}>
          <AntDesign name="mail" size={24} color={colors.secondary} />
          <Text style={{ color: colors.white }}>&nbsp;&nbsp;{restaurantInfo.email}</Text>
        </View>
        <View style={styles.details}>
          <Text style={{ color: colors.secondary }}>DELIVERY HOURS:&nbsp;</Text>
          <Text style={{ color: colors.white }}>{restaurantInfo.deliveryHours}</Text>
        </View>
        <View style={styles.details}>
          <Text style={{ color: colors.secondary }}>PAN/VAT No:&nbsp;</Text>
          <Text style={{ color: colors.white }}>{restaurantInfo.panVatNo}</Text>
        </View>
        <View style={styles.details}>
          <Text style={{ color: colors.secondary }}>No. of Tables:&nbsp;</Text>
          <Text style={{ color: colors.white }}>{restaurantInfo.noOfTables}</Text>
        </View>
        <TableList />
      </SafeAreaView>
    </ScrollView>
  );
};

export default RestaurantProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: colors.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    alignItems: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 25,
    color: colors.white,
  },
  locationText: {
    color: colors.white,
  },
  descriptionText: {
    color: colors.white,
  },
  details: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
});
