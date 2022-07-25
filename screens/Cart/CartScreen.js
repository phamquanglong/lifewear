import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {UIHeader} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cart from './Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../constants';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import { useDispatch } from 'react-redux';
import { deleteCounter } from '../../Store/actions';

var CartScreen = props => {
  var dispatchRedux = useDispatch();
  var dispatchHandler = (num) => {
    dispatchRedux(deleteCounter(num))
  }

  var [listProducts, setListProducts] = useState([]);
  var [isLoading, setIsLoading] = useState(true);
  var [sum, setSum] = useState(0);

  var {navigation, route} = props;
  var {navigate, goBack, dispatch} = navigation;

  var getListProducts = tk => {
    fetch('https://lifewear.mn07.xyz/api/user/cart', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + tk,
      },
    })
      .then(response => response.json())
      .then(json => {
        setListProducts(json);
        getSumPrice(json);
      })
      .then(() => setIsLoading(false))
      .catch(err => console.log(err));
  };

  var deleteProduct = (variant_id, tk) => {
    fetch(`https://lifewear.mn07.xyz/api/user/cart/${variant_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + tk,
      },
    })
      .then(response => response.json())
      .then(data => {
        setListProducts(data);
        getSumPrice(data);
        dispatchHandler(1)
      })
      .catch(err => console.log(err));
  };

  useLayoutEffect(() => {
    AsyncStorage.getItem('token').then(response => getListProducts(response));
  }, []);

  var getSumPrice = data => {
    var s = 0;
    var listPrice = data.map(item => item.sale_price * item.cart_quantity);
    listPrice.forEach(price => (s += price));
    setSum(s);
  };

  return isLoading ? (
    <ActivityIndicator animating={true} />
  ) : (
    <View style={{flex: 1}}>
      <UIHeader
        title="Cart"
        leftIcon="arrow-left"
        onPressLeftIcon={() => {
          goBack();
        }}
      />
      {listProducts.length > 0 ? (
        <SwipeListView
          keyExtractor={key => key.variant_id}
          data={listProducts}
          renderItem={({item, index}) => {
            return (
              <Cart
                item={item}
                index={index}
                navigation={navigation}
                setListProducts={setListProducts}
                getSumPrice={getSumPrice}
              />
            );
          }}
          renderHiddenItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.getItem('token').then(response =>
                  deleteProduct(item.variant_id, response),
                );
              }}
              style={[
                styles.deleteButton,
                {
                  marginTop: index == 0 ? 10 : 5,
                  marginBottom: 5,
                },
              ]}>
              <Icon
                name="trash"
                style={{
                  padding: 5,
                  fontSize: 30,
                }}
              />
              <Text>Delete</Text>
            </TouchableOpacity>
          )}
          rightOpenValue={-75}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No product in your cart</Text>
        </View>
      )}

      <View style={styles.footer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold'}}>
            Total price: ({listProducts.length} products)
          </Text>
          <Text style={styles.totalPrice}>{sum.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}</Text>
        </View>
        <TouchableOpacity style={listProducts.length > 0 ? styles.btnBuyNow : styles.btnBuyNowDisable}
        disabled={listProducts.length === 0}
        onPress={() => {
          navigate('Payment', {listProducts: listProducts})
        }}>
          <Text style={styles.textBtnBuyNow}>Buy now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  totalPrice: {
    color: colors.danger,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnBuyNow: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  textBtnBuyNow: {
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    width: 65,
    marginEnd: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
  },
  footer: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
  },
  btnBuyNowDisable: {
    backgroundColor: colors.disable,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  }
});

export default CartScreen;
