import React from 'react';
import {
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../constants';

var UIGoBackButton = (props) => {

    var {navigation, style} = props

    return <TouchableOpacity
    style={style}
    onPress={() => {
      navigation.goBack()
    }}>
    <Icon
      size={20}
      name="arrow-left"
      color={colors.primary}
    />
  </TouchableOpacity>
}


export default UIGoBackButton