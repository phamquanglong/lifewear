import React, { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colors} from '../../constants';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import {addressIdSelector, orderSelector} from '../../Store/selector';
import { setOrder } from '../Profile/Orders/Store/actions'

var PaymentSuccess = props => {
  var address = useSelector(addressIdSelector);
  var order = useSelector(orderSelector);
  console.log(order);
  var dispatchOrder = useDispatch()
  var dispatchHandler = () => {
    dispatchOrder(setOrder(
      [
        ...order,
        {
          key: order.length,
          add: address,
          listProducts: listProducts,
          price: price,
          paymentMethod: paymentMethod,
        }
      ]
    ))
  }
  var {price, paymentMethod, listProducts} = props.route.params;

  var { navigation, route } = props
  var { navigate, goBack } = navigation

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <FontAwesomeIcon icon={faCheck} size={100} style={styles.iconCheck} />
        <Text style={styles.text}>Order Successful!!!</Text>

        <View style={styles.item}>
          <Text>Address</Text>
          <View style={{flex: 1}}></View>
          <View style={{alignItems: 'flex-end'}}>
            <Text>{address[0].phone}</Text>
            <Text>{address[0].address}</Text>
            <Text>{address[0].province.name}</Text>
            <Text>{address[0].district.name}</Text>
            <Text>{address[0].ward.name}</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Text>Payment method</Text>
          <View style={{flex: 1}}></View>
          <Text style={styles.price}>{paymentMethod}</Text>
        </View>

        <View style={styles.item}>
          <Text>Price</Text>
          <View style={{flex: 1}}></View>
          <Text style={styles.price}>
            {price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>
      </View>
      {/* <View style={{flex: 0.2}}></View> */}
      <TouchableOpacity style={styles.btn} onPress={() => {
        navigate('UITab')
        dispatchHandler()
        }}>
        <Text style={styles.textBtn}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 0.95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCheck: {
    color: colors.primary,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.primary,
  },
  item: {
    marginHorizontal: 30,
    marginVertical: 10,
    flexDirection: 'row',
  },
  price: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.primary,
  },
  btn: {
    flex: 0.05,
    backgroundColor: colors.primary,
    alignItems: 'stretch',
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 5,
  },
  textBtn: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
  }
});

export default PaymentSuccess;
