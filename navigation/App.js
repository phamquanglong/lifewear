import React from "react";
import {View} from "react-native"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {colors} from '../constants'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
    Register, 
    Welcome, 
    SignIn, 
    Splash, 
    ProductScreen, 
    CartScreen, 
    ForgetPassword,
    VerifyResetCode,
    ResetPassword,
    Messenger,
} from '../screens/'
import UITab from './UITab'
import Toast from 'react-native-toast-message';

var Stack = createNativeStackNavigator()

var App = (props) => {
    return <>
    <NavigationContainer>
        <Stack.Navigator initialRouteName={"Splash"} screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Messenger" component={Messenger}/>
            <Stack.Screen name="ResetPassword" component={ResetPassword}/>
            <Stack.Screen name="VerifyResetCode" component={VerifyResetCode}/>
            <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
            <Stack.Screen name="CartScreen" component={CartScreen}/>
            <Stack.Screen name="ProductScreen" component={ProductScreen}/>
            <Stack.Screen name="Splash" component={Splash}/>
            <Stack.Screen name="Welcome" component={Welcome}/>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="UITab" component={UITab}/>
        </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
}

export default App