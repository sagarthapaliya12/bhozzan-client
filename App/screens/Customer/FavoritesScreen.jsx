import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FavoriteRestaurant from "../../components/Customer/FavoriteRestaurant";
import FavoriteDish from "../../components/Customer/FavoriteDish";
import colors from "../../config/colors";

const FirstRoute = () => <FavoriteRestaurant />;
const SecondRoute = () => <FavoriteDish />;

const renderScene = SceneMap({
  favRestaurant: FirstRoute,
  favDish: SecondRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: colors.white,
      height: 3,
    }}
    style={{ backgroundColor: colors.secondary }}
    labelStyle={{ color: colors.screen, fontSize: 15, fontWeight: "700" }}
  />
);

const FavoriteScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "favRestaurant", title: "Restaurant" },
    { key: "favDish", title: "Dish" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default FavoriteScreen;
