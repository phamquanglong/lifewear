import React, {createContext, useState} from 'react';
import {
  Settings,
  FoodList,
  Profile,
  ProductsList,
  Chat,
  WishListScreen
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import {colors} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

var Tab = createBottomTabNavigator();
// var Tab = AnimatedTabBarNavigator()

var screenOptions = ({route}) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarIcon: ({focused, color, size}) => {
    var screenName = route.name;
    var iconName = '';
    if (screenName == 'FoodList') iconName = 'home';
    else if (screenName == 'WishListScreen') iconName = 'bullseye';
    else if (screenName == 'Settings') iconName = 'cogs';
    else if (screenName == 'Profile') iconName = 'address-card';
    else if (screenName == 'Chat') iconName = 'comment';
    return (
      <Icon
        name={iconName}
        size={25}
        color={focused == true ? colors.primary : colors.disable}
      />
    );
  },
  tabBarStyle: {
    paddingTop: 5,
    height: '7%',
  },
  tabBarLabelStyle: {
    paddingBottom: 5,
  },
  tabBarHideOnKeyboard: true,
  tabBarInactiveBackgroundColor: 'white',
  tabBarActiveBackgroundColor: 'white',
});

var UITab = props => {

  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="FoodList"
          component={FoodList}
          initialParams={props.route.params}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="WishListScreen"
          component={WishListScreen}
          options={{
            tabBarLabel: 'WishList',
          }}
        />
        
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={props.route.params}></Tab.Screen>
        <Tab.Screen
          name="Chat"
          component={Chat}
          initialParams={props.route.params}
        />

        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
  );
};

export default UITab;
