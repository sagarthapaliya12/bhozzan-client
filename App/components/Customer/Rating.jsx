import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import colors from "../../config/colors";
import { FontAwesome } from "@expo/vector-icons";

const Rating = () => {
  const starImgCorner = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const [ratings, _setRatings] = useState([1, 2, 3, 4, 5]);
  const [userRating, setUserRating] = useState(2);

  const rateRestaurant = (rating) => {
    console.log("Your rating", rating);
    setUserRating(rating);
  };

  return (
    <View style={styles.container}>
      {ratings.map((rating) => {
        return (
          <TouchableOpacity key={rating} activeOpacity={0.7} onPress={() => rateRestaurant(rating)}>
            {rating <= userRating ? (
              <FontAwesome name="star" size={40} color={colors.secondary} />
            ) : (
              <FontAwesome name="star-o" size={40} color={colors.secondary} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    width: 250,
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-evenly",
  },
});
