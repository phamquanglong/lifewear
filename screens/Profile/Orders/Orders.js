import OrderItem from './OrderItem'
import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import {
    faReceipt,
    faTruck,
    faBoxesPacking,
    faBoxOpen
  } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import { orderSelector } from '../../../Store/selector';

var Orders = (props) => {
    var order = useSelector(orderSelector)
    var countConfirmation = order.length

    var orderItemList = [
        { text: "Confirmation", icon: faReceipt },
        { text: "Confirmed", icon: faBoxesPacking },
        { text: "Delivery", icon: faTruck },
        { text: "Received", icon: faBoxOpen },
    ]

    var getCount = (item) => {
        if (item.text == "Confirmation")
            return countConfirmation
        else if (item.text == "Confirmed")
            return 0
        else if (item.text == "Delivery")
            return 0
        else return 0
    }

    return <View style={styles.container}>
        <FlatList
        numColumns={2}
        keyExtractor={key => key.text}
        data={orderItemList}
        renderItem={({item, index}) => {
            return <OrderItem text={item.text} icon={item.icon} index={index} count={getCount(item)}/>
        }}/>
    </View>
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
    }
})

export default Orders