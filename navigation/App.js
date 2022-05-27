import React, {createContext, useState, useEffect} from 'react';
import {View, LogBox, AppState} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../constants';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Register,
  SignIn,
  Splash,
  ProductScreen,
  CartScreen,
  ForgetPassword,
  VerifyResetCode,
  ResetPassword,
  Messenger,
  TermOfUse,
  ContactUs,
  ChangeProfileItem,
  CategoryScreen,
  Payment,
  AddAddress,
  AddressSelector,
  PaymentSuccess
} from '../screens/';
import UITab from './UITab';
import Toast from 'react-native-toast-message';
import rootReducer from '../Store/Reducer';
import {createStore} from 'redux';

import {Provider} from 'react-redux';

const store = createStore(rootReducer);

LogBox.ignoreLogs([
  'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
]);

var Stack = createNativeStackNavigator();
export var fingerprintContext = createContext();

var App = props => {
  return (
    <Provider store={store}>
      <>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'Splash'}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccess}/>
            <Stack.Screen name="AddressSelector" component={AddressSelector} />
            <Stack.Screen name="AddAddress" component={AddAddress} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen
              name="ChangeProfileItem"
              component={ChangeProfileItem}
            />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="TermOfUse" component={TermOfUse} />
            <Stack.Screen name="Messenger" component={Messenger} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="VerifyResetCode" component={VerifyResetCode} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="UITab" component={UITab} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </>
    </Provider>
  );
};

export default App;
