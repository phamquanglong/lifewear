import React, {useEffect, useState, useLayoutEffect} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constants';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux';
import { setAddressId } from '../../Store/actions';

var AddressItem = props => {
  var {item, index, setAddresses, navigation} = props;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AddAddress', {
          setAddresses: setAddresses,
          fn: '',
          phone: item.phone,
          addDetails: item.address,
          add: `${item.province.name}, ${item.district.name}, ${item.ward.name}`,
          item: item,
        });
      }}
      style={[styles.container, {marginTop: index == 0 ? 0 : 5}]}>
      <Text style={styles.fullName}>{item.address}</Text>
      <Text>{item.phone}</Text>
      <Text>{item.address}</Text>
      <Text>
        {item.province.name}, {item.district.name}, {item.ward.name}
      </Text>
      {item.toggleCheckBox && <Icon name="check" color={colors.primary} style={styles.checkBox}/>}
    </TouchableOpacity>
  );
};

var Addresses = props => {
  var dispatch = useDispatch()
  var dispatchRedux = (data) => {
    dispatch(setAddressId(data))
  }

  var [addresses, setAddresses] = useState([]);
  var [toggleCheckBox, setToggleCheckBox] = useState(false);
  var [oldAddresses, setOldAddresses] = useState([]);

  var {navigation} = props;

  var getAddresses = token => {
    const options = {
      method: 'GET',
      url: 'https://lifewear.mn07.xyz/api/user/addresses',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    axios
      .request(options)
      .then(response => {
        setAddresses(response.data)
        setOldAddresses(response.data)
      })
      .catch(error => console.error(error.response.data));
  };

  var deleteAddress = (id, token) => {
    const options = {
      method: 'DELETE',
      url: `https://lifewear.mn07.xyz/api/user/addresses/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    axios
      .request(options)
      .then(response => setAddresses(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then(response => getAddresses(response));
  }, []);

  return (
    <View>
      {addresses.length > 0 ? (
        <SwipeListView
          keyExtractor={key => key.id}
          data={addresses}
          renderItem={({item, index}) => {
            return (
              <AddressItem
                addresses={addresses}
                item={item}
                index={index}
                setAddresses={setAddresses}
                navigation={navigation}
                toggleCheckBox={toggleCheckBox}
              />
            );
          }}
          renderHiddenItem={({item, index}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
                marginStart: 10,
              }}>
              <CheckBox
                disabled={false}
                value={item.toggleCheckBox !== undefined ? item.toggleCheckBox : false}
                onValueChange={newValue => {
                  setToggleCheckBox(newValue)
                  setAddresses(oldAddresses)

                  var cloneAddresses = oldAddresses.map(address => {
                    if (item.id == address.id) {
                      return {
                        ...address,
                        toggleCheckBox:
                        address.toggleCheckBox === false ||
                        address.toggleCheckBox === undefined ? true : false
                      }
                    }
                    return address
                  })
                  dispatchRedux(cloneAddresses.filter(item => item.toggleCheckBox == true))
                  setAddresses(cloneAddresses)
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  AsyncStorage.getItem('token').then(response =>
                    deleteAddress(item.id, response),
                  );
                }}
                style={[
                  styles.deleteButton,
                  {
                    marginTop: index == 0 ? 10 : 5,
                    marginBottom: 5,
                  },
                ]}>
                <Icon
                  name="trash"
                  style={{
                    padding: 5,
                    fontSize: 30,
                  }}
                />
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75}
          leftOpenValue={40}
        />
      ) : (
        <View style={styles.addressesContent}>
          <Text>No address found</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddAddress', {setAddresses: setAddresses});
        }}
        style={styles.addNewAddress}>
        <Text style={styles.addNewAddressText}>Add new address</Text>
        <Icon name="plus" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

var styles = StyleSheet.create({
  addressesContent: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flex: 0.3,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    width: 65,
    marginEnd: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
  },
  fullName: {
    fontWeight: 'bold',
  },
  addNewAddress: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addNewAddressText: {
    color: colors.primary,
  },
  checkBox: {
    position: 'absolute',
    padding: 10,
    right: 0,
  },
});

export default Addresses;
