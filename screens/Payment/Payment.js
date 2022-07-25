import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import {UIHeader} from '../../components';
import {colors} from '../../constants';
import Address from '../Profile/Addresses';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { addressIdSelector } from '../../Store/selector'
import AsyncStorage from '@react-native-async-storage/async-storage';

var PaymentItem = props => {
  var {item} = props;
  var {img, txt} = item;

  return (
    <TouchableOpacity
      style={[
        styles.paymentItem,
        {
          backgroundColor: item.isSelected ? colors.primary : 'white',
          marginEnd: props.index == 0 ? 10 : 0,
        },
      ]}
      onPress={() => props.onPress(item)}>
      {img !== undefined ? (
        <Image
          source={{uri: img}}
          style={{
            height: 50,
            width: 50,
          }}
        />
      ) : (
        <Icon name="map-pin" size={40} color={item.isSelected ? 'white' : colors.disable} style={{marginHorizontal: 10}}/>
      )}
      <Text
        style={{
          fontSize: 12,
          maxWidth: 120,
          marginHorizontal: 10,
          color: item.isSelected ? 'white' : colors.disable,
        }}>
        {txt}
      </Text>
    </TouchableOpacity>
  );
};

var Payment = props => {
  var addressId = useSelector(addressIdSelector)
  var {listProducts} = props.route.params;

  var {navigation, route} = props;
  var {navigate, goBack} = navigation;

  var [paymentMethodsList, setPaymentMethodsList] = useState([
    {
      img: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
      txt: 'Payment via momo',
    },
    {txt: 'Payment on delivery'},
  ]);

  var oldPaymentMethodList = [
    {
      img: 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png',
      txt: 'Payment via momo',
    },
    {txt: 'Payment on delivery'},
  ];

  var [sum, setSum] = useState(0);
  var [sumPrice, setSumPrice] = useState(0);

  var [paymentMethod, setPaymentMethod] = useState('')

  var onPress = i => {
    var clonePaymentList = oldPaymentMethodList.map(item => {
      if (item.txt == i.txt) {
        return {
          ...item,
          isSelected:
            item.isSelected == false || item.isSelected == undefined
              ? true
              : false,
        };
      }
      return item;
    });
    setPaymentMethod(clonePaymentList.filter(item => item.isSelected == true))
    setPaymentMethodsList(clonePaymentList)
  };

  var getSumPrice = (data, val) => {
    var s = 0;
    var listPrice = data.map(item =>
      val == 'sale'
        ? item.sale_price * item.cart_quantity
        : item.price * item.cart_quantity,
    );
    listPrice.forEach(price => (s += price));
    return s;
  };

  useEffect(() => {
    setSum(getSumPrice(listProducts, 'sale'));
    setSumPrice(getSumPrice(listProducts, ''));
  }, []);

  var proceesPayment = (token) => {
    const options = {
      method: 'POST',
      url: 'https://lifewear.mn07.xyz/api/user/checkout',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      data: {address_id: addressId[0].id, payment_method: 'momo'}
    };

    axios.request(options)
    .then(response => {
      console.log(response)
      Linking.openURL(response.data.deeplink)
    })
    .catch(err => console.log(err.response.data))
  }

  return (
    <View style={{flex: 1}}>
      <UIHeader
        title="Payment"
        leftIcon="arrow-left"
        onPressLeftIcon={() => {
          goBack();
        }}
      />
      <ScrollView>
        <Text style={styles.title}>Products list</Text>
        <FlatList
          keyExtractor={key => key.id}
          data={listProducts}
          renderItem={({item, index}) => {
            return (
              <View style={[styles.container, {marginTop: index > 0 ? 0 : 10}]}>
                <Image
                  source={{
                    uri: item.cover,
                  }}
                  style={styles.image}
                />
                <View style={{flex: 0.5}}>
                  <Text style={styles.name} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.color}>{item.options === undefined ? item.color.name : item.color[0].name}</Text>
                    <Text style={styles.size}>{item.options === undefined ? item.size.name : item.size[0].name}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.price}>
                      {item.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </Text>
                    <Text style={styles.sale_price}>
                      {item.sale_price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </Text>
                  </View>
                </View>
                <View style={styles.viewQty}>
                  <Text>x{item.cart_quantity}</Text>
                </View>
              </View>
            );
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <Text style={{fontWeight: 'bold'}}>Prices have not decreased</Text>
          <Text
            style={[
              styles.totalPrice,
              {color: colors.disable, textDecorationLine: 'line-through', fontSize: 15},
            ]}>
            {sumPrice.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <Text style={{fontWeight: 'bold'}}>Save</Text>
          <Text
            style={[
              styles.totalPrice,
              {color: colors.disable, fontSize: 15},
            ]}>
            {(sumPrice - sum).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          }}>
          <Text style={{fontWeight: 'bold'}}>
            Total price: ({listProducts.length} products)
          </Text>
          <Text style={styles.totalPrice}>
            {sum.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>


        <Text style={styles.title}>Address</Text>
        <Address navigation={navigation} />
        <Text style={styles.title}>Payment methods</Text>
        <View style={styles.paymentMethods}>
          <View style={styles.paymentItemContainer}>
            <FlatList
              horizontal
              keyExtractor={key => key.txt}
              data={paymentMethodsList}
              renderItem={({item, index}) => {
                return (
                  <PaymentItem item={item} index={index} onPress={onPress} />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.btnPayment} onPress={() => {
        if (Object.keys(addressId).length > 0 && paymentMethod.length > 0){
          if (paymentMethod[0].txt == "Payment on delivery") {
            navigate('PaymentSuccess', {price: sum, paymentMethod: paymentMethod[0].txt, listProducts: listProducts})
          }
          else AsyncStorage.getItem('token').then(response => proceesPayment(response))
        }
        else alert("Choose your address and payment method first")
      }}>
        <Text style={styles.btnPaymentText}>Proceed payment</Text>
      </TouchableOpacity>
    </View>
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
  viewQty: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 0.25,
  },
  title: {
    color: colors.primary,
    margin: 10,
    fontWeight: 'bold',
  },
  paymentMethods: {
    flex: 1,
  },
  paymentOnDelivery: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  paymentItemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  paymentItem: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 180,
  },
  btnPayment: {
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  btnPaymentText: {
    color: 'white',
    fontSize: 20,
  },
  totalPrice: {
    color: colors.danger,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Payment;
