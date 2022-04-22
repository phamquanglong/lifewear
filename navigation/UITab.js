import React from "react";
import {Settings,
    ProductsGridView,
    FoodList,
    Profile,
    ProductsList,
    Chat,
} from '../screens'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {colors} from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome';

var Tab = createBottomTabNavigator()
var screenOptions = ({route}) => ({
    headerShown: false,
    tabBarActiveTintColor: "white",
    tabBarIcon: ({focused, color, size}) => {
        var screenName = route.name
        var iconName = ''
        if (screenName == 'FoodList')
            iconName = 'align-center'
        else if (screenName == 'ProductsGridView')
            iconName = 'bullseye'
        else if (screenName == 'Settings')
            iconName = 'cogs'
        else if (screenName == 'Profile')
            iconName = 'address-card'
        else if (screenName == 'Chat')
            iconName = 'comment'
        return <Icon name={iconName} size={25}
                color={focused == true ? "white" : colors.disable}/>
    },
    tabBarInactiveBackgroundColor: colors.primary,
    tabBarActiveBackgroundColor: colors.primary,
})

var UITab = (props) => {
    return <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="FoodList" component={FoodList}
            options={{
                tabBarLabel: 'Foods'
            }}/>
        <Tab.Screen name="ProductsGridView" component={ProductsGridView}
            options={{
                tabBarLabel: 'Products'
            }}/>
        <Tab.Screen name="Settings" component={Settings}/>
        <Tab.Screen name="Profile" component={Profile} initialParams={props.route.params}>
        </Tab.Screen>
        <Tab.Screen name="Chat" component={Chat} initialParams={props.route.params}/>
    </Tab.Navigator>
}

export default UITab;