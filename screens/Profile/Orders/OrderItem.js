import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../../constants';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


var OrderItem = (props) => {
    var { icon, text, index, count } = props

    return <TouchableOpacity style={[
        styles.btn,
        { marginStart: index%2==0 ? 0 : 5, marginEnd: index%2==0 ? 5 : 0 }
    ]}>
        <FontAwesomeIcon icon={icon} style={styles.icon} size={50}/>
        <Text style={styles.text}>{text}</Text>
        {count > 0 && <Text style={styles.dot}>{count}</Text>}
    </TouchableOpacity>
}

var styles = StyleSheet.create({
    icon: {
        color: colors.primary
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 5,
    },
    text: {
        color: colors.primary
    },
    dot: {
        textAlign: 'center',
        backgroundColor: colors.success,
        position: 'absolute',
        paddingHorizontal: 5,
        borderRadius: 20,
        color: 'white',
        top: 7,
        right: '62%',
        borderWidth: 2,
        borderColor: 'white',
    }
})

export default OrderItem