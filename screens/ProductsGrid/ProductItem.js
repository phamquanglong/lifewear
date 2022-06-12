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
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from '../utilities/validations';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FoodItem from '../FoodList/FoodItem';
import FiveStars from './FiveStars';
import RenderHtml from 'react-native-render-html';

var ProductItem = props => {
  var {item, index, onPress} = props;

  const source = {
    html: `${item.description}`,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={{
            uri: item.cover,
          }}
          style={{
            width: '95%',
            height: 140,
            borderRadius: 10,
            margin: 5,
            alignSelf: 'center',
          }}
        />
      </View>
      <Text
        numberOfLines={2}
        style={{
          margin: 5,
          fontWeight: 'bold',
          color: colors.primary,
        }}>
        {item.name}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            margin: 5,
            fontSize: 16,
            color: colors.danger,
          }}>
          {parseInt(item.sale_price).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
        <Text
          style={{
            margin: 5,
            fontSize: 16,
            color:
              item.sale_price !== undefined ? colors.disable : colors.danger,
            textDecorationLine:
              item.sale_price !== undefined ? 'line-through' : 'none',
          }}>
          {parseInt(item.price).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          flex: 1,
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
          }}>
          <Icon
            color={
              item.wished == false || item.wished == undefined
                ? colors.disable
                : colors.primary
            }
            name="heart"
            size={25}></Icon>
          <Text
            style={{
              color:
                item.wished == false || item.wished == undefined
                  ? colors.disable
                  : colors.primary,
              fontSize: 12,
              maxWidth: 50,
              marginHorizontal: 5,
            }}>
            Save for later
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <FiveStars numberOfStars={item.rating_avg} />
          <Text
            style={{
              fontSize: 11,
              color: colors.facebook,
            }}>
            {item.public_reviews_count} reviews
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
