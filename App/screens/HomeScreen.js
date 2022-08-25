import { SafeAreaView,  StyleSheet, ScrollView } from 'react-native';
import BrowseCategories from '../components/HomeScreen/BrowseCategories';
import colors from '../config/colors';
import React from 'react';
import TopRestaurants from '../components/HomeScreen/TopRestaurants';
import LocalCusines from '../components/HomeScreen/LocalCusines';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BrowseCategories />
        <LocalCusines />
        <TopRestaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
    top: 20,
  },
});
