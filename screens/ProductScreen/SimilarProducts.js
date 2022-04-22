import React, {useState, useEffect, useMemo} from 'react';
import {View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import ProductItem from '../ProductsGrid/ProductItem';
import DropShadow from "react-native-drop-shadow";
import { StackActions, useScrollToTop } from '@react-navigation/native';

var SimilarProducts = (props) => {

    var [productsData, setProductsData] = useState([]);

    var getProductsData = async () => {
        try {
            const response = await fetch('https://lifewear.mn07.xyz/api/products?limit=6&start=10');
            
            var json = await response.json();
            setProductsData(json)
        } catch (error) {
            console.error(error);
        } finally {() => {
            setLoading(false);
            }
        }
    }

    useEffect(() => {
        getProductsData()
        return () => {
          setProductsData({});
        };
    }, [])

    return (
        <FlatList
          listKey={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={productsData}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  height: 270,
                  width: 180,
                  marginLeft: index < 1 ? 10 : 0,
                  marginRight: 10,
                  marginBottom: 10,
                  // marginTop: index <= 1 ? 10 : 0,
                  borderRadius: 10,
                }}
                onPress={() => {
                  props.navigation.dispatch(StackActions.replace('ProductScreen', {item: item}))
                  props.onPress()
                }}>
                <ProductItem
                  item={item}
                  index={index}
                  onPress={() => {
                    var cloneProducts = productsData.map(product => {
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
                    setProductsData(cloneProducts);
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
    );
}

var styles = StyleSheet.create({
  // shadowProp: {
  //   shadowColor: 'black',
  //   shadowOffset: {width: 0, height: 3},
  //   shadowOpacity: 0.4,
  //   shadowRadius: 2,
  // },
});

export default SimilarProducts;