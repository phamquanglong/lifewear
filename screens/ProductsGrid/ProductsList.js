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
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {images, icons, colors} from '../../constants';
import {UIButton} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword, isValidConfirmPassword} from '../utilities/validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FoodItem from '../FoodList/FoodItem';
import FiveStars from './FiveStars';
import GridItem from './GridItem';
import ProductItem from './ProductItem';


var ProductsGridView = (props) => {
    var [isLoading, setLoading] = useState(true);
    var [refreshing, setRefreshing] = useState(true);
    var [data, setData] = useState([])

    var {navigation, route} = props
    var {navigate, goBack} = navigation

    var getData = async () => {
        try {
            const response = await fetch('http://192.168.0.105/phpAppRN/phpAppRNgetHang.php');
            
            var json = await response.json();
            setData(json)
            setRefreshing(false)
        } catch (error) {
            console.error(error);
        } finally {() => {
            setLoading(false);
            }
        }
    }

    useEffect(() => {
      getData();
    }, [])

    var [searchText, setSearchText] = useState('');

    var filteredProducts = () => {
        return data.filter(product => product.TenHang.toLowerCase()
            .includes(searchText.toLowerCase()))
    }

    var onRefresh = () => {
      setData([])
      getData()
    }

    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: 55,
            backgroundColor: 'white',
            flexDirection: 'row',
          }}>
          <Icon
            name="search"
            style={{
              position: 'absolute',
              fontSize: 20,
              left: 15,
              top: 15,
            }}></Icon>
          <TextInput
            onChangeText={text => {
              setSearchText(text);
            }}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              flex: 1,
              margin: 10,
              borderRadius: 5,
              paddingStart: 35,
              fontSize: 16,
              paddingVertical: 0,
            }}></TextInput>
            <TouchableOpacity
              style={{
                padding: 15,
                paddingStart: 0,
              }}
              onPress={() => {
                navigate('CartScreen');
              }}>
              <Icon size={25} name="shopping-cart" color={colors.primary} />
            </TouchableOpacity>
        </View>
        {isLoading && filteredProducts().length > 0 ? (
          <View style={{flex: 1}}>
            {refreshing ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                refreshControl={
                  <RefreshControl refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={{
                  backgroundColor: 'white',
                  // flex: 0.9,
                }}
                keyExtractor={item => item.MaHang}
                data={filteredProducts()}
                numColumns={2}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        flex: 0.5,
                        height: 270,
                        marginLeft: index % 2 == 0 ? 10 : 5,
                        marginRight: index % 2 == 0 ? 5 : 10,
                        marginBottom: 10,
                        // marginTop: index <= 1 ? 10 : 0,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        navigate('ProductScreen', {
                          item: item,
                          productsData: data,
                        });
                      }}>
                      <ProductItem
                        item={item}
                        index={index}
                        onPress={() => {
                          var cloneProducts = data.map(product => {
                            if (item.TenHang == product.TenHang) {
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
                          setData(cloneProducts);
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
              }}>
              No item found
            </Text>
          </View>
        )}
      </View>
    );
}
export default ProductsGridView;