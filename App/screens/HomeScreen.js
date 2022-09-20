import { View, StyleSheet, ScrollView } from 'react-native';

import BrowseCategories from '../components/HomeScreen/BrowseCategories';
import colors from '../config/colors';
import React from 'react';
import TopRestaurants from '../components/HomeScreen/TopRestaurants';
import LocalCusines from '../components/HomeScreen/LocalCusines';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <BrowseCategories
          onPress={() => navigation.navigate('BrowseCategory')}
        />
        <LocalCusines />
        <TopRestaurants
          onPress={() => navigation.navigate('RestaurantProfile')}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
  },
});
