import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {images, icons, colors} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

var UIHeader = (props) => {
    var {title,
      rightIcon,
      leftIcon,
      onPressLeftIcon,
      onPressRightIcon} = props
    return <View style={{
        height: 50,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {leftIcon != undefined ? <TouchableOpacity
          onPress={onPressLeftIcon}>
          <Icon name={leftIcon} style={styles.icon}/>
        </TouchableOpacity> : <View style={{
          height: 50,
          width: 50,
        }}></View>}
        <Text style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        }}>{title}</Text>
        {rightIcon != undefined ? <TouchableOpacity
          onPress={onPressRightIcon}>
          <Icon name={rightIcon} style={styles.icon}/>
        </TouchableOpacity> : <View style={{
          height: 50,
          width: 50,
        }}></View>}
      </View>
}

var styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    padding: 10,
    color: 'white',
  }
})

export default UIHeader;