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
  Alert,
} from 'react-native';
import {images, icons, colors} from '../constants';
import {UIButton} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword, isValidConfirmPassword} from '../utilities/validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {user, repositories} from '../repositories'
import {Picker} from '@react-native-picker/picker'
import Toast from 'react-native-toast-message'
import {auth,
  firebaseDatabase,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from './Firebase/Firebase'

var Register = (props) => {
    var [keyboardIsShown, setKeyboardIsShown] = useState(false);

  var [errorEmail, setErrorEmail] = useState('');
  var [errorPassword, setErrorPassword] = useState('');
  var [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [confirmPassword, setConfirmPassword] = useState('');
  var [firstName, setFirstName] = useState('');
  var [lastName, setLastName] = useState('');

  var [selectedValue, setSelectedValue] = useState(0);

  var isValidOK = () => email.length > 0 && password.length > 0
      && isValidEmail(email) == true && isValidPassword(password) == true
      && isValidConfirmPassword(confirmPassword, password) == true && confirmPassword.length > 0
      && firstName.length > 0 && lastName.length > 0

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShown(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShown(false);
    });

    const xx = auth
  });

  var {navigation, route} = props
  var {navigate, goBack} = navigation

  var [isRegistered, setIsRegistered] = useState(false);

  var showToast = () => {
    setIsRegistered(true);
    Toast.show({
      type: 'success',
      text1: 'Create Account Successful',
      text2: 'Welcome to LifeWear! 👋'
    });
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user
    }).catch(error => console.error(error))
    setTimeout(() => {
      navigate('SignIn')
    }, 4000)
  }

  var Register = () => {
    return fetch('https://lifewear.mn07.xyz/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: `{"first_name": "${firstName}","last_name": "${lastName}","email": "${email}","password": "${password}","gender": ${selectedValue}}`
    }).then(response => response.json())
    .then(json => json.errors === undefined ? showToast() : alert(json.errors.email))
  }

    return (
      <View
        style={{flex: 1}}
        pointerEvents={isRegistered == true ? 'none' : 'auto'}>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}>
          <View style={{position: 'absolute', padding: 10}}>
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}>
              <Icon size={30} name="arrow-left" color="white" style={{}} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flex: 0.3,
              marginVertical: 50,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
                fontStyle: 'italic',
                width: '50%',
              }}>
              Create your account
            </Text>
            <Image
              source={images.login}
              style={{
                width: 100,
                height: 100,
              }}></Image>
          </View>
          <View
            style={{
              flex: 0.7,
              backgroundColor: 'white',
              paddingVertical: 10,
              marginHorizontal: 10,
              borderRadius: 15,
            }}>
            <ScrollView style={{height: 400}}>
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
                  placeholder={'example@gmail.com'}></TextInput>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.primary,
                    width: '100%',
                  }}></View>
                {email.length > 0 ? <Text
                  style={{
                    color: 'red',
                  }}>
                  {errorEmail}
                </Text> : <Text
                  style={{
                    color: 'red',
                  }}></Text>}
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 15,
                  }}>
                  First Name:
                </Text>
                <TextInput
                  placeholder={'Enter your first name'}
                  onChangeText={text => {
                    setFirstName(text);
                  }}></TextInput>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.primary,
                    width: '100%',
                  }}></View>
              </View>
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
                  Last Name:
                </Text>
                <TextInput
                  placeholder={'Enter your first name'}
                  onChangeText={text => {
                    setLastName(text);
                  }}></TextInput>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.primary,
                    width: '100%',
                  }}></View>
              </View>
              <View>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 15,
                    marginHorizontal: 20,
                    marginTop: 10,
                  }}>
                  Gender:
                </Text>
                <Picker
                  style={{
                    marginHorizontal: 5,
                    marginStart: 20,
                  }}
                  mode={'dropdown'}
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                  }}>
                  <Picker.Item label={'Male'} value={0} />
                  <Picker.Item label={'Female'} value={1} />
                </Picker>
              </View>
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
                  secureTextEntry={true}
                  placeholder={'Enter your password'}></TextInput>
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
              <View
                style={{
                  marginHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 15,
                  }}>
                  Confirm Password:
                </Text>
                <TextInput
                  onChangeText={text => {
                    setErrorConfirmPassword(
                      isValidConfirmPassword(text, password) == false
                        ? 'Confirm password is not valid'
                        : '',
                    );
                    setConfirmPassword(text);
                  }}
                  secureTextEntry={true}
                  placeholder={'Re-enter your password'}></TextInput>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.primary,
                    width: '100%',
                  }}></View>
                {confirmPassword.length > 0 ? (
                  <Text
                    style={{
                      color: 'red',
                    }}>
                    {errorConfirmPassword}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'red',
                    }}></Text>
                )}
              </View>
            </ScrollView>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                disabled={isValidOK() == false}
                onPress={() => {
                  Register();
                }}
                style={{
                  backgroundColor:
                    isValidOK() == true ? colors.primary : colors.disable,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 80,
                  marginTop: 10,
                  borderRadius: 30,
                }}>
                <Text
                  style={{
                    padding: 10,
                    color: 'white',
                    fontSize: 17,
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
}

export default Register;