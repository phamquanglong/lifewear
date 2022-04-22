import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants';
var UIButton = (props) => {
    return <TouchableOpacity onPress={props.onPress}
        style={{
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 5,
          marginHorizontal: 20,
          marginVertical: 10,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: props.isSelected == true ? 
          'white' : null,
        }}>
        {props.isSelected==true && <Icon name={"check-circle"} style={{
          position: 'absolute',
          left: 10,
          fontSize: 20,
          color: 'green'
        }}></Icon>}
        <Text style={{
            color: props.isSelected == true ? 
            colors.primary : 'white',
            fontSize: 15
          }}>
          {props.title}
        </Text>
      </TouchableOpacity>
}
export default UIButton;