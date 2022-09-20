import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import colors from '../../../config/colors';
import { useState } from 'react';

const { height, width } = Dimensions.get('window');

const Menu = () => {
  // const [noOfItem, setNoOfItem] = useState({ quantity: 0 });

  // cons [cart, setCart] = useState({
  //   foodId: 0,
  //   quantity: 0
  // })

  const MenuItems = [
    {
      id: 1,
      title: 'Chicken Pizza',
      category: 'pizza',
      price: '600',
    },
    {
      id: 2,
      title: 'Mushroom Pizza',
      category: 'pizza',
      price: '500',
    },
    {
      id: 3,
      title: 'Meat Lovers',
      category: 'pizza',
      price: '850',
    },
    {
      id: 4,
      title: 'Buff Momo',
      category: 'momo',
      price: '110',
    },
    {
      id: 5,
      title: 'Buff C Momo',
      category: 'momo',
      price: '130',
    },
    {
      id: 6,
      title: 'Veg Chowmein',
      category: 'chowmein',
      price: '150',
    },
    {
      id: 7,
      title: 'Chicken Fried Momo',
      category: 'momo',
      price: '150',
    },
  ];

  const filteredMenu = [];

  useEffect(() => {
    const separateCategories = () => {
      const mentioned = {};

      MenuItems.forEach((item) => {
        const registeredCategories = Object.keys(mentioned);
        if (registeredCategories.includes(item.category)) {
          filteredMenu[mentioned[item.category]].push(item);
        } else {
          filteredMenu[item.category] = filteredMenu.length;
          filteredMenu.push([item]);
        }
      });
    };
    separateCategories();
    // console.log(filteredMenu);
  }, [MenuItems]);

  

  const [noOfItem, setNoOfItem] = useState(0);

  const incrementCount = () => {
    setNoOfItem((prevCount) => prevCount + 1);
    // setNoOfItem({ ...noOfItem, [id]: ++noOfItem[id] });
  };

  const decrementCount = () => {
    // console.log(noOfItem);
    // noOfItem[id] >= 1 ? setNoOfItem({ ...noOfItem, [id]: --noOfItem[id] }) : '';
    noOfItem >= 1 ? setNoOfItem((prevCount) => prevCount - 1) : '';
  };

  return (
    <View>
      <View style={{ position: 'relative' }}>
        <View
          style={{
            backgroundColor: colors.gray,
            height: 2,
            width: width,
            position: 'absolute',
            top: 16,
          }}
        />
        <View style={styles.menuContainer}>
          <Text style={styles.title}>PIZZA</Text>
        </View>
      </View>
      {MenuItems.map((item) => {
        return (
          <View key={item.id} style={styles.menuItem}>
            <Text style={{ color: colors.gray, fontSize: 18 }}>
              {item.title}
            </Text>
            <View style={styles.priceCart}>
              <View>
                <Text style={{ color: colors.primary, fontSize: 20 }}>
                  Rs.&nbsp;{item.price}
                </Text>
              </View>
              <View style={styles.cart}>
                <AntDesign
                  name="minuscircle"
                  size={24}
                  color={colors.gray}
                  onPress={() => decrementCount()}
                />
                <Text style={{ color: colors.gray, margin: 10, fontSize: 20 }}>
                  {noOfItem}
                </Text>
                <AntDesign
                  name="pluscircle"
                  size={24}
                  color={colors.gray}
                  onPress={() => incrementCount()}
                />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {},
  menuContainer: {
    // backgroundColor: colors.gray,
    alignItems: 'center',
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: colors.gray,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  priceCart: { alignItems: 'center' },
  cart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
