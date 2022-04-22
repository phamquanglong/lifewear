import React, {useState} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import {colors} from '../../constants'
import {isValidEmail, isValidResetCode} from '../../utilities/validations'
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message'

var VerifyResetCode = (props) => {

  var [resetCode, setResetCode] = useState('')
  var [errorResetCode, setErrorResetCode] = useState('');

    var showToast = (message) => {
        Toast.show({
          type: message.errors == undefined ? 'success' : 'error',
          text1: `${message.message}`
        });
        message.errors == undefined && setTimeout(() => {
          props.navigation.navigate('ResetPassword', {email: props.route.params.email,
          resetCode: resetCode})
        }, 4000)
      }

    var Verify = (email, resetCode) => {
        return fetch('https://lifewear.mn07.xyz/api/reset_password/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
    
          body: `{
            "email": "${email}",
            "reset_code": "${resetCode}"
          }`
        }).then((response) => response.json())
        .then((json) => Promise.resolve(json))
        .then((data) => showToast(data))
        .catch((err) => Promise.reject(err));
      }

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
          <Text style={styles.text}>Enter your reset code</Text>
          <TextInput
            maxLength={6}
            style={styles.textInput}
            placeholder="Code"
            onChangeText={text => {
              setErrorResetCode((text) => isValidResetCode(text) == false ?
              'Reset code must have 6 characters' : '')
              setResetCode(text);
            }}
          />
          {resetCode.length > 0 && isValidResetCode(resetCode) == false ? (
            <Text style={styles.errorResetCode}>{errorResetCode}</Text>
          ) : <View style={{height: 39,}}></View>}
          <TouchableOpacity
            disabled={isValidResetCode(resetCode) == false}
            style={{
              width: '90%',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 50,
              backgroundColor:
                isValidResetCode(resetCode) == true ? colors.primary : colors.disable,
            }}
            onPress={() => {
              Verify(props.route.params.email, resetCode);
            }}>
            <Text style={styles.textButton}>Verify</Text>
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
        width: '30%',
        marginVertical: 20,
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: colors.primary,
    },
    errorResetCode: {
        color: 'white',
        backgroundColor: colors.danger,
        padding: 10,
        paddingVertical: 5,
        marginBottom: 10,
    }
})
export default VerifyResetCode