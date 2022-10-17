import React from "react";
import { StyleSheet, View } from "react-native";

import AdminDashboard from './AdminDashboard';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AdminDashboard onPress={() => navigation.navigate('RestaurantProfile')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
