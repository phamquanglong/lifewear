import React, {useState, useEffect, useContext} from 'react';
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
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton, UITextInput} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  remove,
} from '../Firebase/Firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FriendsList from './FriendsList';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';


var Chat = (props) => {

    var [friendsList, setFriendsList] = useState([])
    // var firstMes = []
    var [firstMesList, setfirstMesList] = useState([])
    var [isLoading, setIsLoading] = useState(true)
    var [alertRemove, setAlertRemove] = useState(false)
    var [item, setItem] = useState()

    useEffect(() => {

      onValue(firebaseDatabaseRef(firebaseDatabase, 'firstMessage'), async snapshot => {
        if (snapshot.exists()) {
          let snapshotObject = snapshot.val()
          let stringUser = await AsyncStorage.getItem("user")
          let myUserId = JSON.parse(stringUser).userId !== undefined ? JSON.parse(stringUser).userId : JSON.parse(stringUser).uid

          setfirstMesList(Object.keys(snapshotObject).filter(item => item == myUserId)
          .map(eachItem => {
            return snapshotObject[eachItem]
          }))
        }
      })


      onValue(firebaseDatabaseRef(firebaseDatabase, 'users'), async snapshot => {
        if (snapshot.exists()) {
          let snapshotObject = snapshot.val()
          let stringUser = await AsyncStorage.getItem("user")
          let myUserId = JSON.parse(stringUser).userId === undefined 
            ? JSON.parse(stringUser).uid : JSON.parse(stringUser).userId
          console.log(myUserId)
          console.log(JSON.parse(stringUser))
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
              }
            })
          )
          
        } else {
          console.log("No data available")
        }
      })

      setIsLoading(false)
    }, [isLoading])


    var {navigation, route} = props
    var {navigate, goBack} = navigation

    var[modalVisible, setModalVisible] = useState(false)

    var [searchText, setSearchText] = useState('')

    var filteredFriendsList = () => {
      return friendsList.filter(friend => friend.name.toLowerCase()
      .includes(searchText.toLowerCase()))
    }

    var getFirstMes = (item) => {
      if (firstMesList.length > 0 && firstMesList[0][item.userId] != undefined) {
        return firstMesList[0][item.userId].firstMessage == undefined 
        ? 'No message' : firstMesList[0][item.userId].firstMessage
      }
      else return 'No message'
    }

    var getTime = (item) => {
      if (firstMesList.length > 0 && firstMesList[0][item.userId] != undefined) {
        return firstMesList[0][item.userId].timestamp == undefined 
        ? 0 : (new Date().getMinutes() - (new Date(firstMesList[0][item.userId].timestamp).getMinutes()) > 59 
        ? 0 : new Date().getMinutes() - (new Date(firstMesList[0][item.userId].timestamp).getMinutes()))
      }
      else return 0
    }

    var removeMessages = (item) => {
      
      onValue(firebaseDatabaseRef(firebaseDatabase, 'chats'), async snapshot => {
        if (snapshot.exists()) {
          let snapshotObject = snapshot.val()
          let stringUser = await AsyncStorage.getItem("user")
          let myUserId = JSON.parse(stringUser).userId
          
          Object.keys(snapshotObject).filter(item => item.includes(myUserId)).filter(i => i.includes(item.userId))
          .forEach(eachKey => {
            remove(firebaseDatabaseRef(firebaseDatabase, `chats/${eachKey}`))
          })

          remove(firebaseDatabaseRef(firebaseDatabase, `firstMessage/${myUserId}/${item.userId}`))
          remove(firebaseDatabaseRef(firebaseDatabase, `firstMessage/${item.userId}/${myUserId}`))
        }
        // else alert('You have no messages with this account.')
      })

      setAlertRemove(false)
      setIsLoading(true)

      // DevSettings.reload()
    }


    return isLoading ? (
      <ActivityIndicator animating={true} />
    ) : (
      <View
        style={{
          flex: 1,
        }}>
          <Modal
          transparent={true}
          animationType='slide'
          visible={alertRemove}
          >
            <View style={styles.container}>
            <View style={styles.alertRemove}>
              <Text>Once you delete your copy of this conversation, it cannot be undone.</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                <TouchableOpacity
                onPress={() => {
                  setAlertRemove(false),
                  setIsLoading(true)
                }}><Text style={styles.cancelButton}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity
                onPress={() => {removeMessages(item)}}><Text style={styles.removeChat}>Remove Chat</Text></TouchableOpacity>
              </View>
            </View>
            </View>
          </Modal>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
              <UITextInput
                placeholder="Search..."
                autoFocus={true}
                onChangeText={text => {
                  setSearchText(text);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setSearchText('');
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
        {/* <View
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
        </View> */}
        <SwipeListView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                setIsLoading(true);
              }}
            />
          }
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
                navigate('Messenger', {user: item});
              }}>
              <View style={styles.view}>
                <Image
                  source={{
                    uri: item.url,
                  }}
                  style={styles.image}
                />
                {getTime(item) > 0 && (
                  <Text style={styles.absolute}>{getTime(item)} m</Text>
                )}
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text>{getFirstMes(item)}</Text>
                </View>
              </View>
              {/* <Text>4 minutes ago</Text> */}
            </TouchableOpacity>
          )}
          renderHiddenItem={({item, index}) => (
            <TouchableOpacity
            onPress={() => {
              setAlertRemove(true),
              setItem(item)
            }}
            style={[
              styles.deleteButton,
              {
                marginTop: index == 0 ? 10 : 5,
                marginBottom: 5,
              }
            ]}>
              <Icon
                name="trash"
                style={{
                  padding: 5,
                  fontSize: 30,
                }}
              />
              <Text>Delete</Text>
            </TouchableOpacity>
          )}
          // leftOpenValue={75}
          rightOpenValue={-75}
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
    left: 35,
    top: 50,
    padding: 6,
    paddingVertical: 1,
    borderRadius: 20,
    color: 'white',
    borderWidth: 3,
    borderColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
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
  },
  deleteButton: {
    alignSelf: 'flex-end',
    width: 65,
    marginEnd: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
  },
  alertRemove: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius:5,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    padding: 10,
    color: colors.primary,
  },
  removeChat: {
    backgroundColor: colors.primary,
    padding: 10,
    color: 'white',
    borderRadius:5,
  }
});

export default Chat;