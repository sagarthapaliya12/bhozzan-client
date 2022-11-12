import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, StyleSheet, FlatList, TouchableHighlight } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import colors from "../../config/colors";
import OrderStatus from "../../datas/orderStatus";
import { changeOrderStatusState } from "../../screens/Restaurant/restaurantSlice";

const Paper = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={OrderStatus}
        renderItem={({item}) => {
          return (
            <TouchableHighlight
              onPress={()=> {
                dispatch(changeOrderStatusState(item.state));
                navigation.navigate("OrderStatus");
              }}
              style={styles.button}
            >
              <Surface style={styles.surface} elevation={4}>
                <Text style={styles.text}>{item.title}</Text>
              </Surface>
            </TouchableHighlight>
          )}}  
      />
  </View>
  )
};

export default Paper;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginHorizontal: "auto",
    width: "100%",
    padding: 9,
  },
  button:{
    padding: 8,
    flex: 1,
    margin: "auto",
  },
  surface: {
    height: 170,
    width: 170,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  text:{
    fontWeight: "700",
    fontSize: 22,
    color: colors.screen
  },
});
