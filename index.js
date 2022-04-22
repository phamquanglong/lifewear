/**
 * @format
 * https://randomuser.me/api/
 */

import React from 'react';
import {Text} from 'react-native';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import WelcomeScreen from './screens/WelcomeScreen';
import App from './navigation/App';
import { ProductScreen } from './screens';

var fakedProducts = [
    {
        name: 'iphone 3',
        year: 2014
    },
    {
        name: 'iphone 5',
        year: 2015
    },
    {
        name: 'iphone 8',
        year: 2017
    }
]

// AppRegistry.registerComponent(appName, () => () => 
// <WelcomeScreen x={0} y={1} 
// person={{
//     name: 'Pham Quang Long',
//     age: 21,
//     sex: 'male',
// }}
// products = {fakedProducts}
// />);

AppRegistry.registerComponent(appName, () => App);