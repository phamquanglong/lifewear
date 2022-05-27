import React, {useState} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import {colors} from '../../constants'
import {isValidConfirmPassword, isValidPassword} from '../../utilities/validations'
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message'
import { text } from '@fortawesome/fontawesome-svg-core';

var ResetPassword = (props) => {

    var showToast = (message) => {
        Toast.show({
          type: message.errors == undefined ? 'success' : 'error',
          text1: `${message.message}`
        });
        message.errors == undefined && setTimeout(() => {
          props.navigation.navigate('SignIn')
        }, 4000)
      }

    var [errorPassword, setErrorPassword] = useState('');
    var [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    var [password, setPassword] = useState('');
    var [confirmPassword, setConfirmPassword] = useState('');

    var isValidOK = () => password.length > 0 && isValidPassword(password) == true
      && isValidConfirmPassword(confirmPassword, password) == true && confirmPassword.length > 0

      var Reset = (email, resetCode, password) => {
        console.log(email, resetCode, password)
        fetch('https://lifewear.mn07.xyz/api/reset_password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: `{
            "email": "${email}",
            "reset_code": "${resetCode}",
            "password": "${password}"
          }`,
        })
          .then(response => response.json())
        //   .then(json => Promise.resolve(json))
          .then(data => showToast(data))
          .catch(err => alert(err));
      };

    return (
      <View style={styles.view}>
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
          {password.length > 0 ? <Text
            style={{
              color: 'red',
            }}>
            {errorPassword}
          </Text> : <Text
            style={{
              color: 'red',
            }}></Text>}
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
          {confirmPassword.length > 0 ? <Text
            style={{
              color: 'red',
            }}>
            {errorConfirmPassword}
          </Text> : <Text
            style={{
              color: 'red',
            }}></Text>}
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            disabled={isValidOK() == false}
            style={{
              marginVertical: 20,
              width: '90%',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 50,
              backgroundColor:
                isValidOK() == true ? colors.primary : colors.disable,
            }}
            onPress={() => {
                Reset(props.route.params.email, props.route.params.resetCode, password);
            }}>
            <Text style={styles.textButton}>Reset password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

var styles = StyleSheet.create({
    view: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        color: 'white',
        fontSize: 20,
    }
})

export default ResetPassword