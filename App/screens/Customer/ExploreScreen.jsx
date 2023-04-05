import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapArea from "../../components/Customer/MapArea";

export default function ExploreScreen() {
  return (    
      <MapArea />   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
