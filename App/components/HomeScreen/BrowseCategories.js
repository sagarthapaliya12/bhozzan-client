import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import desserts from '../../assets/categories/desserts.png';
import fastFood from '../../assets/categories/fast-food.png';
import soup from '../../assets/categories/soup.png';
import salads from '../../assets/categories/salads.png';
import snacks from '../../assets/categories/snacks.png';
import colors from '../../config/colors';

const Categories = [
  {
    id: 1,
    title: 'Desserts',
    img: desserts,
  },
  {
    id: 2,
    title: 'Fast Food',
    img: fastFood,
  },
  {
    id: 3,
    title: 'Soup',
    img: soup,
  },
  {
    id: 4,
    title: 'Salads',
    img: salads,
  },
  {
    id: 5,
    title: 'Snacks',
    img: snacks,
  },
  {
    id: 6,
    title: 'Momo',
    img: snacks,
  },
];

const BrowseCategories = () => {
  const displayCategories = () => {
    return Categories.map((item) => {
      return (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.circularBackground}>
            <Image style={styles.icon} source={item.img} />
          </View>
          <Text style={styles.categoryName}>{item.title}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Categories</Text>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal>{displayCategories()}</ScrollView>
      </View>
    </View>
  );
};

export default BrowseCategories;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    margin: 10,
  },
  circularBackground: {
    backgroundColor: colors.gray,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {
    width: 50,
    height: 50,
  },
  categoryName: {
    color: colors.gray,
    paddingTop: 10,
  },
  itemContainer: {
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 10,
  },
});
