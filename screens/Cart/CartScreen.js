import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { UIHeader } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cart from './Cart';

var CartScreen = (props) => {
    console.log(props)
    var {navigation, route} = props
    var {navigate, goBack} = navigation

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <UIHeader
          title="Cart"
          leftIcon="arrow-left"
          onPressLeftIcon={() => {
            goBack()
          }}
          />
          <Cart />
        </View>
        {/* <View style={{position: 'absolute', padding: 10}}>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}>
            <Icon size={25} name="arrow-left" color="white" style={{}} />
          </TouchableOpacity>
        </View> */}
      </View>
    );
}

export default CartScreen