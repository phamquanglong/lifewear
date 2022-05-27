import React, {useState} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import {colors} from '../../constants'
import {isValidEmail} from '../../utilities/validations'
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message'

var ForgetPassword = (props) => {

  var {navigation, route} = props
  var {navigate, goBack} = navigation

  var [email, setEmail] = useState('')
  var [errorEmail, setErrorEmail] = useState('');

    var showToast = (message) => {
        Toast.show({
          type: message.errors == undefined ? 'success' : 'error',
          text1: message.errors == undefined ? 'Sent code successfully' : 'Email is not registered',
          text2: `${message.message}`
        });
        message.errors == undefined && setTimeout(() => {
          navigate('VerifyResetCode', {email: email})
        }, 4000)
      }

    var GetResetCode = (email) => {
        return fetch('https://lifewear.mn07.xyz/api/forgot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
    
          body: `{"email": "${email}"}`
        }).then((response) => response.json())
        .then((json) => Promise.resolve(json))
        .then((data) => showToast(data))
        .catch((err) => console.error(err));
      }

    var isValidOK = () => email.length > 0 && isValidEmail(email) == true

    return (
      <View style={{flex: 1}}>
        <View style={{padding: 10,}}>
            <TouchableOpacity
            onPress={() => {
                props.navigation.goBack()
            }}>
                <Icon name="arrow-left" color={colors.primary} size={25}/>
            </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.9,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.text}>Enter your email address</Text>
          <Text style={styles.text}>We will send reset code to your email</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            onChangeText={text => {
              setErrorEmail(
                isValidEmail(text) == false
                  ? 'Email not in correct format'
                  : '',
              );
              setEmail(text);
            }}
          />
          {email.length > 0 && isValidOK() == false ? (
            <Text style={styles.errorEmail}>{errorEmail}</Text>
          ) : <View style={{height: 39,}}></View>}
          <TouchableOpacity
            disabled={isValidOK() == false}
            style={{
              width: '90%',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 50,
              backgroundColor:
                isValidOK() == true ? colors.primary : colors.disable,
            }}
            onPress={() => {
              GetResetCode(email);
            }}>
            <Text style={styles.textButton}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

var styles = StyleSheet.create({
    textButton: {
        color: 'white',
        fontSize: 20,
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        width: '90%',
        marginVertical: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: colors.primary,
    },
    errorEmail: {
        color: 'white',
        backgroundColor: colors.danger,
        padding: 10,
        paddingVertical: 5,
        marginBottom: 10,
    }
})
export default ForgetPassword