import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';


var NewAddressItem = props => {
  var {placeholder, title, touchable, navigation, setWard_id, func, value} = props;

  var [touchableText, setTouchableText] = useState([])

  var arr = []

  useEffect(() => {
    func(touchableText.join(', '))
  }, [touchableText])

  return (
    <View>
      {title !== undefined && <Text style={styles.title}>{title}</Text>}
      {touchable ? (
        <TouchableOpacity onPress={() => {
            arr = []
            setTouchableText([])
            navigation.push('AddressSelector', {name: "", setTouchableText: setTouchableText, arr: arr, setWard_id: setWard_id})
        }}
        style={styles.touchable}>
          <Text style={styles.touchableText}>{touchableText.length == 0 
          ? (value.length > 0 ? value : "Province, district") 
          : touchableText.join(', ')}</Text>
          <Icon name="arrow-right" size={20} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <TextInput value={value}
        style={styles.container}
        keyboardType={placeholder == "Phone number" ? "number-pad" : "default"}
        placeholder={placeholder}
        onChangeText={(text) => {
          func(text)
        }}/>
      )}
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  title: {
    color: colors.primary,
    margin: 10,
    fontWeight: 'bold',
  },
  touchable: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchableText: {
    color: colors.primary,
    flex: 0.8,
  },
});

export default NewAddressItem;
