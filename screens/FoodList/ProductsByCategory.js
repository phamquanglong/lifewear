import React, {useState, useEffect} from 'react'
import SimilarProducts from '../ProductScreen/SimilarProducts'
import {
    View,
    Text,
    ActivityIndicator,
    RefreshControl,
    FlatList,
} from 'react-native'

var ProductsByCategory = (props) => {

    var {categories} = props
    var children = []
    categories.map(item => item.children).map(i => i.map(item => children.push(item)))

    useEffect(() => {
    }, [])


    return <View style={{flex: 1}}>
        <FlatList
        data={categories}
        keyExtractor={key => key.id}
        renderItem={({item, index}) => {
            return <SimilarProducts navigation={props.navigation} idCategory={item.id} isShowBtn={true}/>
        }}
        />
    </View>
}

export default ProductsByCategory