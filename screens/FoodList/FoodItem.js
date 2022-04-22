
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
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton} from '../../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from '../../utilities/validations';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

var getColorFromStatus = (status) => {
    if (status.toLowerCase().trim() == 'opening now')
      return colors.success
    else if (status.toLowerCase().trim() == 'opening soon')
      return colors.warning
    else return colors.danger
  }

var FoodItem = (props) => {
    var {name, price, socialNetwork, status, url, website} = props.food;
    return (<TouchableOpacity
    onPress={() => {
        alert(`You press item name: ${name}`);
    }}
    style={{
      flexDirection: 'row',
      height: 130,
      padding: 10,
    }}>
    <Image
      source={{
        uri: `${url}`,
      }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 10,
      }}
    />
    <View
      style={{
        flex: 1,
        marginLeft: 10,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 20,
        }}>
        {name}
      </Text>
      <View
        style={{
          height: 2,
          backgroundColor: 'black',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 15,
          }}>
          Status:
        </Text>
        <View style={{
            width: 5,
        }}></View>
        <Text
          style={{
            color: getColorFromStatus(status),
          }}>
          {status.toUpperCase()}
        </Text>
      </View>
      <Text style={{}}>Price: {price}</Text>
      <Text style={{}}>Website: {website}</Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {socialNetwork['facebook'] != undefined && <Icon name="facebook" size={18} color={colors.disable}
        style={{
            marginRight: 5,
        }}></Icon>}
        {socialNetwork['instagram'] != undefined && <Icon name="instagram" size={18} color={colors.disable}style={{
            marginRight: 5,
        }}></Icon>}
        {socialNetwork['twitter'] != undefined && <Icon name="twitter" size={18} color={colors.disable}style={{
            marginRight: 5,
        }}></Icon>}
      </View>
    </View>
  </TouchableOpacity>
)
}

export default FoodItem;