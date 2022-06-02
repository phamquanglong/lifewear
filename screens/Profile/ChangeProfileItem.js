import React, {useState} from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    LogBox,
} from 'react-native'
import {UIHeader, UITextInput} from '../../components'
import {images, icons, colors} from '../../constants';
import {StackActions} from '@react-navigation/native'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

var ChangeProfileItem = (props) => {

    var [error, setError] = useState()

    var {title, value, save, isValid} = props.route.params

    var [typeText, setTypedText] = useState(value)

    var {navigation, route} = props
    var {navigate, goBack, dispatch} = navigation

    var disable = () => {
        if (typeText !== null){
            return typeText.length == 0 || isValid(typeText) == false ? true : false
        }
        else return true
    }

    return (
      <View style={{flex: 1}}>
        <UIHeader
          title={`${title}`}
          leftIcon="arrow-left"
          onPressLeftIcon={() => {
            navigation.goBack()
          }}
        />
        <View style={{height: 60}}>
          <UITextInput
            keyboardType={title == "Phone" ? "number-pad" : "default"}
            value={typeText}
            onChangeText={(text) => {
              setTypedText(text)
              if (isValid !== undefined) {
                isValid(typeText) == false ? setError('Text input is invalid') : setError('')
              }
            }}
          />
        </View>
        {typeText != null
        && isValid(typeText) == false 
        && typeText.length > 0 
        && <Text style={styles.error_text}>{error}</Text>}
        <View style={{flex: 1}}></View>
        <TouchableOpacity
        onPress={() => {
            save(typeText)
            goBack()
        }}
        disabled={disable()}
        style={[
            styles.saveButton,
            {
                backgroundColor: disable()
                ? colors.disable : colors.primary,
            }
        ]}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
}

var styles = StyleSheet.create({
    saveButton: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 10,
    },
    saveText: {
        color: 'white',
        fontSize: 18,
    },
    error_text: {
        alignSelf: 'center',
        padding: 10,
        color: 'white',
        backgroundColor: colors.danger,
    }
})

export default ChangeProfileItem