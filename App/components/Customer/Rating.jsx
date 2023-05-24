import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import colors from "../../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { rateRestaurant } from "../../screens/Restaurant/restaurantSlice";

const Rating = () => {
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.uiSlice.restaurantIdSearch);

  const [ratings, _setRatings] = useState([1, 2, 3, 4, 5]);
  const [userRating, setUserRating] = useState(2);

  const submitRating = (rating) => {
    console.log("Your rating", rating);
    setUserRating(rating);
    dispatch(rateRestaurant({ restaurantId, rating }));
  };

  return (
    <View style={styles.container}>
      {ratings.map((rating) => {
        return (
          <TouchableOpacity key={rating} activeOpacity={0.7} onPress={() => submitRating(rating)}>
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
