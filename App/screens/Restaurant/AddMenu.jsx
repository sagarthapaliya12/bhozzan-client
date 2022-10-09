import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Yup from "yup";
import "yup-phone";

import Screen from "../../components/Screen";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import defaultStyles from "../../config/styles";
// import api from "../../helpers/axios";
import colors from "../../config/colors";
import Categories from "../../datas/categoriesList";

const validationSchema = Yup.object().shape({
  foodName: Yup.string().required().min(3).label("Food Name"),

  foodPrice: Yup.string().required().min(6).max(14).label("Food Price"),
});

// const categories = [
//   { id: "1", title: "Dessert", value: "dessert" },
//   { id: "2", title: "Fast Food", value: "fastFood" },
//   { id: "3", title: "Soups", value: "soups" },
//   { id: "4", title: "Salads", value: "salads" },
//   { id: "5", title: "Snacks", value: "snacks" },
//   { id: "6", title: "Drinks", value: "drinks" },
// ];

const AddMenu = () => {
  const [selected, setSelected] = useState("");

  const [category, setCategory] = useState(null);
  const [showOption, setShowOption] = useState(false);

  const handleSelect = (item) => {
    setShowOption(false);
    setCategory(item);
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                foodName: "",
                foodPrice: "",
              }}
              //   onSubmit={(values) => register(values)}
              validationSchema={validationSchema}
            >
              <Text style={styles.text}>Food Name:</Text>
              <FormField
                autoCorrect={false}
                // icon="account"
                // placeholder="Food Name"
                name="foodName"
                // value={}
              />
              <Text style={styles.text}>Price:</Text>
              <FormField
                autoCorrect={false}
                // icon="lock"
                // placeholder="Food Price"
                name="foodPrice"
              />
              <Text style={styles.text}>Category:</Text>
              <View value={category}>
                <TouchableOpacity
                  style={styles.dropdown}
                  activeOpacity={0.8}
                  onPress={() => setShowOption(!showOption)}
                >
                  <Text style={{ fontSize: 18 }}>
                    {category ? category?.title : "Choose an option"}
                  </Text>
                  <AntDesign
                    name="caretdown"
                    size={18}
                    color="black"
                    style={{ transform: [{ rotate: showOption ? "180deg" : "0deg" }] }}
                  />
                </TouchableOpacity>
                {showOption && (
                  <View style={{ maxHeight: 150 }}>
                    <ScrollView
                      keyboardShouldPersistTaps="handled"
                      // showsVerticalScrollIndicator={false}
                    >
                      {Categories.map((val, i) => {
                        return (
                          <TouchableOpacity
                            key={String(i)}
                            onPress={() => handleSelect(val)}
                            style={{
                              backgroundColor:
                                category?.id == val.id ? colors.secondary : colors.gray,
                              paddingVertical: 8,
                              paddingHorizontal: 6,
                            }}
                          >
                            <Text>{val.title}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                )}
              </View>
              <Pressable style={styles.saveButton} onPress={() => console.log("Oh yah giggity")}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
                  Add Food
                </Text>
              </Pressable>
            </Form>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default AddMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.screen,
    alignItems: "center",
    padding: 20,
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    top: 20,
  },

  formContainer: {
    display: "flex",
    width: "90%",
    marginVertical: 40,
  },

  text: {
    color: defaultStyles.colors.medium,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  dropdown: {
    backgroundColor: colors.medium,
    padding: 8,
    // borderRadius: 6,

    minHeight: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 6,
  },
});
