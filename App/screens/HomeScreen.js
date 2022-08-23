import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import BrowseCategories from '../components/HomeScreen/BrowseCategories';
import colors from '../config/colors';
import React from 'react';
import TopRestaurants from '../components/HomeScreen/TopRestaurants';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BrowseCategories />
      <TopRestaurants/>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
    top: 20,
  }
});
