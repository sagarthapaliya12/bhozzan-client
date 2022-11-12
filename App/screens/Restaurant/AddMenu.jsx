import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Yup from "yup";
import "yup-phone";
import SubmitButton from "../../components/forms/SubmitButton";

import Screen from "../../components/Screen";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import defaultStyles from "../../config/styles";
import colors from "../../config/colors";
import Categories from "../../datas/categoriesList";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Food Name"),

  price: Yup.number().required().label("Food Price"),
});

const AddMenu = () => {
  const [selected, setSelected] = useState("");

  const [category, setCategory] = useState(null);
  const [showOption, setShowOption] = useState(false);

  const handleSelect = (item) => {
    setShowOption(false);
    setCategory(item);
  };

  const addDish = (dish) => {
    console.log("Dish Add: ", dish);
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                name: "",
                price: "",
              }}
              onSubmit={(dish) => {
                console.log("sdcdsc");
                addDish(dish);
              }}
              validationSchema={validationSchema}
            >
              <Text style={styles.text}>Food Name:</Text>
              <FormField autoCorrect={false} name="name" />
              <Text style={styles.text}>Price:</Text>
              <FormField autoCorrect={false} name="price" />
              <Text style={styles.text}>Category:</Text>

              {/*////////////////////////////////////////////////////*/}
              {/*//////////////////// Dropdown //////////////////////*/}
              {/*////////////////////////////////////////////////////*/}
              {/* <View value={category} style={{ alignItems: "center" }}>
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
                  <View
                    style={{
                      maxHeight: 150,
                      width: "100%",
                      bottom: 17,
                      zIndex: -10,
                      paddingTop: 17,
                      paddingBottom: 17,
                      backgroundColor: colors.gray,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                    }}
                  >
                    <ScrollView keyboardShouldPersistTaps="handled">
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
              </View> */}
              {/* <View style={{ marginTop: 15 }}>
                <SubmitButton title="Add Dish" />
              </View> */}
              <View style={{ marginTop: 15 }}>
                <SubmitButton title="Add Dish" onPress={() => console.log("sfsdfdf")} />
              </View>
              {/* <Pressable style={styles.saveButton} onPress={() => console.log("Oh yah giggity")}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: colors.screen }}>
                  Add Food
                </Text>
              </Pressable> */}
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
  // saveButton: {
  //   backgroundColor: colors.secondary,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 4,
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   marginTop: 8,
  // },
  dropdown: {
    backgroundColor: colors.medium,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 9,
    width: "100%",
    minHeight: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
