import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import colors from '../../config/colors';
import newariFood from '../../assets/local-cuisines/newari-food.jpg';
import dhido from '../../assets/local-cuisines/dhido.jpg';

const { height, width } = Dimensions.get('window');

const Cuisines = [
  { id: 1, title: 'Newari Food', img: newariFood },
  { id: 1, title: 'Sherpa Food', img: dhido },
];

const LocalCusines = () => {
  const displayLocalCusines = () => {
    // return Restaurants.map((item) => {
    return (
      <View style={styles.cuisineContainer}>
        <View style={styles.thumbnailContainer}>
          <Image style={styles.cuisineImage} source={newariFood} />
        </View>
        <View style={styles.offerContainer}>
          <Text style={styles.offer}>Get 30% OFF on Newari Food</Text>
        </View>
      </View>
    );
    // });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Cusines</Text>
      <ScrollView horizontal>{displayLocalCusines()}</ScrollView>
    </View>
  );
};

export default LocalCusines;

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
  cuisineContainer: {
    // marginHorizontal: 20,
    backgroundColor: colors.darkGray,
  },
  thumbnailContainer: {
    width: width,
    height: 200,
    // marginTop: 20,
  },
  cuisineImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 1,
  },
  offerContainer: {
    padding: 15,
  },
  offer: {
    color: colors.white,
    fontSize: 20,
  },
});
