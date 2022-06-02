import React, {useState, useEffect} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    StackActions,
} from 'react-native'
import {images, icons, colors} from '../../constants';
// import { GoogleSignin } from 'react-native-google-signin'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import {auth,
    firebaseDatabase,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
  } from '../Firebase/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faGooglePlusIcon,
} from '@fortawesome/free-solid-svg-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

var SignInWithGoogle = (props) => {
    var [userInfo, setUserInfo] = useState({})

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
          props.navigation.dispatch(StackActions.replace('UITab', {token: props.getToken(googleUser.user.email, googleUser.user.email)}))
        }, 4000)
      }
    
      var Register = (firstName, lastName, email, password, selectedValue) => {
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

    var setupSocial = async () => {
        try {
            GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
            GoogleSignin.configure({
                webClientId: '931519641953-hr2elkkbniagjftgb0hpn5op5use3c8v.apps.googleusercontent.com',
                //iosClientId: Config.IOS_CLIENT_ID,
                offlineAccess: true,
            })
            const user = await GoogleSignin.getCurrentUser()
            console.log('Saved google user', user)
        } catch (err) {
            console.log('Something wrong with google play service!', { err })
        }
      }

    useEffect(() => {
        setupSocial()
    }, [])

    var logInSocial = providerName => new Promise(async (resolve, reject) => {
        switch (providerName) {
            case 'google':
                GoogleSignin.signIn().then(async (googleUser) => {
                    setUserInfo(googleUser.user)
                    await Register(
                        googleUser.user.familyName,
                        googleUser.user.givenName,
                        googleUser.user.email,
                        googleUser.user.email,
                        0
                    )
                })
                .catch((err) => {
                    console.log('WRONG SIGNIN', { err })
                    reject(err)
                })
                break
        
            default:
                resolve()
        }
    })

    var doLogin = (provider) => {
        let methodlogy;
        switch (provider) {
            case 'google':
                methodlogy = logInSocial('google')
                break
            default:
                methodlogy = null
        }
    }

    return (
        <TouchableOpacity
          style={styles.btnGoogle}
          onPress={() => doLogin('google')}>
          <Icon name="google" size={25} style={styles.iconGoogle}/>
        </TouchableOpacity>
    );

}

var styles = StyleSheet.create({
    btnGoogle: {
        // flex: 1,
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        margin: 5,
        paddingBottom: 8,
    },
    iconGoogle: {
      color: 'white',
    }
})

export default SignInWithGoogle