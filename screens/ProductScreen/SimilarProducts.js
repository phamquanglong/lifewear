import React, {useState, useEffect, useMemo, useLayoutEffect, useContext} from 'react';
import {View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  VirtualizedList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import ProductItem from '../ProductsGrid/ProductItem';
import DropShadow from "react-native-drop-shadow";
import { StackActions, useScrollToTop } from '@react-navigation/native';
import {colors} from '../../constants';
import {refreshContext} from '../FoodList/FoodList'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addWishList, deleteWishlist } from '../WishList/WishListController';
import { setWishList } from '../../Store/actions';
import { useDispatch } from 'react-redux';


var SimilarProducts = (props) => {
    const dispatch = useDispatch();

    const wishListData = (data) => {
    dispatch(setWishList(data))
    }

    var [isLoading, setIsLoading] = useState(true)

    var [productsData, setProductsData] = useState([])

    var [category, setCategory] = useState()

    var getProductsByCategory = (id) => {
      fetch(`https://lifewear.mn07.xyz/api/categories/${id}?perpage=7&=`, {
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
        },
      }).then(response => response.json())
      .then(json => {
        setProductsData(json.products.data)
        setCategory(json.name)
      })
      .then(() => setIsLoading(false))
    }

    useLayoutEffect(() => {
      getProductsByCategory(props.idCategory)
      return () => {
        setProductsData({})
      };
    }, [])

    

    var handleLike = (item) => {
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
    }

    return isLoading ? (
      <ActivityIndicator animating={true} />
    ) : (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
          <View style={styles.line}></View>
          <Text style={styles.similarProducts}>
            {props.title == undefined ? category : props.title}
          </Text>
          <View style={styles.line}></View>
        </View>
        <FlatList
          initialNumToRender={2}
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
                  borderRadius: 10,
                }}
                onPress={() => {
                  props.navigation.dispatch(
                    StackActions.push('ProductScreen', {item: item}),
                  );
                }}>
                <ProductItem
                  item={item}
                  index={index}
                  onPress={() => {
                    AsyncStorage.getItem('token').then(response => item.isLiked
                      ? deleteWishlist(item.id, response, wishListData) : addWishList(item.id, response, wishListData));
                    handleLike(item)
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />

        {props.isShowBtn && <TouchableOpacity 
        style={styles.btn}
        onPress={() => {
          props.navigation.navigate('CategoryScreen', {
            idCategory: props.idCategory,
          })
        }}
        >
          <Text style={styles.textBtn}>See all products</Text>
        </TouchableOpacity>}
      </View>
    );
}

var styles = StyleSheet.create({
  container: {
    flex: 0.7,
  },
  similarProducts: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.disable,
  },
  btn: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  textBtn: {
    color: 'white',
  }
});

export default SimilarProducts;