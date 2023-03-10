import { StyleSheet, TouchableHighlight } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../config/colors";
import { useNavigation } from "@react-navigation/native";

const EditButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={styles.editButton}
      onPress={() => navigation.navigate("EditProfile")}
    >
      <Entypo name="edit" size={24} color={colors.screen} />
    </TouchableHighlight>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: colors.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
