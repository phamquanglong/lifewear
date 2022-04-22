import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  FlatList,
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword, isValidConfirmPassword} from '../utilities/validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FoodItem from '../FoodList/FoodItem';

var FiveStars = (props) => {
    var numberOfStars = props.numberOfStars
    return <View style={{
        flexDirection: 'row',
    }}>
        {[0, 1, 2, 3, 4].map(item => <Icon
        key={item}
        name="star"
        color={item <= numberOfStars - 1 ? colors.warning : colors.disable}
        style={{
            marginLeft: 2,
        }}
    />)}</View>
}

export default FiveStars;