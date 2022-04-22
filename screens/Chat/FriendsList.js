import React from "react"
import {
    View,
    FlatList,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'

var FriendsList = (props) => {
    return <FlatList style={styles.list}
    data={props.filteredFriendsList()}
    keyExtractor={item => item.name}
    numColumns={1}
    renderItem={({item}) => {
        return props.searchText.length > 0 &&
          <TouchableOpacity
          onPress={() => {
              props.navigation.navigate('Messenger', {user: item})
              props.setSearchText('')
          }}
          style={styles.view}>
            <Image source={{uri: item.url}} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
    }}
/>
}

var styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 10,
    },
    list: {
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    }
})

export default FriendsList