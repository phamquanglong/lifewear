import React, { useState } from "react"
import { 
    View,
    Text,
    StyleSheet
} from "react-native"
import { UIHeader } from "../../../components"

var OrderScreen = (props) => {
    var { title } = props.route.params

    var { navigation, route } = props
    var { navigate, goBack } = navigation

    return <View style={styles.container}>
        <UIHeader title={title} leftIcon="arrow-left" onPressLeftIcon={() => goBack()}/>
    </View>
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default OrderScreen