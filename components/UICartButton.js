import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, icons } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import { numSelector } from '../Store/selector';
import { setCounter } from '../Store/actions';

var UICartButton = (props) => {
  var counters = useSelector(numSelector)
  var dispatchRedux = useDispatch();

  var dispatchHandler = (counter) => {
    dispatchRedux(setCounter(counter))
  }

  var {color, navigation, style} = props
  var [num, setNum] = useState()

  var getListProducts = (tk) => {
    fetch('https://lifewear.mn07.xyz/api/user/cart', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + tk,
      },
    })
      .then(response => response.json())
      .then(json => {
        setNum(json.length)
        dispatchHandler(json.length)
      })
      .catch(err => console.log(err));
  };

  useLayoutEffect(() => {
    AsyncStorage.getItem('token').then(response => getListProducts(response))
  }, [])

    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          navigation.navigate('CartScreen', {token: props.token});
        }}>
        <Icon size={25} name="shopping-cart" color={color} />
        <View
          style={styles.counters}>
          <Text style={{color: 'white', fontSize: 10}}>{counters}</Text>
        </View>
      </TouchableOpacity>
    );
}

var styles = StyleSheet.create({
  counters: {
    backgroundColor: colors.success,
    height: 18,
    width: 18,
    position: 'absolute',
    right: 0,
    top: -2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  }
})

export default UICartButton