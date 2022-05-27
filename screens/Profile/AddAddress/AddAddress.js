import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {UIHeader} from '../../../components';
import NewAddressItem from './NewAddressItem';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../../constants';
import AddressSelector from './AddressSelector'

var AddAddress = props => {
  var {fn, phone, addDetails, add, item} = props.route.params;

  var [fullName, setFullName] = useState('')
  var [phoneNumber, setPhoneNumber] = useState('')
  var [addressDetails, setAddressDetails] = useState('')
  var [address, setAddress] = useState('')

  var [ward_id, setWard_id] = useState('')

  var {navigation, route} = props;
  var {navigate, goBack} = navigation;

  var getInfo = () => {
      if (fn !== undefined) setFullName(fn);
      if (phone !== undefined) setPhoneNumber(phone);
      if (addDetails !== undefined) setAddressDetails(addDetails)
      if (add !== undefined) setAddress(add)
  }

  useEffect(() => {
      getInfo();
      if (item !== undefined) setWard_id(item.ward.id)
  }, [])

  var addAddress = (id, token) => {
    const options = {
        method: 'POST',
        url: 'https://lifewear.mn07.xyz/api/user/addresses',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token
        },
        data: {
          address: addressDetails,
          ward_id: id,
          phone: phoneNumber,
        }
      };
    
      axios.request(options).then(response => props.route.params.setAddresses(response.data))
  }

  var updateAddress = (id, token) => {
    console.log(id)
    const options = {
      method: 'PUT',
      url: `https://lifewear.mn07.xyz/api/user/addresses/${item.id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      data: {
        address: addressDetails,
        ward_id: id,
        phone: phoneNumber
      }
    };

    axios.request(options).then(response => props.route.params.setAddresses(response.data))
    .catch(err => console.log(err))
  }

  var activeBtnAdd = () => {
      if (fullName.length > 0 
        && phoneNumber.length > 0
        && address.length > 0
        && addressDetails.length > 0)
        return true
      else return false
  }

  return (
    <View style={styles.container}>
      <UIHeader
        title="Add new address"
        leftIcon="arrow-left"
        onPressLeftIcon={() => {
          goBack();
        }}
      />
      <NewAddressItem title="Contact" placeholder="Full name" func={setFullName} value={fullName}/>
      <NewAddressItem placeholder="Phone number" func={setPhoneNumber} value={phoneNumber}/>
      <NewAddressItem title="Address" placeholder="Specific address" func={setAddressDetails} value={addressDetails}/>
      <NewAddressItem value={address}
        touchable ward_id={ward_id} setWard_id={setWard_id}
        navigation={navigation} func={setAddress}/>
      <View style={{flex: 1}}></View>
      <TouchableOpacity disabled={!activeBtnAdd()}
      onPress={() => {
        console.log(add)
          if (add === undefined)
            AsyncStorage.getItem('token').then(response => addAddress(ward_id, response))
          else AsyncStorage.getItem('token').then(response => updateAddress(ward_id, response))
          goBack()
      }}
      style={[
        styles.btnAdd,
        {backgroundColor: activeBtnAdd() ? colors.primary : colors.disable}
      ]}>
          <Text style={styles.btnAddText}>{add !== undefined ? 'Update' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchable: {
      backgroundColor: 'white',
      flex: 1,
  },
  close: {
    position: 'absolute',
    top: 18,
    right: 15,
    backgroundColor: colors.disable,
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 50,
  },
  line: {
      height: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      marginStart: 30,
  },
  text: {
      paddingVertical: 20,
      marginStart: 30,
  },
  title: {
      color: colors.primary,
      paddingStart: 30,
      backgroundColor: 'white',
      paddingVertical: 10,
  },
  arrowLeft: {
      padding: 10,
      paddingEnd: 20,
  },
  btnAdd: {
      padding: 10,
      alignItems: 'center',
      margin: 10,
      borderRadius: 5,
  },
  btnAddText: {
      color: 'white',
      fontSize: 20,
  }
});

export default AddAddress;
