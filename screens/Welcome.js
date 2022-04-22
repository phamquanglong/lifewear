import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {images, icons, colors} from '../constants';
import {UIButton} from '../components/index';

var Welcome = props => {
  var [accountTypes, setAccountTypes] = useState([
    {
      name: 'Influencer',
      isSelected: true,
    },
    {
      name: 'Bussiness',
      isSelected: false,
    },
    {
      name: 'Indivisual',
      isSelected: false,
    },
  ]);

  //navigation
  var {navigation, route} = props;
  var {navigate, goBack} = navigation;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightblue',
      }}>
      <ImageBackground
        source={images.background}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 0.1,
          }}>
          <Image
            source={icons.icon_fire}
            style={{width: 40, height: 40, marginHorizontal: 10}}
          />
          <Text
            style={{
              color: colors.primary,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            FIREAPP
          </Text>
          <View style={{flex: 1}} />
          <Image
            source={icons.icon_question}
            style={{
              width: 20,
              height: 20,
              tintColor: colors.primary,
              marginEnd: 15,
            }}
          />
        </View>
        <View style={{flex: 0.05}}></View>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 13, color: 'white'}}>Welcome to</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            FIREAPP
          </Text>
          <Text style={{fontSize: 13, color: 'white'}}>
            Please select your account type
          </Text>
        </View>
        <View style={{flex: 0.45}}>
          {accountTypes.map(accountType => (
            <UIButton key={accountType.name}
              onPress={() => {
                var newAccountTypes = accountTypes.map(eachAccountType => {
                  return {
                    ...eachAccountType,
                    isSelected: eachAccountType.name == accountType.name,
                  };
                });
                setAccountTypes(newAccountTypes);
              }}
              title={accountType.name}
              isSelected={accountType.isSelected}></UIButton>
          ))}
        </View>
        <View style={{flex: 0.3}}>
          <TouchableOpacity onPress={() => {
            navigate('SignIn')
          }}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 10,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
            }}>
            <Text style={{fontSize: 15, color: 'white'}}>SIGN IN</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 13, color: 'white', alignSelf: 'center'}}>
            Do you want to create a new account?
          </Text>
          <TouchableOpacity
          onPress={() => {
            navigate('Register')
          }}>
            <Text
              style={{
                fontSize: 13,
                color: colors.primary,
                alignSelf: 'center',
                textDecorationLine: 'underline',
                padding: 10,
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;
