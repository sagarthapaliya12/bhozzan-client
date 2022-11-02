import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';

import { TouchableOpacity, StyleSheet, ScrollView, View, Text, TextInput } from "react-native";
import colors from "../../config/colors";

export default function SearchDropdown(props) {
  const { dataSource } = props;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {dataSource.length ? (
          dataSource.map((item) => {
            return (
              <TouchableOpacity onPress={() => props.onPress(item)} style={styles.itemView}>
               <View style={styles.searchList}>
                <FontAwesome5 name="hotel" size={20} color={colors.darkGray} />
                <Text style={styles.itemText}>{item}</Text>
               </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noResultView}>
            <Text style={styles.noResultText}>No search items matched</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "99%",
    left: 0,
    right: 0,
    // bottom: 0,    
    backgroundColor: colors.darkGray,    
    zIndex: 100, 
    elevation: 100,
    
  },
  subContainer: {      
    // backgroundColor: "red",    
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: "column",    
    alignItems: "center",    
  },
  itemView: {    
    backgroundColor: "white",
    height: 50,
    width: "100%",    
    marginBottom: 3,
    justifyContent: "center",
    borderRadius: 4,
  },
  searchList: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    color: "black",
    paddingHorizontal: 10,
  },
  noResultView: {
    alignSelf: "center",    
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  noResultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});