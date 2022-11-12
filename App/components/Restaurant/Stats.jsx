import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import colors from "../../config/colors";

const Stats = () => {
  return (
    <View>
      <Card.Title
        title="No. of Orders"
        titleStyle={{ color: colors.white }}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={() => <MaterialCommunityIcons name="food" size={24} color="black" />}
            style={{ backgroundColor: colors.secondary }}
          />
        )}
        right={() => <Text style={styles.dataText}>12</Text>}
      />
      <Card.Title
        title="No. of Delivery"
        titleStyle={{ color: colors.white }}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={() => <MaterialIcons name="delivery-dining" size={29} color="black" />}
            style={{ backgroundColor: colors.secondary }}
          />
        )}
        right={() => <Text style={styles.dataText}>12</Text>}
      />
      <Card.Title
        title="No. of Reservations"
        titleStyle={{ color: colors.white }}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={() => <Foundation name="social-myspace" size={24} color="black" />}
            style={{ backgroundColor: colors.secondary }}
          />
        )}
        right={() => <Text style={styles.dataText}>12</Text>}
      />
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {},
  dataText: {
    color: colors.white,
    marginRight: 20,
    fontSize: 18,
  },
});
