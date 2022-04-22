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
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton} from '../../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  isValidEmail,
  isValidPassword,
  isValidConfirmPassword,
} from '../../utilities/validations';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FoodItem from './FoodItem';

var FoodList = props => {
  var [foods, setFoods] = useState([
    {
      name: 'Phở bò',
      url: 'https://static.tripzilla.com/thumb/c/8/120264_800x.jpg',
      price: 50000,
      status: 'Opening soon',
      website: 'http://abc.com',
      socialNetwork: {
        facebook: 'http://facebook.com',
        twitter: 'http://twitter.com',
      },
    },
    {
      name: 'bánh cuốn chả Nam Định cầu đò quan bánh mỳ',
      url: 'https://cdn.huongnghiepaau.com/wp-content/uploads/2019/08/banh-mi-kep-thit-dam-da.jpg',
      price: 30000,
      status: 'opening now',
      website: 'http://www.abc.com',
      socialNetwork: {
        facebook: 'http://facebook.com',
        twitter: 'http://twitter.com',
        instagram: 'http://instagram.com',
      },
    },
    {
      name: 'bánh cuốn Nam Định',
      url: 'https://cdn.eva.vn/upload/2-2019/images/2019-04-10/cach-lam-banh-cuon-ngon-bang-chao-chong-dinh-nhanh-gon-tai-nha-cach-lam-banh-cuon-6-1554869118-748-width493height322.jpg',
      price: 70000,
      status: 'opening now',
      website: 'http://abc.com',
      socialNetwork: {
        facebook: 'http://facebook.com',
      },
    },
    {
      name: 'bánh cuốn Hà Nội',
      url: 'https://cdn.eva.vn/upload/2-2019/images/2019-04-10/cach-lam-banh-cuon-ngon-bang-chao-chong-dinh-nhanh-gon-tai-nha-cach-lam-banh-cuon-6-1554869118-748-width493height322.jpg',
      price: 70000,
      status: 'opening now',
      website: 'http://abc.com',
      socialNetwork: {
        facebook: 'http://facebook.com',
      },
    },
    {
      name: 'Bánh mỳ chân cầu',
      url: 'https://cdn.huongnghiepaau.com/wp-content/uploads/2019/08/banh-mi-kep-thit-dam-da.jpg',
      price: 30000,
      status: 'closing now',
      website: 'http://www.abc.com',
      socialNetwork: {
        facebook: 'http://facebook.com',
        twitter: 'http://twitter.com',
        instagram: 'http://instagram.com',
      },
    },
  ]);

  var [categories, setCategories] = useState([
    {
      name: 'BBQ',
      url: 'https://cdn-icons-png.flaticon.com/512/3313/3313199.png',
    },
    {
      name: 'Breakfast',
      url: 'https://cdn-icons-png.flaticon.com/512/887/887359.png',
    },
    {
      name: 'Coffee',
      url: 'https://cdn-icons-png.flaticon.com/512/3127/3127450.png',
    },
    {
      name: 'Noodles',
      url: 'https://cdn-icons-png.flaticon.com/512/2836/2836607.png',
    },
    {
      name: 'Hotdog',
      url: 'https://cdn-icons-png.flaticon.com/512/1624/1624711.png',
    },
    {
      name: 'Dinner',
      url: 'https://cdn-icons-png.flaticon.com/512/3778/3778570.png',
    },
    {
      name: 'Wine',
      url: 'https://cdn-icons-png.flaticon.com/512/1425/1425519.png',
    },
    {
      name: 'Juice',
      url: 'https://cdn-icons-png.flaticon.com/512/1425/1425533.png',
    },
    {
      name: 'Hamburger',
      url: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
    },
    {
      name: 'Pizza',
      url: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png',
    },
    {
      name: 'Cake',
      url: 'https://cdn-icons-png.flaticon.com/512/817/817318.png',
    },
  ]);

  var [searchText, setSearchText] = useState('');

  var filteredFoods = () => {
    return foods.filter(food => food.name.toLowerCase()
          .includes(searchText.toLowerCase()))
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          height: 150,
          marginHorizontal: 10,
        }}>
        <View
          style={{
            height: 60,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon
            name="search"
            style={{
              position: 'absolute',
              fontSize: 20,
              left: 10,
            }}></Icon>
          <TextInput
            onChangeText={(text) => {
              setSearchText(text)
            }}
            style={{
              height: 40,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              flex: 1,
              marginRight: 10,
              borderRadius: 5,
              paddingStart: 35,
              fontSize: 16,
            }}></TextInput>
          <Icon size={30} name="bars"></Icon>
        </View>
        <View style={{height: 1, backgroundColor: 'black'}}></View>
        <View style={{flex: 1}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{flex: 1}}
            horizontal={true}
            data={categories}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    alert(`Press ${item.name} item`);
                  }}
                  style={{
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                    }}
                    source={{uri: item.url}}></Image>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 10,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{height: 1, backgroundColor: 'black'}}></View>
      </View>
      {filteredFoods().length > 0 ? <ScrollView>
        {filteredFoods().map(eachFood => (
          <FoodItem food={eachFood} key={eachFood.name} />
        ))}
      </ScrollView> : <View style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}><Text style={{
        fontSize: 20,
      }}>No item found</Text></View>}
      {/* <FlatList
      data = {foods} 
      keyExtractor={eachFood => eachFood.name}
      renderItem={({item}) => {
        return <FoodItem food={item}/>
      }}/> */}
    </View>
  );
};

export default FoodList;
