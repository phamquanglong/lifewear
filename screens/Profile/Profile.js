import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  LogBox,
  ScrollView,
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton, UIHeader, UICartButton} from '../../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
  isValidPhone,
} from '../../utilities/validations';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import Addresses from './Addresses';
import Orders from './Orders/Orders'

LogBox.ignoreLogs(["Cannot read properties of undefined (reading '0')"]);

var ModalButton = props => {
  var {onPress, text} = props;

  return (
    <TouchableOpacity
      style={text != 'Cancel' ? styles.modalButton : styles.modalButton_cancel}
      onPress={onPress}>
      <Text
        style={
          text != 'Cancel'
            ? styles.modalButton_text
            : styles.modalButton_text_cancel
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

var ProfileItem = props => {
  var {
    name,
    value,
    navigation,
    setShowModal,
    showModal,
    isValid,
    save,
    openDatePicker,
    setOpen,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        setShowModal === undefined
          ? openDatePicker === true
            ? setOpen(true)
            : navigation.navigate('ChangeProfileItem', {
                title: name,
                value: value,
                isValid: isValid,
                save: save,
              })
          : setShowModal(!showModal);
      }}
      style={styles.account_item}>
      <Text style={{fontWeight: 'bold'}}>{name}</Text>
      <Text style={styles.account_item_value}>{value}</Text>
    </TouchableOpacity>
  );
};

var Profile = props => {
  var [user, setUser] = useState({});
  var [isLoading, setIsLoading] = useState(true);
  var [showModal, setShowModal] = useState(false);
  var [isSelected, setIsSelected] = useState();
  var [modalVisible, setModalVisible] = useState(false);
  var [update, setUpdate] = useState(update);

  var [avatar, setAvatar] = useState();
  var [email, setEmail] = useState();
  var [phone, setPhone] = useState();
  var [dob, setDob] = useState();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  var getItemChanged = () => {
    var bodyObj = {};
    if (user.email !== email) bodyObj.email = email;
    if (user.avatar !== avatar) bodyObj.avatar = avatar;
    if (user.gender !== isSelected) bodyObj.gender = isSelected;
    if (user.dob !== dob) bodyObj.dob = dob;
    if (user.phone !== phone) bodyObj.phone = phone;

    return bodyObj;
  };

  var Update = () => {
    // uploadAvatar(props.route.params.token, avatar)
    fetch('https://lifewear.mn07.xyz/api/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + props.route.params.token,
      },
      body: `${JSON.stringify(getItemChanged())}`,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUpdate(false);
      })
      .catch(err => console.log(err));
  };

  var getUser = token => {
    return fetch('https://lifewear.mn07.xyz/api/user', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => Promise.resolve(data))
      .then(data => {
        setUser(data);
        setEmail(data.email);
        setPhone(data.phone);
        setAvatar(data.avatar);
        setDob(data.dob);
        setIsSelected(data.gender);
        setUpdate(false);
      })
      .then(() => setIsLoading(false))
      .catch(err => Promise.reject(err));
  };

  useEffect(() => {
    getUser(props.route.params.token);
  }, []);

  useLayoutEffect(() => {
    setUpdate(true);
  }, [avatar, email, isSelected, phone, dob]);

  var {navigation, route} = props;
  var {navigate, goBack} = navigation;

  var uploadAvatar = (avatar, token) => {
    console.log({avatar, token});
    const form = new FormData();
    form.append("image",
    {
      uri: avatar,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    const options = {
      method: 'POST',
      url: 'https://lifewear.mn07.xyz/api/user/avatar',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      },
      data: form
    };

    axios
      .request(options)
      .then(response => console.log(response))
      // .then(data => {
      //   setAvatar(data.filename);
      //   console.log(data);
      // })
      .catch(err => console.log(err.response));
  };

  return isLoading ? (
    <ActivityIndicator animating={true} color={colors.primary} />
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.modal_view}></TouchableOpacity>
        <View style={styles.modal}>
          <ModalButton
            text="Choose photo in your library"
            onPress={() => {
              launchImageLibrary(
                {
                  mediaType: 'photo',
                },
                response => {
                  if (response.didCancel != true) {
                    setAvatar(response.assets[0].uri);
                    uploadAvatar(
                      response.assets[0].uri,
                      props.route.params.token
                    );
                    setModalVisible(false);
                  }
                },
              );
            }}
          />
          <ModalButton
            text="Take a photo"
            onPress={() => {
              launchCamera(
                {
                  cameraType: 'back',
                  saveToPhotos: true,
                },
                response => {
                  if (response.didCancel != true) {
                    setAvatar(response.assets[0].uri);
                    uploadAvatar(
                      props.route.params.token,
                      response.assets[0].uri,
                    );
                    setModalVisible(false);
                  }
                },
              );
            }}
          />
          <ModalButton
            text="Cancel"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
      <View
        style={{
          flex: 0.35,
          backgroundColor: colors.primary,
        }}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <UICartButton
            color="white"
            navigation={navigation}
            style={styles.cartButton}
            token={props.route.params.token}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginStart: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Image
              source={{uri: avatar}}
              style={{
                borderRadius: 50,
                width: 70,
                height: 70,
                margin: 10,
                marginStart: 0,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              marginStart: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              {user.full_name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  padding: 5,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  color: colors.primary,
                  borderRadius: 20,
                  fontSize: 13,
                  marginTop: 5,
                }}>
                member
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={styles.account}>
        <Orders />
        <View style={styles.title}>
          <Text style={styles.titleText}>Account</Text>
        </View>
        <ProfileItem
          name="Email"
          value={email}
          navigation={navigation}
          save={setEmail}
          isValid={isValidEmail}
        />
        <ProfileItem
          name="Gender"
          value={isSelected == 0 ? 'Male' : 'Female'}
          setShowModal={setShowModal}
          showModal={showModal}
        />
        {showModal && (
          <View style={{}}>
            <TouchableOpacity
              style={styles.radioButton_item}
              onPress={() => {
                setIsSelected(0);
                setShowModal(false);
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="arrow-right" style={{marginEnd: 5}} />
                <Text>Male</Text>
              </View>
              {isSelected == 0 && (
                <Icon name="check" style={styles.icon_check} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton_item}
              onPress={() => {
                setIsSelected(1);
                setShowModal(false);
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="arrow-right" style={{marginEnd: 5}} />
                <Text>Female</Text>
              </View>
              {isSelected == 1 && (
                <Icon name="check" style={styles.icon_check} />
              )}
            </TouchableOpacity>
          </View>
        )}
        <ProfileItem
          name="Phone"
          value={phone}
          navigation={navigation}
          isValid={isValidPhone}
          save={setPhone}
        />
        <ProfileItem
          name="Date of birth"
          value={dob}
          navigation={navigation}
          isValid={isValidPhone}
          save={setDob}
          openDatePicker={true}
          setOpen={setOpen}
        />
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDob(date.toLocaleDateString('fr-CA'));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <View style={styles.addresses}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Addresses</Text>
          </View>
          <Addresses
            navigation={navigation}
          />
        </View>
      </ScrollView>

      <View style={{
        flex: 0.13,
        position: 'absolute',
        bottom: 10,
        right: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            Update();
          }}
          disabled={!update}
          style={update ? styles.updateButton : styles.disableButton}>
          <Text
            style={{
              color: 'white',
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

var styles = StyleSheet.create({
  title: {
    padding: 10,
    color: colors.primary,
  },
  titleText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  account_item: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 5,
  },
  cartButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 50,
    margin: 10,
  },
  account: {
    flex: 1,
  },
  radioButton_item: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: 20,
    borderRadius: 5,
  },
  account_item_value: {
    color: colors.primary,
  },
  icon_check: {
    color: colors.primary,
  },
  avatar: {
    backgroundColor: 'white',
    paddingStart: 10,
    borderRadius: 50,
    marginBottom: 10,
    elevation: 10,
  },
  modal_view: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-end',
    opacity: 0.5,
  },
  modal: {
    width: '90%',
    height: '30%',
    alignSelf: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    flex: 1,
    justifyContent: 'space-evenly',
    bottom: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalButton: {
    backgroundColor: colors.disable,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  modalButton_cancel: {
    boderColor: colors.disable,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  modalButton_text: {
    fontSize: 16,
    color: 'white',
  },
  modalButton_text_cancel: {
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  disableButton: {
    backgroundColor: colors.disable,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  addresses: {
    // flex: 1,
  },
});

export default Profile;
