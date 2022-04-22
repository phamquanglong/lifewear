import React, {useState} from 'react';
import {Text,
        View,
        Image,
    } from 'react-native';
import { colors } from '../../constants';
import FiveStars from '../ProductsGrid/FiveStars';

var Comments = (props) => {

    var {item, index} = props;

    return <View style={{
            flex: 1,
            backgroundColor: 'white',
            marginBottom: 5,
            marginTop: index < 1 ? 5 : 0,
            padding: 5,
            borderRadius: 10,
        }}>
        <View 
        style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Image source={{
                uri: item.user.avatar,
            }} style={{
                borderRadius: 50,
                width: 40,
                height: 40,
                borderWidth: 2,
                borderColor: 'black',
            }}/>
            <View style={{marginStart: 10,}}>
                <Text>{item.user.first_name} {item.user.last_name}</Text>
                <FiveStars numberOfStars={item.rating}/>
            </View>
        </View>
        <Text style={{
            marginVertical: 10,
        }}>{item.comment}</Text>
        {item.user.avatar != null && <Image
        style={{height: 100, width: 100}}
        source={{uri: item.user.avatar}}/>}
    </View>
}

export default Comments;