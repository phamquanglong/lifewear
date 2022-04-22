import React, {useState, useEffect, useRef, createContext} from 'react';
import {View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  VirtualizedList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SliderBox} from 'react-native-image-slider-box';
import {colors} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import FiveStars from '../ProductsGrid/FiveStars';
import Comments from './Comments';
import SimilarProducts from './SimilarProducts';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { StackActions, useScrollToTop } from '@react-navigation/native';
import ProductOptions from './ProductOptions';
// import { ScrollView } from 'react-native-virtualized-view';

export var colorContext = createContext()

var ProductScreen = (props) => {
    var [isLoading, setIsLoading] = useState(true);
    var [details, setDetails] = useState({})

    var getDetails = () => {
      fetch(`https://lifewear.mn07.xyz/api/products/id/${props.route.params.item.id}`,
      {
        headers: {
          Accept: 'application/json',
        }
      }).then(response => response.json())
      .then(json => setDetails(json))
      .then(() => {
        setIsLoading(false)
      })
      .catch(err => console.log(err))
    }
  
  useEffect(() => {
    getDetails()
    return () => {
      setDetails({});
    };
  }, [])

  var [isActive, setIsActive] = useState(true);
  var [isActiveWaranty, setIsActiveWaranty] = useState(false);

  var {navigation, route} = props;
  var {navigate, goBack, push, dispatch} = navigation;

  const scrollRef = useRef();

  var onPress = () => {
    scrollRef.current.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    })
    setAtTop(true)
  }

  var [atTop, setAtTop] = useState(true)

  var [colorsProduct, setColorsProduct] = useState([
    {
      value_index: 0,
      color: colors.success,
    },
    {
      value_index: 1,
      color: colors.facebook,
    },
    {
      value_index: 2,
      color: 'black',
    },
    {
      value_index: 3,
      color: colors.warning,
    },
  ])

  var value = {
    colorsProduct,
    setColorsProduct
  }

  return (
    isLoading == false ? <colorContext.Provider value={details}>
    <View
      style={{
        flex: 1,
      }}>
      <GestureRecognizer
        style={{flex: 1}}
        >
        <ScrollView ref={scrollRef}
          onMomentumScrollBegin={() => setAtTop(false)}
          style={{
            height: 400,
          }}>
          <SliderBox
            images={details.images.map(image => image.image)}
            inactiveDotColor={colors.disable}
            ImageComponentStyle={{
              borderRadius: 15,
              width: '97%',
              flex: 0.5,
              marginTop: 5,
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
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.primary,
                marginLeft: 10,
              }}>
              {details.name}
            </Text>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <Text style={{
                marginStart: 10,
                fontSize: 20,
                color: colors.danger,
              }}>{details.price}</Text>
              <View style={{flex: 1}}></View>
              <View
                style={{
                  marginEnd: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FiveStars numberOfStars={details.rating_avg} />
                <Text> / </Text>
                <Text style={{color: colors.facebook}}>
                  {details.public_reviews_count} reviews
                </Text>
              </View>
            </View>
            <ProductOptions />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsActive(true);
                setIsActiveWaranty(false);
              }}
              style={{
                borderBottomWidth: 2,
                borderBottomColor: isActive ? colors.primary : colors.disable,
                paddingVertical: 10,
                flex: 1,
                alignItems: 'center',
                marginLeft: 10,
                marginEnd: 5,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: isActive ? colors.primary : colors.disable,
                }}>
                Product Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsActiveWaranty(true);
                setIsActive(false);
              }}
              style={{
                borderBottomWidth: 2,
                borderBottomColor: isActiveWaranty
                  ? colors.primary
                  : colors.disable,
                paddingVertical: 10,
                flex: 1,
                alignItems: 'center',
                marginLeft: 5,
                marginEnd: 10,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: isActiveWaranty ? colors.primary : colors.disable,
                }}>
                Warranty Policy
              </Text>
            </TouchableOpacity>
          </View>
          {isActive ? (
            <View
              style={{
                margin: 10,
              }}>
              <Text
                style={{
                  lineHeight: 25,
                }}>
                {details.description}{'\n'}
              </Text>
            </View>
          ) : (
            <View style={{margin: 10}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginBottom: 5,
                  fontSize: 18,
                }}>
                Regular Warranty
              </Text>
              <Text
                style={{
                  marginBottom: 10,
                  lineHeight: 25,
                }}>
                - For storage products, Infortrend warrants to the direct
                customer that Infortrend hardware products will be free from
                defects in material and workmanship for a period of three (3)
                years after delivery, excluding non-Infortrend product and
                software delivered with or as part of the Infortrend product.
                Batteries are covered under warranty for a two-year period. SSD
                (solid state drive) products have a warranty that expires at the
                earlier of (i) the time period specified at purchase, or (ii)
                when the use of the SSD exceeds the maximum TBW (Total Bytes
                Written) or endurance limit. Infortrend warrants the replacement
                or repaired parts, to be free from defects in material or
                workmanship for ninety (90) days or, for the remainder of the
                limited warranty period of the product they are replacing or in
                which they are installed, whichever is longer.
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginBottom: 5,
                  fontSize: 18,
                }}>
                Non-Warranty
              </Text>
              <Text
                style={{
                  marginBottom: 5,
                  lineHeight: 25,
                }}>
                - Infortrend will repair or replace the defective storage and
                EonAI products; provided, however, that any such repair or
                replacement is contingent upon the availability of the required
                components. The customer shall pay the two-way shipping,
                packing, insurance, repair/replacement service fees and other
                costs, including necessary labor and parts.{'\n'}- Customer
                shall ship defective products freight prepaid to Infortrend.
                Infortrend shall ship repaired products freight collect to the
                customer. If the customer has a pending delivery, the repaired
                products shall be shipped together with the customer's order.
                Otherwise, it will be shipped separately.
              </Text>
            </View>
          )}

          <View
            style={{
              marginHorizontal: 10,
              padding: 5,
              paddingBottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Product reviews
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FiveStars numberOfStars={details.rating_avg} />
              <Text style={{marginHorizontal: 5, color: colors.danger}}>
                {route.params.item.Sao}/5
              </Text>
              <Text>({details.public_reviews_count} reviews)</Text>
            </View>
              <View style={{flex: 1}}>
                <FlatList scrollEnabled={false}
                  keyExtractor={item => item.id}
                  data={details.public_reviews}
                  renderItem={({item, index}) => {
                    return <Comments item={item} index={index} />
                  }}
                />
              </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              margin: 10,
            }}>
            Similar products
          </Text>
          <SimilarProducts navigation={navigation} onPress={onPress}/>
        </ScrollView>
        <View
          style={{
            flex: 0.06,
            padding: 5,
            flexDirection: 'row',
            position: 'absolute',
            backgroundColor: atTop == true ? 'transparent' : 'white',
          }}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => {
              goBack()
            }}>
            <Icon
              size={25}
              name="arrow-left"
              color={colors.primary}
              style={{}}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
            }}></View>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => {
              navigate('CartScreen');
            }}>
            <Icon size={30} name="shopping-cart" color={colors.primary} />
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
      </GestureRecognizer>
      <View
        style={{
          flex: 0.12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={onPress}
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 80,
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 10,
            justifyContent: 'center',
            marginEnd: 10,
          }}>
          <Text
            style={{
              fontSize: 25,
              color: 'white',
              fontWeight: 'bold',
            }}>
            Buy now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
          }}
          style={{
            borderWidth: 2,
            borderColor: colors.primary,
            backgroundColor: 'white',
            paddingHorizontal: 13,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}>
          <Text
            style={{
              fontSize: 30,
              color: colors.primary,
            }}>
            +
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: colors.success,
            backgroundColor: colors.success,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            marginStart: 10,
          }}>
          <Icon name="comment" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
    </colorContext.Provider>
     : <ActivityIndicator/>
  );
};

export default ProductScreen;
