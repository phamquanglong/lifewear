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
  FlatList,
  TouchableHighlight,
  Switch,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import {images, icons, colors} from '../constants';
import {UIButton, UIHeader} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword, isValidConfirmPassword} from '../utilities/validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  auth,
  firebaseDatabase,
} from './Firebase/Firebase'
import {StackActions} from '@react-navigation/native'


var Settings = (props) => {
  var [isEnabledLockApp, setIsEnabledLockApp] = useState(true)
  var [isEnabledChangePassword, setIsEnabledChangePassword] = useState(true)
  var [isEnabledFingerprint, setIsEnabledFingerprint] = useState(false)
  var [modalVisible, setModalVisible] = useState(false)

  var {navigation, route} = props

    return (
      <View style={{flex: 1}}>
        <Modal
        animationType='slide'
        visible={modalVisible}
        transparent={true}
        >
          <View style={styles.modal}></View>
          <View style={styles.alertSignOut}>
            <Text style={styles.alert}>Are you sure you want to sign out?</Text>
            <View style={styles.viewButtonSignOut}>
            <TouchableOpacity
            style={styles.button_Yes}
            onPress={() => navigation.dispatch(StackActions.replace('SignIn'))}
            >
              <Text style={styles.textButton}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button_No}
            onPress={() => {setModalVisible(false)}}
            >
              <Text style={styles.textButton}>No</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <UIHeader title={'Settings'} />
        <ScrollView>
          <View
            style={{
              height: 40,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text
              style={{
                color: colors.primary,
              }}>
              Common
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="globe"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Language
            </Text>
            <View style={{flex: 1}}></View>
            <Text
              style={{
                marginHorizontal: 10,
                opacity: 0.5,
              }}>
              English
            </Text>
            <Icon
              style={{
                paddingEnd: 10,
                opacity: 0.5,
              }}
              name="chevron-right"
              size={20}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="cloud"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Environment
            </Text>
            <View style={{flex: 1}}></View>
            <Text
              style={{
                marginHorizontal: 10,
                opacity: 0.5,
              }}>
              Production
            </Text>
            <Icon
              style={{
                paddingEnd: 10,
                opacity: 0.5,
              }}
              name="chevron-right"
              size={20}
            />
          </View>

          <View
            style={{
              height: 40,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text
              style={{
                color: colors.primary,
              }}>
              Account
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="phone"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Phone number
            </Text>
            <View style={{flex: 1}}></View>
            <Icon
              style={{
                paddingEnd: 10,
                opacity: 0.5,
              }}
              name="chevron-right"
              size={20}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="envelope"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Email
            </Text>
            <View style={{flex: 1}}></View>
            <Icon
              style={{
                paddingEnd: 10,
                opacity: 0.5,
              }}
              name="chevron-right"
              size={20}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true)
            }}
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="code"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Sign out
            </Text>
            <View style={{flex: 1}}></View>
            <Icon
              style={{
                paddingEnd: 10,
                opacity: 0.5,
              }}
              name="chevron-right"
              size={20}
            />
          </TouchableOpacity>

          <View
            style={{
              height: 40,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text
              style={{
                color: colors.primary,
              }}>
              Security
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="lock"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Lock app in background
            </Text>
            <View style={{flex: 1}}></View>
            <Switch style={{marginEnd: 10,}}
              trackColor={{false: '#767577', true: colors.primary}}
              thumbColor={isEnabledLockApp ? colors.primary : colors.disable}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setIsEnabledLockApp(!isEnabledLockApp);
              }}
              value={isEnabledLockApp}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="shield"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Use fingerprint
            </Text>
            <View style={{flex: 1}}></View>
            <Switch style={{marginEnd: 10,}}
              trackColor={{false: '#767577', true: colors.primary}}
              thumbColor={
                isEnabledFingerprint ? colors.primary : colors.disable
              }
              // ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setIsEnabledFingerprint(!isEnabledFingerprint);
              }}
              value={isEnabledFingerprint}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="key"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Change password
            </Text>
            <View style={{flex: 1}}></View>
            <Switch style={{marginEnd: 10,}}
              trackColor={{false: '#767577', true: colors.primary}}
              thumbColor={
                isEnabledChangePassword ? colors.primary : colors.disable
              }
              // ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setIsEnabledChangePassword(!isEnabledChangePassword);
              }}
              value={isEnabledChangePassword}
            />
          </View>

          <View
            style={{
              height: 40,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text
              style={{
                color: colors.primary,
              }}>
              Misc
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="copyright"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Term of service
            </Text>
            <View style={{flex: 1}}></View>
            <Icon
              style={{
                paddingEnd: 10,
                opacity: 0.5,
              }}
              name="chevron-right"
              size={20}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}>
            <Icon
              style={{
                paddingLeft: 10,
              }}
              name="phone"
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
              }}>
              Open source licenses
            </Text>
            <View style={{flex: 1}}></View>
            <Icon
              style={{
                paddingEnd: 10,
                opacity: 0.5,
              }}
              name="chevron-right"
              size={20}
            />
          </View>
          <View style={{height:100,}}></View>
        </ScrollView>
      </View>
    );
}

var styles = StyleSheet.create({
  modal: {
    flex: 1,
    opacity: 0.3,
    backgroundColor: 'black',
  },
  alertSignOut: {
    width: '80%',
    height: '30%',
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    top: '35%',
    borderRadius: 10,
    elevation: 10,
  },
  viewButtonSignOut: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button_No: {
    width: '40%',
    backgroundColor: colors.disable,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  button_Yes: {
    width: '40%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
  alert: {
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 18,
  }
})

export default Settings;