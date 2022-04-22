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
  Animation,
  Animated,
  Dimensions,
} from 'react-native';
import {images, icons, colors} from '../constants';
import {UIButton} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword} from '../utilities/validations'
import {StackActions} from '@react-navigation/native'

var {height, width} = Dimensions.get('window')

var Splash = (props) => {
    var [logoOpacity, setLogoOpacity] = useState(new Animated.Value(0))
    var [tittleMarginTop, setMarginTop] = useState(new Animated.Value(300))

    var {navigation, route} = props
    var {navigate, goBack, dispatch} = navigation

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),

            Animated.timing(tittleMarginTop, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start(() => {
            dispatch(StackActions.replace('SignIn'))
        })
    }, [])

    return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <Animated.Image style={{
            width: 100,
            height: 100,
            opacity: logoOpacity,
        }}
        source={images.fire}/>
        <Animated.Text style={{
            fontSize: 20,
            color: colors.primary,
            fontWeight: 'bold',
            transform: [{ translateY: tittleMarginTop }]
        }}>LIFEWEAR</Animated.Text>
    </View>
}

export default Splash;