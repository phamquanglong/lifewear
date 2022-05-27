import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../constants';
import {StackActions, useScrollToTop} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableScale from 'react-native-touchable-scale';
import axios from 'axios';
import Toast from 'react-native-toast-message';


var Cart = props => {
  var {item, index, navigation, setListProducts, getSumPrice} = props;

  var updateQuantity = (variant_id, token, qty) => {
    console.log(variant_id)
    console.log(qty)

    const options = {
      method: 'PUT',
      url: `https://lifewear.mn07.xyz/api/user/cart/${variant_id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      data: {quantity: qty}
    };

    axios.request(options)
    .then(response => {
      setListProducts(response.data)
      getSumPrice(response.data)
    })
    .catch(err => Toast.show({
      type: 'error',
      text1: err.response.data.errors.quantity,
    }))
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(StackActions.push('ProductScreen', {item: item}));
      }}
      style={[styles.container, {marginTop: index > 0 ? 0 : 10}]}>
      <Image
        source={{
          uri: item.cover,
        }}
        style={styles.image}
      />
      <View style={{flex: 0.5}}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.color}>{item.color.name}</Text>
          <Text style={styles.size}>{item.size.name}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text style={styles.price}>{item.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}</Text>
          <Text style={styles.sale_price}>{item.sale_price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}</Text>
        </View>
      </View>
      <View style={{flex: 0.25}}>
      <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <TouchableScale
              disabled={item.cart_quantity == 0 ? true : false}
              onPress={() => {
                var qtyMinus = item.cart_quantity - 1
                AsyncStorage.getItem('token').then(token =>
                  updateQuantity(item.variant_id, token, qtyMinus),
                );
              }}
              style={[
                styles.qtyButton,
              ]}>
              <Text>-</Text>
            </TouchableScale>
            <Text style={styles.qtyText}>{item.cart_quantity}</Text>
            <TouchableScale
              // disabled={getQuantity(quantityColor, quantitySize) == qty}
              onPress={() => {
                var qtyAdd = parseInt(item.cart_quantity) + 1
                AsyncStorage.getItem('token').then(token =>
                  updateQuantity(item.variant_id, token, qtyAdd),
                );
              }}
              style={[
                styles.qtyButton,
              ]}>
              <Text>+</Text>
            </TouchableScale>
          </View>
      </View>
    </TouchableOpacity>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    margin: 10,
  },
  name: {
    color: colors.primary,
  },
  image: {
    flex: 0.25,
    height: '100%',
    marginEnd: 10,
    borderRadius: 10,
  },
  sale_price: {
    color: colors.danger,
    fontWeight: 'bold',
  },
  price: {
    textDecorationLine: 'line-through',
    marginEnd: 10,
  },
  color: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: 5,
    paddingHorizontal: 10,
  },
  size: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: colors.primary,
  },
  qtyButton: {
    padding: 5,
    paddingHorizontal: 10,
    minWidth: 30,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  qtyText: {
    textAlign: 'center',
  },
});

export default Cart;
