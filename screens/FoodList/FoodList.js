import React, {useState, useEffect, createContext, useContext} from 'react';
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
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton} from '../../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductsByCategory from './ProductsByCategory';
import {SliderBox} from 'react-native-image-slider-box';
import ProductItem from '../ProductsGrid/ProductItem';
import {StackActions, useScrollToTop} from '@react-navigation/native';
import {addWishList, deleteWishlist} from '../WishList/WishListController';
import {setWishList} from '../../Store/actions';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDebounce } from '../../hooks/index';
import { UICartButton } from '../../components'

var FoodList = props => {

  const dispatch = useDispatch();

  const wishListData = data => {
    dispatch(setWishList(data));
  };

  var [refreshing, setRefreshing] = useState(true);

  var [categories, setCategories] = useState([]);
  var [oldCategories, setOldCategories] = useState([]);
  var [searchProductsList, setSearchProductsList] = useState([]);

  var [searchText, setSearchText] = useState('');

  var [isShowModal, setIsShowModal] = useState(false);

  var [isShowCloseButton, setIsShowCloseButton] = useState(isShowCloseButton);
  var [text, setText] = useState(text);

  var debounced = useDebounce(text, 300)

  var {navigation, route} = props;
  var {navigate, goBack} = navigation;

  var filteredFoods = () => {
    return foods.filter(food =>
      food.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  var searchProducts = text => {
    console.log(text)
    fetch(`https://lifewear.mn07.xyz/api/products/search?q=${text}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        setSearchProductsList(json.data);
        console.log(json);
      });
  };

  var getChildrenByCategory = () => {
    if (
      categories.filter(category => category.isShowChildren == true).length > 0
    ) {
      return categories
        .filter(category => category.isShowChildren == true)
        .map(category => category.children)[0];
    }
  };

  var getCategories = () => {
    fetch('https://lifewear.mn07.xyz/api/categories', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        setOldCategories(data);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getCategories();
    searchProducts(debounced);
  }, [debounced]);

  var onRefresh = () => {
    setCategories([]);
    getCategories();
  };

  return refreshing ? (
    <ActivityIndicator animating={true} color={colors.primary} />
  ) : (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 60,
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 10,
        }}>
        <Icon
          name="search"
          style={{
            position: 'absolute',
            fontSize: 20,
            left: 10,
          }}></Icon>
        <TextInput
          value={text}
          onChangeText={value => {
            setSearchText(value);
            
            setText(value);
            if (value.length > 0) {
              setIsShowModal(true);
              setIsShowCloseButton(true);
            } else {
              setIsShowModal(false);
              setIsShowCloseButton(false);
            }
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
        {isShowCloseButton && (
          <TouchableOpacity
            onPress={() => {
              setText('');
              setIsShowCloseButton(false);
              setSearchText('');
              setIsShowModal(false);
            }}
            style={styles.close}>
            <Icon name="close" size={15} color="white" />
          </TouchableOpacity>
        )}
        <UICartButton color={colors.primary}
        navigation={navigation}
        style={styles.cartButton}/>
      </View>
      {isShowModal ? (
        <View style={{flex: 1}}>
          <FlatList
            numColumns={2}
            keyExtractor={key => key.id}
            data={searchProductsList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    flex: 0.5,
                    height: 270,
                    marginLeft: index % 2 == 0 ? 10 : 5,
                    marginRight: index % 2 == 0 ? 5 : 10,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    props.navigation.dispatch(
                      StackActions.push('ProductScreen', {item: item}),
                    );
                  }}>
                  <ProductItem
                    item={item}
                    index={index}
                    onPress={() => {
                      AsyncStorage.getItem('token').then(response => item.isLiked
                        ? deleteWishlist(item.id, response, wishListData) : addWishList(item.id, response, wishListData));
                      var cloneProducts = searchProductsList.map(product => {
                        if (item.id == product.id) {
                          return {
                            ...product,
                            isLiked:
                              product.isLiked == false ||
                              product.isLiked == undefined
                                ? true
                                : false,
                          };
                        }
                        return product;
                      });
                      setSearchProductsList(cloneProducts);
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            flex: 1,
          }}>
          <View
            style={{
              marginBottom: 10,
              marginHorizontal: 10,
            }}>
            <View style={{flex: 1}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}
                horizontal={true}
                data={categories}
                renderItem={({item}) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          var cloneCategories = oldCategories.map(i => {
                            if (item.id == i.id) {
                              return {
                                ...item,
                                isShowChildren:
                                  i.isShowChildren == false ||
                                  i.isShowChildren == undefined
                                    ? true
                                    : false,
                              };
                            }
                            return i;
                          });
                          if (
                            categories.filter(
                              item => item.isShowChildren == true,
                            ).length > 0 &&
                            item.isShowChildren == true
                          ) {
                            setCategories(oldCategories);
                          } else setCategories(cloneCategories);
                        }}
                        style={{
                          padding: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // paddingHorizontal: 35,
                          backgroundColor: item.isShowChildren
                            ? colors.primary
                            : 'rgba(0, 0, 0, 0.05)',
                          minWidth: 123,
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: item.isShowChildren
                              ? 'white'
                              : colors.primary,
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <FlatList
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-evenly',
              }}
              data={getChildrenByCategory()}
              keyExtractor={keyExt => keyExt.id}
              numColumns={2}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('CategoryScreen', {
                        idCategory: item.id
                      });
                    }}
                    style={[
                      styles.children,
                      {marginStart: index % 2 == 1 ? 10 : 0},
                    ]}>
                    <Text style={{color: 'white'}}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <SliderBox
            autoplay={true}
            circleLoop={true}
            images={[
              'https://i.pinimg.com/736x/b7/60/65/b76065c978317292b1ecde58fc2b6939.jpg',
              'https://static.vecteezy.com/system/resources/thumbnails/000/662/999/small/Fashion_Sale_Banner_1.jpg',
              'https://i.pinimg.com/736x/cf/54/d6/cf54d6f51015c056ae9a4ec29a7853a5.jpg',
            ]}
            inactiveDotColor={colors.disable}
            ImageComponentStyle={{
              borderRadius: 10,
              width: '95%',
              // flex: 0.5,
            }}
            onCurrentImagePressed={() => {
              navigate('CategoryScreen', {idCategory: Math.floor(Math.random() * 31) + 1});
            }}
            dotColor={colors.primary}
            sliderBoxHeight={300}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
              position: 'relative',
              bottom: 0,
              padding: 0,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
          />

          <ProductsByCategory
            navigation={navigation}
            refreshing={refreshing}
            categories={categories}
          />
        </ScrollView>
      )}
    </View>
  );
};

var styles = StyleSheet.create({
  children: {
    padding: 10,
    marginTop: 10,
    backgroundColor: colors.primary,
    alignSelf: 'stretch',
    flex: 1,
    borderRadius: 5,
  },
  close: {
    position: 'absolute',
    top: 18,
    right: 50,
    backgroundColor: colors.disable,
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 50,
  },
  cartButton: {
    padding: 5,
    paddingEnd: 7,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 10,
  },
});

export default FoodList;
