import { Text, ScrollView } from "react-native";
import React from "react";
import Screen from "../Screen";
import colors from "../../config/colors";

const FavoriteDish = () => {
  return (
    <Screen>
      <ScrollView>
        <Text style={{ color: colors.secondary }}>FavoriteDish</Text>
      </ScrollView>
    </Screen>
  );
};

export default FavoriteDish;
