import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import colors from '../../config/colors';
import kfcRestaurantThumbnail from '../../assets/restaurants/kfc.jpg';
import kfcRestaurantProfile from '../../assets/restaurants/kfc-profile.png';
import everestArirangKoreanRestaurantThumbnail from '../../assets/restaurants/everest-arirang-korean-restaurant.jpg';
import everestArirangKoreanRestaurant from '../../assets/restaurants/kfc-profile.png';

const { height, width } = Dimensions.get('window');

const Restaurants = [
  {
    id: 1,
    name: 'KFC Restaurant',
    location: 'Durbarmarg',
    thumbnail: kfcRestaurantThumbnail,
    profile: kfcRestaurantProfile,
  },
  {
    id: 2,
    name: 'Everest Airirang Korean Restaurant Profile',
    location: 'Jhamsikhel',
    thumbnail: everestArirangKoreanRestaurantThumbnail,
    profile: everestArirangKoreanRestaurant,
  },
  {
    id: 3,
    name: 'KFC Restaurant',
    location: 'Durbarmarg',
    thumbnail: kfcRestaurantThumbnail,
    profile: kfcRestaurantProfile,
  },
];

const TopRestaurants = () => {
  const displayRestaurants = () => {
    return Restaurants.map((item) => {
      return (
        <View
          key={item.id}
          style={styles.restaurantContainer}
          onPress={() => navigation.navigate('RestaurantProfile')}
        >
          <View style={styles.thumbnailContainer}>
            <Image style={styles.restaurantImage} source={item.thumbnail} />
          </View>
          <View style={styles.restaurantDetail}>
            <View style={styles.profileContainer}>
              <Image style={styles.restaurantProfile} source={item.profile} />
            </View>
            <View>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantLocation}>{item.location}</Text>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Restaurants</Text>
      <ScrollView horizontal>{displayRestaurants()}</ScrollView>
    </View>
  );
};

export default TopRestaurants;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    margin: 10,
    marginBottom: 20,
  },
  restaurantContainer: {
    marginHorizontal: 20,
    backgroundColor: colors.darkGray,
  },
  thumbnailContainer: {
    width: width - 40,
    height: 200,
    marginTop: 20,
  },
  restaurantImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 1,
  },
  profileContainer: {
    backgroundColor: colors.gray,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  restaurantDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  restaurantProfile: {
    width: 50,
    height: 50,
  },
  restaurantName: {
    color: colors.white,
    fontSize: 20,
  },
  restaurantLocation: {
    color: colors.gray,
  },
});
