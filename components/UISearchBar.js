import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UICartButton from './UICartButton';
import {images, icons, colors} from '../constants/index';

var UISearchBar = props => {
  var {navigation, setSearchText} = props;
  var [isShowCloseButton, setIsShowCloseButton] = useState(isShowCloseButton);
  var [text, setText] = useState(text);

  return (
    <View
      style={{
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        marginStart: 10,
      }}>
      <Icon
        name="search"
        style={{
          position: 'absolute',
          fontSize: 20,
          left: 10,
        }}></Icon>
      <TextInput
        value={text}
        onChangeText={value => {
          setSearchText(value);
          setText(value);
          setIsShowCloseButton(value.length > 0 ? true : false);
        }}
        style={{
          height: 40,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          flex: 1,
          marginRight: 10,
          borderRadius: 5,
          paddingStart: 35,
          fontSize: 16,
        }}></TextInput>

      {isShowCloseButton && (
        <TouchableOpacity
          onPress={() => {
            setText("");
            setIsShowCloseButton(false)
            setSearchText("");
          }}
          style={styles.close}>
          <Icon name="close" size={15} color="white" />
        </TouchableOpacity>
      )}
      <UICartButton
        color={colors.primary}
        navigation={navigation}
        style={styles.cartButton}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  cartButton: {
    padding: 5,
    paddingEnd: 7,
    marginVertical: 10,
    marginEnd: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 10,
  },
  close: {
    position: 'absolute',
    top: 18,
    right: 65,
    backgroundColor: colors.disable,
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 50,
  },
});

export default UISearchBar;
