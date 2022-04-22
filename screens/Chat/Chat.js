import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton, UITextInput} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword, isValidConfirmPassword} from '../utilities/validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FoodItem from '../FoodList/FoodItem';
import { UIHeader } from '../../components';
import {auth,
  firebaseDatabase,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseDatabaseSet,
  get,
  child,
  onValue,
} from '../Firebase/Firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FriendsList from './FriendsList';

var Chat = (props) => {

    var [friendsList, setFriendsList] = useState([])
    var [firstMessage, setFirstMessage] = useState('')

    useEffect(() => {
      onValue(firebaseDatabaseRef(firebaseDatabase, 'users'), async snapshot => {
        if (snapshot.exists()) {
          let snapshotObject = snapshot.val()
          console.log(Object.values(snapshotObject))
          let stringUser = await AsyncStorage.getItem("user")
          let myUserId = JSON.parse(stringUser).userId
          setFriendsList(
            Object.keys(snapshotObject).filter(item => item != myUserId)
            .map(eachKey => {
              let eachUser = snapshotObject[eachKey]
              return {
                url: 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png',
                name: eachUser.email,
                accessToken: eachUser.accessToken,
                numberUnreadMessage: 0,
                userId: eachKey,
                firstMessage: firstMessage,
              }
            })
          )
        } else {
          console.log("No data available")
        }
      })

    }, [])


    var {navigation, route} = props
    var {navigate, goBack} = navigation

    var[modalVisible, setModalVisible] = useState(false)

    var [searchText, setSearchText] = useState('')

    var filteredFriendsList = () => {
      return friendsList.filter(friend => friend.name.toLowerCase()
      .includes(searchText.toLowerCase()))
    }

    return (
      <View
        style={{
          flex: 1,
        }}>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={{flex: 1}}>
            <View
              style={{flexDirection: 'row', backgroundColor: 'white'}}>
              <UITextInput
                placeholder="Search..."
                autoFocus={true}
                onChangeText={text => {
                  setSearchText(text)
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible)
                  setSearchText('')
                }}
                style={styles.cancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <FriendsList 
            filteredFriendsList={filteredFriendsList}
            searchText={searchText}
            navigation={navigation}
            setSearchText={setSearchText}
            />
          </View>
        </Modal>
        <UIHeader
          title="Chat"
          rightIcon="search"
          onPressRightIcon={() => {
            setModalVisible(!modalVisible);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              marginStart: 10,
            }}>
            6 unread messages
          </Text>
          <Icon
            name="trash"
            style={{
              padding: 10,
              fontSize: 20,
            }}
            onPress={() => alert('trash')}
          />
        </View>
        <FlatList
          style={{
            flex: 1,
          }}
          data={friendsList}
          keyExtractor={item => item.accessToken}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.touchableOpacity,
                {
                  marginTop: index < 1 ? 5 : 0,
                  marginBottom: 7,
                  marginHorizontal: 7,
                },
              ]}
              onPress={() => {
                navigate('Messenger', {user: item,
                  setFirstMessage: setFirstMessage});
              }}>
              <View style={styles.view}>
                <Image
                  source={{
                    uri: item.url,
                  }}
                  style={styles.image}
                />
                {item.numberUnreadMessage > 0 && (
                  <Text style={styles.absolute}>
                    {item.numberUnreadMessage}
                  </Text>
                )}
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text>{item.firstMessage}</Text>
                </View>
              </View>
              <Text>4 minutes ago</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
}

var styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginHorizontal: 10,
    },
    view: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'black',
    },
    absolute: {
        position: 'absolute',
        backgroundColor: colors.danger,
        left: 50,
        top: 50,
        padding: 6,
        paddingVertical: 1,
        borderRadius: 20,
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    touchableOpacity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingEnd: 10,
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 5,
    },
    cancelText: {
      color: colors.primary,
    },
    cancel: {
      height: 40,
      marginVertical: 10,
      marginEnd: 10,
      justifyContent: 'center',
    }
})

export default Chat;