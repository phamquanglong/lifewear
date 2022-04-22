import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
import {images, icons, colors} from '../../constants';
import {UIButton} from '../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isValidEmail, isValidPassword, isValidConfirmPassword} from '../utilities/validations'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FoodItem from '../FoodList/FoodItem';
import FiveStars from './FiveStars';
import GridItem from './GridItem';
import {SliderBox} from 'react-native-image-slider-box';
import ProductItem from './ProductItem';
import SimilarProducts from '../ProductScreen/SimilarProducts'
import ProductsGrid from './ProductsGrid'
import { useScrollToTop } from '@react-navigation/native';


var ProductsGridView = (props) => {
    var [products, setProducts] = useState([])

    var [refreshing, setRefreshing] = useState(true);

    var GetProducts = () => {
      return fetch('https://lifewear.mn07.xyz/api/products?limit=6&start=10', {
        headers: {
          Accept: 'application/json',
        }
      }).then(response => response.json())
      .then(json => {
        setProducts(json)
        setRefreshing(false)
      })
    }

    var onRefresh = () => {
      setProducts([])
      GetProducts()
    }

    var [searchText, setSearchText] = useState('');

    var filteredProducts = () => {
      return products.filter(product => product.name.toLowerCase()
            .includes(searchText.toLowerCase()))
    }

    useEffect(() => {
      GetProducts()
    }, [])

    var {navigation, route} = props
    var {navigate, goBack} = navigation

    var scrollRef = useRef(null)
    useScrollToTop(scrollRef)
    console.log(products)

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
          <View style={{}}>
            <TouchableOpacity
              style={{padding: 15, paddingStart: 0}}
              onPress={() => {
                navigate('CartScreen');
              }}>
              <Icon size={25} name="shopping-cart" color={colors.primary} />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: colors.success,
                height: 18,
                width: 18,
                position: 'absolute',
                right: 20,
                top: 25,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.8,
              }}>
              <Text style={{color: 'white'}}>3</Text>
            </View>
          </View>
        </View>
        {refreshing ? (
          <ActivityIndicator />
        ) : filteredProducts().length > 0 ? (
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ref={scrollRef}
          style={{flex: 1}}>
            {searchText.length == 0 && <SliderBox
              images={[
                'https://i.pinimg.com/736x/b7/60/65/b76065c978317292b1ecde58fc2b6939.jpg',
                'https://static.vecteezy.com/system/resources/thumbnails/000/662/999/small/Fashion_Sale_Banner_1.jpg',
                'https://i.pinimg.com/736x/cf/54/d6/cf54d6f51015c056ae9a4ec29a7853a5.jpg',
              ]}
              inactiveDotColor={colors.disable}
              ImageComponentStyle={{
                borderRadius: 15,
                width: '95%',
                // flex: 0.5,
              }}
              onCurrentImagePressed={() => {
                  navigate('ProductsList')
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
            />}
            <ProductsGrid
              refreshing={refreshing}
              onRefresh={onRefresh}
              filteredProducts={filteredProducts}
              products={products}
              setProducts={setProducts}
              navigation={navigation}/>
          </ScrollView>
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