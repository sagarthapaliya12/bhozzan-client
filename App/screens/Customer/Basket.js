import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import colors from '../../config/colors';
import { useState } from 'react';
import { Divider } from 'react-native-paper';

const { height, width } = Dimensions.get('window');

const Basket = () => {
  const cartItems = [
    {
      id: 1,
      title: 'Cheese Cake',
      quantity: 2,
      price: '600',
    },
    {
      id: 2,
      title: 'Pastry',
      quantity: 1,
      price: '500',
    },
    {
      id: 3,
      title: 'Butter Cookies',
      quantity: 3,
      price: '850',
    },
    {
      id: 4,
      title: 'Croissant',
      quantity: 4,
      price: '110',
    },
    {
      id: 5,
      title: 'Cream Pie',
      quantity: 5,
      price: '130',
    },
    {
      id: 6,
      title: 'Blueberry Muffin',
      quantity: 2,
      price: '150',
    },
  ];

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
    <ScrollView style={styles.container}>
      {cartItems.map((item) => {
        return (
          <View key={item.id} style={styles.categoryItem}>
            <View style={styles.itemDetail}>
              <Text style={{ color: colors.gray, fontSize: 18 }}>
                {item.title}
              </Text>
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
            <View style={styles.priceCart}>
              <View>
                <Text style={{ color: colors.secondary, fontSize: 20 }}>
                  Rs.&nbsp;{noOfItem * item.price}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
      <Divider style={{ backgroundColor: colors.secondary, height: 2 }} />
      <View style={styles.displayTotal}>
        <Text style={{ color: colors.white, fontWeight: '600', fontSize: 30 }}>
          Total:
        </Text>
        <Text
          style={{ color: colors.secondary, fontWeight: '600', fontSize: 30 }}
        >
          9000
        </Text>
      </View>
      <Pressable
        style={styles.checkoutButton}
        onPress={() => console.log('Hey it works')}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.screen }}>
          Proceed to Checkout
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Basket;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    width: width,
    paddingHorizontal: 20,
  },
  menuContainer: {
    alignItems: 'center',
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: '600',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 10,
  },
  itemDetail: {},
  restaurantName: {
    color: colors.white,
    fontWeight: '600',
  },
  priceCart: { alignItems: 'center' },
  cart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  checkoutButton: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },
});
