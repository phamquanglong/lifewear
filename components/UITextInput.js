import React from "react"
import {
    View,
    TextInput,
    StyleSheet,
    Keyboard,
} from 'react-native'


var UITextInput = (props) => {
    return <TextInput
    style={styles.textInput}
    placeholder={props.placeholder}
    autoFocus={props.autoFocus}
    onChangeText={props.onChangeText}
    />
}

var styles = StyleSheet.create({
    textInput: {
        margin: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        flex: 1,
        height: 40,
        borderRadius: 5,
    }
})

export default UITextInput