import React, {useCallback} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
} from 'react-native'
import {UIHeader} from '../../components/index'
import {images, icons, colors} from '../../constants';

var ContactItem = (props) => {
    return <View style={styles.view_row}>
            <Text style={styles.a}>{props.a}</Text>
            <TouchableOpacity
            onPress={props.onPress}>
                <Text style={styles.text_primary}>{props.b}</Text>
            </TouchableOpacity>
        </View>
}

var ContactUs = (props) => {
    return <View style={{flex: 1}}>
        <UIHeader
        title="Contact Us"
        leftIcon='arrow-left'
        onPressLeftIcon={() => {
            props.navigation.goBack()
        }}/>
        <View style={styles.view}>
            <Text style={styles.title}>
                If you have any questions about these Terms and Conditions, You can contact us:{'\n'}
            </Text>

            <ContactItem a='By email:' b='lifewear@gmail.com'/>
            <ContactItem
                onPress={() => Linking.openURL('https://lifewear.mn07.xyz')}
                a='By visiting this page on our website:'
                b='https://lifewear.mn07.xyz'/>
            <ContactItem a='By phone number:' b='0942559573' onPress={() => Linking.openURL('tel:0942559573')}/>
        </View>
    </View>
}

var styles = StyleSheet.create({
    view: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 8,
    },
    text_primary: {
        color: colors.primary,
        fontWeight: 'bold',
        lineHeight: 25,
    },
    view_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        textAlign: 'justify',
        lineHeight: 25,
    },
    a: {
        maxWidth: '40%',
        lineHeight: 25,
    },
})

export default ContactUs