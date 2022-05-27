import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useMemo
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  VirtualizedList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  LogBox,
  Image,
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SliderBox} from 'react-native-image-slider-box';
import {colors} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import FiveStars from '../ProductsGrid/FiveStars';
import Comments from './Comments';
import SimilarProducts from './SimilarProducts';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {StackActions, useScrollToTop} from '@react-navigation/native';
import ProductOptions from './ProductOptions';
import {UICartButton, UIGoBackButton} from '../../components/index';
// import { ScrollView } from 'react-native-virtualized-view';
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Dimensions} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useDispatch } from 'react-redux';
import { addCounter, setBuyNow } from '../../Store/actions';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  'You seem to update the renderers prop(s) of the "RenderHTML" component in short periods of time, causing costly tree rerenders'
]);

export var colorContext = createContext();

var ProductScreen = props => {
  var [isLoading, setIsLoading] = useState(true);
  var [details, setDetails] = useState({});
  var [reviewsList, setReviewsList] = useState([]);
  var [isShowFullScreenImage, setIsShowFullScreenImage] = useState(false);
  var [size, setSize] = useState()
  var [color, setColor] = useState()

  var imagesList = []
  var [imgList, setImgList] = useState([]);

  var getDetails = () => {
    fetch(
      `https://lifewear.mn07.xyz/api/products/${props.route.params.item.id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        setDetails(json);
        getReviews(json.id);
        json.images.map(image => imagesList.push({
          url: image.image
        }))
      })
      .then(() => setImgList(imagesList.slice(0, 5)))
      .then(() => setIsLoading(false))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getDetails();
    return () => {
      setDetails({});
    };
  }, []);

  var [isActive, setIsActive] = useState(true);
  var [isActiveWaranty, setIsActiveWaranty] = useState(false);

  var {navigation, route} = props;
  var {navigate, goBack, push, dispatch} = navigation;

  const scrollRef = useRef();

  var [atTop, setAtTop] = useState(true);

  const source = {
    html: `${details.description}`,
  };
  const {width} = useWindowDimensions();

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true,
    },
  };

  const customHTMLElementModels = {
    'blue-circle': HTMLElementModel.fromCustomModel({
      tagName: 'blue-circle',
      mixedUAStyles: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        backgroundColor: 'blue',
      },
      contentModel: HTMLContentModel.block,
      ignoredDomtags: 'iframe',
    }),
  };

  var [productVariantId, setProductVariantId] = useState();
  var [qty, setQty] = useState();

  var addToCart = token => {
    const options = {
      method: 'POST',
      url: `https://lifewear.mn07.xyz/api/user/cart`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: {
        product_variant_id: productVariantId,
        quantity: qty,
      },
    };

    if (productVariantId !== undefined && qty > 0) {
      axios
      .request(options)
      .then(() =>
        Toast.show({
          type: 'success',
          text1: 'Add product successfully',
          text2: 'Check your cart! 👋',
        }),
        dispatchHandler(1)
      )
      .catch(err => console.error(err.response.data));
    }
    else Toast.show({
      type: 'error',
      text1: 'Add product fail',
      text2: 'Choose size, color and quantity first! 👋',
    })
  };

  var getReviews = product_id => {
    const options = {
      method: 'GET',
      url: `https://lifewear.mn07.xyz/api/products/${product_id}/reviews`,
      // headers: {Authorization: 'Bearer ' + token}
    };

    axios
      .request(options)
      .then(response => setReviewsList(response.data))
      .catch(error => console.error(error));
  };

  var buyNow = (item) => {
    console.log({color, size})
    if (productVariantId !== undefined && qty > 0) {
      var arr = []
      arr.push({
        ...item,
        color: color,
        size: size,
        cart_quantity: qty
      })
      navigate('Payment', {listProducts: arr})
    }
    else Toast.show({
      type: 'error',
      text1: 'Add product fail',
      text2: 'Choose size, color and quantity first! 👋',
    })
  }

  const dispatchRedux = useDispatch();

  const dispatchHandler = (num) => {
    dispatchRedux(addCounter(num))
  }

  return isLoading == false ? (
    <colorContext.Provider value={details}>
      <Modal visible={isShowFullScreenImage} transparent={true}>
        <ImageViewer imageUrls={imgList} enableSwipeDown={true} onSwipeDown={() => {
          setIsShowFullScreenImage(false)
        }}/>
      </Modal>
      <View
        style={{
          flex: 1,
        }}>
        <GestureRecognizer style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollRef}
            onMomentumScrollBegin={() => setAtTop(false)}
            style={{
              height: 400,
            }}>
            <SliderBox
              onCurrentImagePressed={() => {
                setIsShowFullScreenImage(true)
                console.log(imgList)
              }}
              autoplay={true}
              circleLoop={true}
              images={details.images.map(image => image.image).slice(0, 5)}
              inactiveDotColor={colors.disable}
              ImageComponentStyle={{
                borderRadius: 15,
                width: '97%',
                flex: 0.5,
                marginTop: 5,
              }}
              dotColor={colors.primary}
              sliderBoxHeight={400}
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
                <View>
                  <Text
                    style={{
                      marginStart: 10,
                      fontSize: 20,
                      color: colors.danger,
                    }}>
                    {details.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }) }
                  </Text>
                  <Text
                    style={{
                      marginStart: 10,
                      fontSize: 15,
                      textDecorationLine: 'line-through'
                    }}>
                    {details.sale_price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Text>
                </View>
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
                    {details.reviews_count} reviews
                  </Text>
                </View>
              </View>
              <ProductOptions
                setProductVariantId={setProductVariantId}
                setQty={setQty}
                setSize={setSize}
                setColor={setColor}
              />
              <View style={{margin: 10}}>
                <View style={styles.brand}>
                  <Text>Category</Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        StackActions.push('CategoryScreen', {
                          idCategory: details.category.id,
                        }),
                      );
                    }}>
                    <Text
                      style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                        borderRadius: 5,
                        color: 'white',
                      }}>
                      {details.category.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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
                <RenderHtml
                  contentWidth={width * 0.95}
                  source={source}
                  renderersProps={renderersProps}
                  customHTMLElementModels={customHTMLElementModels}
                />
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
                <Text style={styles.content}>
                  - For storage products, Infortrend warrants to the direct
                  customer that Infortrend hardware products will be free from
                  defects in material and workmanship for a period of three (3)
                  years after delivery, excluding non-Infortrend product and
                  software delivered with or as part of the Infortrend product.
                  Batteries are covered under warranty for a two-year period.
                  SSD (solid state drive) products have a warranty that expires
                  at the earlier of (i) the time period specified at purchase,
                  or (ii) when the use of the SSD exceeds the maximum TBW (Total
                  Bytes Written) or endurance limit. Infortrend warrants the
                  replacement or repaired parts, to be free from defects in
                  material or workmanship for ninety (90) days or, for the
                  remainder of the limited warranty period of the product they
                  are replacing or in which they are installed, whichever is
                  longer.
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 5,
                    fontSize: 18,
                  }}>
                  Non-Warranty
                </Text>
                <Text style={styles.content}>
                  - Infortrend will repair or replace the defective storage and
                  EonAI products; provided, however, that any such repair or
                  replacement is contingent upon the availability of the
                  required components. The customer shall pay the two-way
                  shipping, packing, insurance, repair/replacement service fees
                  and other costs, including necessary labor and parts.
                  {'\n'}- Customer shall ship defective products freight prepaid
                  to Infortrend. Infortrend shall ship repaired products freight
                  collect to the customer. If the customer has a pending
                  delivery, the repaired products shall be shipped together with
                  the customer's order. Otherwise, it will be shipped
                  separately.
                </Text>
              </View>
            )}

            <View
              style={{
                marginHorizontal: 10,
                padding: 5,
                // paddingBottom: 0,
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
                <Text>({reviewsList.length} reviews)</Text>
              </View>
              <View style={{flex: 1}}>
                <FlatList
                  scrollEnabled={false}
                  keyExtractor={item => item.id}
                  data={reviewsList}
                  renderItem={({item, index}) => {
                    return <Comments item={item} index={index} />;
                  }}
                />
              </View>
            </View>

            <SimilarProducts
              navigation={navigation}
              idCategory={details.category.id}
              title="Similar products"
            />
          </ScrollView>
          <View
            style={{
              flex: 0.06,
              padding: 5,
              flexDirection: 'row',
              position: 'absolute',
              // backgroundColor: atTop == true ? 'transparent' : 'white',
            }}>
            <UIGoBackButton
              navigation={navigation}
              style={styles.goBackButton}
            />
            <View
              style={{
                flex: 1,
              }}></View>
            <View style={{}}>
              <UICartButton
                color={colors.primary}
                style={styles.cartButton}
                navigation={navigation}
              />
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
          <TouchableOpacity
            onPress={() => buyNow(details)}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 80,
              paddingVertical: 10,
              alignItems: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              marginEnd: 10,
              elevation: 10,
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
              AsyncStorage.getItem('token').then(token => addToCart(token));
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
          <TouchableOpacity onPress={() => navigate('Chat')}
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
  ) : (
    <ActivityIndicator animating={true} color={colors.primary} />
  );
};

var styles = StyleSheet.create({
  cartButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 50,
    margin: 5,
  },
  content: {
    marginBottom: 5,
    lineHeight: 25,
    textAlign: 'justify',
  },

  goBackButton: {
    padding: 5,
    paddingHorizontal: 14,
    margin: 5,
    borderRadius: 50,
    backgroundColor: colors.disable,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    padding: 10,
  },
});

export default ProductScreen;
