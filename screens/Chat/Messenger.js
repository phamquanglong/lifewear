import React, {useEffect, useState, useContext} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    Keyboard,
} from 'react-native'
import UIHeader from '../../components/UIHeader';
import {images, icons, colors} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  firebaseDatabaseSet,
  firebaseDatabaseRef,
  firebaseDatabase,
  onValue,
  update,
} from '../Firebase/Firebase';

var Messenger = (props) => {

    const [message, setMessage] = useState([])
    var [typedText, setTypedText] = useState('')

    var {navigation, route} = props
    var {navigate, goBack} = navigation

    var {
      name,
      url,
      accessToken,
      numberUnreadMessage,
      userId,
    } = props.route.params.user


    useEffect(() => {
      onValue(firebaseDatabaseRef(firebaseDatabase, 'chats'), async snapshot => {
        if (snapshot.exists()) {
          let snapshotObject = snapshot.val()
          
          let stringUser = await AsyncStorage.getItem("user")
          let myUserId = JSON.parse(stringUser).userId !== undefined ? JSON.parse(stringUser).userId : JSON.parse(stringUser).uid
          var updateMessage = Object.keys(snapshotObject).filter(item => item.includes(myUserId))
          .filter(item => item.includes(props.route.params.user.userId))
          .map(eachKey => {
            let object = snapshotObject[eachKey]
            return Object.values(object).map(eachObject => {
                return {
                ...eachObject,
                isSender: eachKey.split('-')[0] == myUserId,
              }}
            )
          }).sort((item1, item2) => item1.timestamp - item2.timestamp)

          var arr = []

          updateMessage.map(item => {
            item.map(eachItem => {
              arr.push(eachItem)
            })
          })

          for (let j = 0; j < arr.sort((item1, item2) => item1.timestamp - item2.timestamp).length; j++) {
            arr[j].showUrl = arr[j] == arr[0]
            || arr[j-1].isSender == false &&
               arr[j].isSender == true
            || arr[j-1].isSender == true &&
               arr[j].isSender == false
            ? true : false
          }

          setMessage(arr.sort((item1, item2) => item1.timestamp - item2.timestamp))
        } else {
          console.log("No data available")
        }
      })

    }, [])


    return (
      <View style={{flex: 1}}>
        <UIHeader
          title={name}
          leftIcon="arrow-left"
          rightIcon="ellipsis-v"
          onPressLeftIcon={() => {
            goBack();
          }}
        />
        <FlatList
          style={{
            flex: 1,
          }}
          data={message}
          keyExtractor={item => item.timestamp}
          renderItem={({item}) =>
            item.isSender != true ? (
              <TouchableOpacity
                onPress={() => {
                  var cloneMessageList = message.map(message => {
                    if (item.timestamp == message.timestamp) {
                      return {
                        ...message,
                        isShowTimestamp:
                          message.isShowTimestamp == false ||
                          message.isShowTimestamp == undefined
                            ? true
                            : false,
                      };
                    }
                    return message;
                  });
                  setMessage(cloneMessageList);
                }}
                style={{flex: 1}}>
                <View style={styles.viewSender}>
                  {item.showUrl == true ? (
                    <Image
                      source={{
                        uri: item.url,
                      }}
                      style={styles.image}
                    />
                  ) : (
                    <View style={styles.viewAsUrl}></View>
                  )}
                  <Text style={styles.messagesSender}>{item.messages}</Text>
                </View>
                {item.isShowTimestamp == true && (
                  <Text style={styles.timestamp}>
                    {new Date(item.timestamp).toLocaleTimeString('en-US')}
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  var cloneMessageList = message.map(message => {
                    if (item.timestamp == message.timestamp) {
                      return {
                        ...message,
                        isShowTimestamp:
                          message.isShowTimestamp == false ||
                          message.isShowTimestamp == undefined
                            ? true
                            : false,
                      };
                    }
                    return message;
                  });
                  setMessage(cloneMessageList);
                }}
                style={{flex: 1}}>
                <View style={styles.viewReceiver}>
                  <Text style={styles.messagesReceiver}>{item.messages}</Text>
                  {item.showUrl == true ? (
                    <Image
                      source={{
                        uri: item.url,
                      }}
                      style={styles.image}
                    />
                  ) : (
                    <View style={styles.viewAsUrl}></View>
                  )}
                </View>
                {item.isShowTimestamp == true && (
                    <Text style={styles.timestamp}>
                      {new Date(item.timestamp).toLocaleTimeString('en-US')}
                    </Text>
                  )}
              </TouchableOpacity>
            )
          }
        />
        <View style={styles.viewTextInput}>
          <TextInput
            value={typedText}
            placeholder="Enter your message here..."
            style={styles.textInput}
            onChangeText={text => {
              setTypedText(text);
            }}
          />
          <TouchableOpacity
            style={styles.send}
            onPress={async () => {
              if (typedText.trim().length == 0) return;
              let newMessengerObject = {
                url: 'https://randomuser.me/api/portraits/thumb/men/32.jpg',
                showUrl: false,
                messages: typedText,
                timestamp: new Date().getTime(),
                isSender: null,
                isShowTimestamp: null,
              }
              let stringUser = await AsyncStorage.getItem('user')
              let myUserId = JSON.parse(stringUser).userId !== undefined ? JSON.parse(stringUser).userId : JSON.parse(stringUser).uid
              let myfriendUserId = props.route.params.user.userId
              Keyboard.dismiss()
              firebaseDatabaseSet(
                firebaseDatabaseRef(
                  firebaseDatabase,
                  `chats/${myUserId}-${myfriendUserId}/${newMessengerObject.timestamp}`,
                ),
                // newMessengerObject
                {
                  url: 'https://randomuser.me/api/portraits/thumb/men/32.jpg',
                  showUrl: false,
                  messages: typedText,
                  timestamp: new Date().getTime(),
                  isSender: null,
                  isShowTimestamp: null,
                }
              )
              setTypedText('');
              let newFirstMessage = {
                firstMessage: typedText,
                receiverId: myfriendUserId,
                timestamp: new Date().getTime(),
              }
              firebaseDatabaseSet(
                firebaseDatabaseRef(
                  firebaseDatabase,
                  `firstMessage/${myUserId}/${myfriendUserId}/`,
                ),
                // newFirstMessage
                {
                  firstMessage: typedText,
                  receiverId: myfriendUserId,
                  timestamp: new Date().getTime(),
                }
              )
              firebaseDatabaseSet(
                firebaseDatabaseRef(
                  firebaseDatabase,
                  `firstMessage/${myfriendUserId}/${myUserId}/`,
                ),
                // newFirstMessage
                {
                  firstMessage: typedText,
                  receiverId: myfriendUserId,
                  timestamp: new Date().getTime(),
                }
              )
            }}>
            <Icon name="send" color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
}

var styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginHorizontal: 10,
    },
    viewAsUrl: {
        width: 60,
    },
    viewSender: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 3,
        alignItems: 'center',
    },
    viewReceiver: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
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
    messagesSender: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        color: 'black',
        maxWidth: '70%',
    },
    messagesReceiver: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        color: 'white',
        maxWidth: '70%',
    },
    viewTextInput: {
        height: 70,
        backgroundColor: 'rgba(0, 0, 0, 0.01)',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textInput: {
        margin: 7,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 5,
        flex: 1,
        fontSize: 17,
    },
    send: {
        backgroundColor: colors.primary,
        flex: 0.2,
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginEnd: 7,
    },
    timestamp: {
      fontSize: 12,
      textAlign: 'center',
    }
})

export default Messenger