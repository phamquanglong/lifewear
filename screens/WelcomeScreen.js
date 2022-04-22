import React from 'react';
import {Text,
        TextBox,
        View,
} from 'react-native';
import {sum2Number, substract2Number} from '../utilities/calculation';

// function MainScreen(props) {
//     return <Text>This is mainScreen</Text>
// }
var WelcomeScreen = (props) => {
    var {products} = props;
    var {person} = props;
    var {x, y} = props;
    var {name, age, sex} = person;
    return <View style={{
        backgroundColor: 'lightblue',
    }}>
        <Text style={{color: 'white'}}>x = {x}, y = {y}</Text>
        <Text>Name: {name}, age: {age}, sex: {sex}</Text>
        {products.map(eachProduct => 
        <Text>name: {eachProduct.name}, year: {eachProduct.year}</Text>)}
        <Text>tổng 2 + 3 = {sum2Number(2, 3)}</Text>
        <Text>hiệu 2 - 3 = {substract2Number(2, 3)}</Text>
    </View>
}
export default WelcomeScreen;