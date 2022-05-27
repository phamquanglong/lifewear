import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {UIHeader} from '../../../components';
import NewAddressItem from './NewAddressItem';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../../constants';
import { StackActions, useScrollToTop } from '@react-navigation/native';

var AddressSelector = (props) => {
    var { name, id, nameDistrict, setTouchableText, arr, setWard_id } = props.route.params
  
    var [provinceList, setProvinceList] = useState([])
    var [searchText, setSearchText] = useState('')
    var [text, setText] = useState('')
    var [isShowCloseButton, setIsShowCloseButton] = useState(false)

    var {navigation, route} = props
    var {navigate, goBack, push, dispatch} = navigation
  
    var getProvince = (division_name, division_id, token) => {
      const options = {
        method: 'GET',
        url: 'https://lifewear.mn07.xyz/api/user/addresses/child_divisions',
        params: {division_name: division_name, division_id: division_id},
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
  
      axios
        .request(options)
        .then(response => setProvinceList(response.data))
        .catch(err => console.error(err));
    };
  
    useEffect(() => {
      AsyncStorage.getItem('token').then(response =>
        getProvince(name, id, response),
      );
    }, []);
  
    var searchProvince = () => {
        return provinceList.filter(province => 
          province.name.toLowerCase().includes(searchText.toLocaleLowerCase()))
    }

    var pop = (id) => {
      setWard_id(id)
      dispatch(StackActions.pop(3))
    }
  
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 60,
            alignItems: 'center',
            flexDirection: 'row',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity onPress={() => {
              goBack();
          }}
          style={styles.arrowLeft}>
              <Icon size={20} name="arrow-left"/>
          </TouchableOpacity>
          <Icon
            name="search"
            style={{
              position: 'absolute',
              fontSize: 20,
              left: 55,
            }}/>
          <TextInput
            value={text}
            onChangeText={value => {
              setSearchText(value);
              setIsShowCloseButton(value.length > 0 ? true : false);
              setText(value)
            }}
            style={{
              height: 40,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              flex: 1,
              marginRight: 10,
              borderRadius: 5,
              paddingStart: 35,
              fontSize: 16,
            }}/>
            {isShowCloseButton && (
              <TouchableOpacity
                onPress={() => {
                  setIsShowCloseButton(false)
                  setSearchText("")
                  setText("")
                }}
                style={styles.close}>
                <Icon name="close" size={15} color="white" />
              </TouchableOpacity>
            )}
        </View>
        <Text style={styles.title}>{name == "" ? "Province" : nameDistrict}</Text>
        <FlatList
        keyExtractor={key => key.id}
        data={searchProvince()}
        renderItem={({item, index}) => {
            return <TouchableOpacity onPress={() => {
              
              arr.push(item.name)
              setTouchableText([
                ...arr
              ]);

              name == "" ? push('AddressSelector', {
                name: 'province',
                id: item.id,
                nameDistrict: item.name,
                setTouchableText: setTouchableText,
                arr: arr,
                setWard_id: setWard_id,
              }) : (name == "province" ? push('AddressSelector', {
                name: "district",
                id: item.id,
                nameDistrict: item.name,
                setTouchableText: setTouchableText,
                arr: arr,
                setWard_id: setWard_id,
              }) : pop(item.id)
              )
            }}
            style={styles.touchable}>
                <Text style={styles.text}>{item.name}</Text>
                <View style={styles.line}></View>
            </TouchableOpacity>
        }}/>
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
    }
  });

  export default AddressSelector