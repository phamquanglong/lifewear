import React, {useState, useEffect, useRef} from 'react';
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
import FiveStars from './FiveStars';
import GridItem from './GridItem';
import {SliderBox} from 'react-native-image-slider-box';
import ProductItem from './ProductItem';
import SimilarProducts from '../ProductScreen/SimilarProducts'

var ProductsGrid = (props) => {
    return <FlatList
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.01)',
            // flex: 0.9,
          }}
          keyExtractor={item => item.name}
          data={props.filteredProducts()}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <GridItem
                item={item}
                index={index}
                navigation={props.navigation}
                onPress={() => {
                  var cloneProducts = props.products.map(product => {
                    if (item.name == product.name) {
                      return {
                        ...product,
                        isLiked:
                          product.isLiked == false ||
                          product.isLiked == undefined
                            ? true
                            : false,
                      };
                    }
                    return product;
                  });
                  props.setProducts(cloneProducts);
                }}
              />
            );
          }}
        />
}

export default ProductsGrid