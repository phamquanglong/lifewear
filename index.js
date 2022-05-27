import React from 'react';
import {Text} from 'react-native';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './navigation/App';
import { ProductScreen } from './screens';


AppRegistry.registerComponent(appName, () => App)