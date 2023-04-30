import { View, Text, StyleSheet } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import Screen from "../Screen";
import colors from "../../config/colors";

const EmptyBasket = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.illustrationContainer}>
          <View style={styles.sadEmoji}>
            <Entypo name="emoji-sad" size={70} color={colors.secondary} />
          </View>
          <FontAwesome name="shopping-basket" size={200} color={colors.secondary} />
        </View>
        <Text style={styles.mainText}>Your Basket is Empty</Text>

        <Text style={styles.secondaryText}>
          Looks lke you haven't added any dishes to your basket.
        </Text>
      </View>
    </Screen>
  );
};

export default EmptyBasket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //   illustrationContainer: { position: "relative", alignItems: "center", marginBottom: 15 },
  illustrationContainer: { position: "relative", marginBottom: 15 },

  sadEmoji: {
    position: "absolute",
    zIndex: 1,
    left: -25,
    top: 20,
    transform: "rotate(-20deg)",
    opacity: 0.9,
  },
  mainText: { color: colors.white, fontWeight: "800", fontSize: 20, marginBottom: 5 },
  secondaryText: { color: colors.white, fontSize: 14, opacity: 0.8 },
});
