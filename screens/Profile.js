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
  Switch,
} from 'react-native';
import {images, icons, colors} from '../constants';
import {UIButton, UIHeader} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword, isValidConfirmPassword} from '../utilities/validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import {user as userRepository,
        population as populationRepository,
    } from '../repositories'
import {convertDateTimeToString} from '../utilities/dateTime'

var Profile = (props) => {
    var [user, setUser] = useState({})

    var getUser = (token) => {
      return fetch("https://lifewear.mn07.xyz/api/user", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => Promise.resolve(data))
        .then((data) => setUser(data))
        .catch((err) => Promise.reject(err));
    }

    useEffect(() => {
      getUser(props.route.params.token)
      console.log(user)
    }, [])

    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginStart: 10,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: user.avatar}}
            style={{
              borderRadius: 50,
              width: 70,
              height: 70,
              margin: 10,
              marginStart: 0,
            }}
          />
          <View
            style={{
              marginStart: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{user.full_name}</Text>
            <View style={{flexDirection: 'row',}}>
              <Text style={{fontWeight: 'bold'}}>Phone:</Text>
              <Text></Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginStart: 10,
          }}>
          <Text style={{fontWeight: 'bold'}}>Email:</Text>
          <Text> {user.email}</Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            marginStart: 10,
          }}>
          <Text style={{fontWeight: 'bold'}}>Date of birth:</Text>
          <Text> {convertDateTimeToString(dateOfBirth)}</Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginStart: 10,
          }}>
          <Text style={{fontWeight: 'bold'}}>Gender:</Text>
          <Text> {user.gender == 0 ? 'Male' : 'Female'}</Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            marginStart: 10,
          }}>
          <Text style={{fontWeight: 'bold'}}>Address:</Text>
          <Text> {address}</Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginStart: 10,
          }}>
          <Text style={{fontWeight: 'bold'}}>Phone:</Text>
        </View>
        <TouchableOpacity style={{backgroundColor: "red"}} onPress={() => {
          console.log(user);
          }}>
          <Text style={{fontWeight: 'bold'}}>User</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

export default Profile;