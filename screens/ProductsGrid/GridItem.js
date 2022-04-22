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
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword, isValidConfirmPassword} from '../utilities/validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FoodItem from '../FoodList/FoodItem';
import FiveStars from './FiveStars';

var GridItem = (props) => {
    var {item, index, onPress} = props
    return (
      <View
        style={{
          flex: 0.5,
          height: 270,
          marginLeft: index % 2 == 0 ? 10 : 5,
          marginRight: index % 2 == 0 ? 5 : 10,
          marginBottom: 10,
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ProductScreen', {
              item: item,
            });
          }}
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Image
            source={{
              uri: item.cover.image,
            }}
            style={{
              width: '95%',
              height: 100,
              borderRadius: 10,
              margin: 5,
              alignSelf: 'center',
            }}
          />
          <Text
            numberOfLines={2}
            style={{
              margin: 5,
              fontWeight: 'bold',
              color: colors.primary,
            }}>
            {item.name}
          </Text>
          <View style={{marginHorizontal: 5, height: 45}}>
            <Text>* {item.description}</Text>
          </View>
          <View style={{
            flex: 1,
          }}>
            <Text
              style={{
                margin: 5,
                fontSize: 17,
                flex: 1,
                color: colors.danger,
              }}>
              {item.price}
            </Text>
          </View>
          {
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
                    item.isLiked == false || item.isLiked == undefined
                      ? colors.disable
                      : colors.primary
                  }
                  name="heart"
                  size={25}></Icon>
                <Text
                  style={{
                    color:
                      item.isLiked == false || item.isLiked == undefined
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
          }
        </TouchableOpacity>
      </View>
    );
}

export default GridItem;