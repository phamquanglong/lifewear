import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { UIHeader } from '../../components';
import ProductItem from '../ProductsGrid/ProductItem'
import { deleteWishlist } from './WishListController';
import { wishListSelector } from '../../Store/selector';
import { setWishList } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';


var WishListScreen = (props) => {
    var wishList = useSelector(wishListSelector)

    const dispatch = useDispatch();

    const wishListData = (data) => {
        dispatch(setWishList(data))
    }

    var handleLike = () => {
        if (wishList.length > 0 && wishList !== undefined) {
            var cloneProducts = wishList.map(product => {
                return {
                    ...product,
                    isLiked: true
                  };
              });
              return cloneProducts
        }
    }

    var getWishList = (token) => {
        const options = {
            method: 'GET',
            url: 'https://lifewear.mn07.xyz/api/user/wishlist',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Bearer ' + token
            }
          };
        
          axios.request(options)
          .then(response => wishListData(response.data))
          .catch(err => console.error(err))
    }

    useEffect(() => {
        AsyncStorage.getItem('token').then(response => getWishList(response))
        console.log(wishList)
    }, [])
    

    return <View style={{flex: 1}}>
        <UIHeader
        title="WishList"/>
        {wishList.length > 0 ? <FlatList
        numColumns={2}
        keyExtractor={key => key.id}
        data={handleLike()}
        renderItem={({item, index}) => {
            return <TouchableOpacity
            style={{
                flex: 0.5,
                height: 270,
                marginLeft: index % 2 == 0 ? 10 : 5,
                marginRight: index % 2 == 0 ? 5 : 10,
                marginTop: index < 2 ? 10 : 0,
                marginBottom: 10,
                borderRadius: 10,
            }}
            onPress={() => {
              props.navigation.dispatch(
                StackActions.push('ProductScreen', {item: item}),
              );
            }}>
            <ProductItem item={item} index={index} onPress={() => {
                AsyncStorage.getItem('token').then(response => deleteWishlist(item.id, response, wishListData))
            }}/>
            </TouchableOpacity>
        }}/> : <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>No product in your wishlist</Text>
        </View>}
    </View>
}

export default WishListScreen