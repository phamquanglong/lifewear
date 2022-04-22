import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {images, icons, colors} from '../constants';
import {UIButton} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword} from '../utilities/validations'
import {auth,
  firebaseDatabase,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseDatabaseSet,
  signInWithEmailAndPassword,
} from './Firebase/Firebase'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import {StackActions} from '@react-navigation/native'

var SignIn = props => {

  var [keyboardIsShown, setKeyboardIsShown] = useState(false);

  var [errorEmail, setErrorEmail] = useState('');
  var [errorPassword, setErrorPassword] = useState('');

  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');

  var isValidOK = () => email.length > 0 && password.length > 0
      && isValidEmail(email) == true && isValidPassword(password) == true

      var getToken = (email, password ) => {
        try {
          return fetch('https://lifewear.mn07.xyz/api/login', {
            method: 'POST',
            headers: {
              "Content-Type":'application/json',
              Accept: 'application/json',
            },
            body: `{"email":"${email}","password":"${password}","device_name":"Iphone 16"}`
          }).then((response) => response.json())
          .then((json) => Promise.resolve(json))
        } catch (error) {
          console.error(error)
        }
      }
    
  useEffect(() => {

    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShown(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShown(false);
    });

    // onAuthStateChanged(auth, (responseUser) => {
    //   if (responseUser) {
    //     let user = {
    //       userId: responseUser.uid,
    //       email: responseUser.email,
    //       emailVerified: responseUser.emailVerified,
    //       accessToken: responseUser.accessToken,
    //     }
    //     firebaseDatabaseSet(firebaseDatabaseRef(
    //       firebaseDatabase,
    //       `users/${responseUser.uid}`
    //     ), user)
    //     AsyncStorage.setItem("user", JSON.stringify(user))
    //   }
    // })
  });

    //navigation
    var {navigation, route} = props;
    var {navigate, goBack, dispatch} = navigation;

    var Signin = (token) => {
      // signInWithEmailAndPassword(auth, email, password)
      // .then(userCredential => {
      //   const user = userCredential.user
      //   console.log(user)
      // }).then(() => navigation.dispatch(StackActions.replace('UITab', {token: token})))
      // .catch(error => console.error(error))

      navigation.dispatch(StackActions.replace('UITab', {token: token}))
    }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          height: 200,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flex: 0.35,
        }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 30,
            fontWeight: 'bold',
            fontStyle: 'italic',
            width: '50%',
          }}>
          Already have an account?
        </Text>
        <Image
          source={images.fire}
          style={{
            width: 120,
            height: 120,
          }}></Image>
      </View>
      <View
        style={{
          flex: 0.32,
        }}>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 15,
            }}>
            Email:
          </Text>
          <TextInput
            onChangeText={text => {
              setErrorEmail(
                isValidEmail(text) == false
                  ? 'Email not in correct format'
                  : '',
              );
              setEmail(text);
            }}
            placeholder={'example@gmail.com'}
            placeholderTextColor={colors.placeholder}></TextInput>
          <View
            style={{
              height: 1,
              backgroundColor: colors.primary,
              width: '100%',
            }}></View>
          {email.length > 0 ? (
            <Text
              style={{
                color: 'red',
              }}>
              {errorEmail}
            </Text>
          ) : (
            <Text
              style={{
                color: 'red',
              }}></Text>
          )}
        </View>
        <View
          style={{
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 15,
            }}>
            Password:
          </Text>
          <TextInput
            onChangeText={text => {
              setErrorPassword(
                isValidPassword(text) == false
                  ? 'Password must have at least 7 character'
                  : '',
              );
              setPassword(text);
            }}
            // ref={inputRef}
            secureTextEntry={true}
            placeholder={'Enter your password'}
            placeholderTextColor={colors.placeholder}></TextInput>
          <View
            style={{
              height: 1,
              backgroundColor: colors.primary,
              width: '100%',
            }}></View>
          {password.length > 0 ? (
            <Text
              style={{
                color: 'red',
              }}>
              {errorPassword}
            </Text>
          ) : (
            <Text
              style={{
                color: 'red',
              }}></Text>
          )}
        </View>
        <View style={{
          flex: 1,
          alignItems: 'flex-end',
        }}>
          <TouchableOpacity
            onPress={() => {
              navigate('ForgetPassword');
            }}
            style={{
              marginEnd: 20,
              paddingTop: 10,
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: colors.primary,
              }}>
              Forget your password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {keyboardIsShown == false && (
        <View
          style={{
            flex: 0.13,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            disabled={isValidOK() == false}
            onPress={() => {
              getToken(email, password).then(({token}) =>
                token !== undefined
                  ? Signin(token)
                  : alert('email or password incorrect'),
              );
            }}
            style={{
              backgroundColor:
                isValidOK() == true ? colors.primary : colors.disable,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 10,
              borderRadius: 30,
            }}>
            <Text
              style={{
                padding: 10,
                color: 'white',
                fontSize: 20,
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate('Register');
            }}>
            <Text
              style={{
                padding: 10,
                color: colors.primary,
                fontSize: 13,
                alignSelf: 'center',
              }}>
              New user? Register now
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {keyboardIsShown == false && (
        <View
          style={{
            flex: 0.2,
          }}>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <View style={{height: 1, backgroundColor: 'black', flex: 1}}></View>
            <Text
              style={{
                padding: 10,
                color: 'black',
                fontSize: 13,
                alignSelf: 'center',
              }}>
              User other method?
            </Text>
            <View style={{height: 1, backgroundColor: 'black', flex: 1}}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Icon
              name="facebook-square"
              size={50}
              color={colors.facebook}></Icon>
            <View style={{width: 20}}></View>
            <Icon name="google" size={50} color={colors.google}></Icon>
          </View>
        </View>
      )}
    </View>
  );
};
export default SignIn;
