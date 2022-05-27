import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {UISearchBar, UIGoBackButton} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constants';
import ProductItem from '../ProductsGrid/ProductItem';
import {StackActions, useScrollToTop} from '@react-navigation/native';
import RangeSlider from 'rn-range-slider';
import axios from 'axios';
import {addWishList, deleteWishlist} from '../WishList/WishListController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setWishList} from '../../Store/actions';
import {useDispatch} from 'react-redux';

var CategoryScreen = props => {
  const dispatch = useDispatch();

  const wishListData = data => {
    dispatch(setWishList(data));
  };

  var [searchText, setSearchText] = useState('');

  var [isLoading, setIsLoading] = useState(true);

  var [productsData, setProductsData] = useState([]);
  var [isShowModal, setIsShowModal] = useState(false);

  var [category, setCategory] = useState();

  var {navigation, route} = props;

  var [sizes, setSizes] = useState([
    {
      id: 2,
      name: 'S',
    },
    {
      id: 3,
      name: 'M',
    },
    {
      id: 4,
      name: 'L',
    },
    {
      id: 5,
      name: 'XL',
    },
    {
      id: 6,
      name: '2XL',
    },
    {
      id: 7,
      name: '3XL',
    },
    {
      id: 8,
      name: '4XL',
    },
  ]);
  var [oldSizes, setOldSizes] = useState(sizes);

  var [minPrice, setMinPrice] = useState(minPrice);
  var [maxPrice, setMaxPrice] = useState(maxPrice);

  var [productsFilter, setProductsFilter] = useState(productsFilter);
  var [isFiltered, setIsFiltered] = useState(false);

  var getProductsByCategory = id => {
    fetch(`https://lifewear.mn07.xyz/api/categories/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        setProductsData(json.products.data);
        setCategory(json.name);
      })
      .then(() => setIsLoading(false));
  };

  var filteredProducts = () => {
    return productsData.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  var getSize = () => {
    if (sizes.filter(size => size.isChoose == true).length > 0) {
      return sizes.filter(size => size.isChoose == true)[0].name;
    } else return '';
  };

  useEffect(() => {
    getProductsByCategory(props.route.params.idCategory);
  }, []);

  var filterProducts = id => {
    console.log(`${getSize()}, ${minPrice}, ${maxPrice}`);
    const options = {
      method: 'GET',
      url: `https://lifewear.mn07.xyz/api/categories/${id}`,
      params: {size: getSize(), price_min: minPrice, price_max: maxPrice},
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    };

    axios
      .request(options)
      .then(response => setProductsData(response.data.products.data))
      .then(() => {
        setIsFiltered(true);
        setIsShowModal(false);
      })
      .catch(err => console.log(err));
  };

  return isLoading == false ? (
    <View style={{flex: 1}}>
      <Modal animationType="slide" visible={isShowModal} transparent={true}>
        <TouchableOpacity
          onPress={() => {
            setIsShowModal(false);
          }}
          style={{flex: 1}}>
          <View
            style={{
              width: '80%',
              height: '40%',
              backgroundColor: 'white',
              position: 'absolute',
              top: '12%',
              right: '2%',
              borderRadius: 10,
              elevation: 10,
              padding: 10,
            }}>
            <Text style={styles.label}>Size</Text>
            <FlatList
              contentContainerStyle={{
                height: 40,
              }}
              horizontal
              keyExtractor={keyExt => keyExt.id}
              data={sizes}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: item.isChoose
                        ? colors.primary
                        : 'rgba(0, 0, 0, 0.05)',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 10,
                      borderRadius: 5,
                      marginEnd: 5,
                    }}
                    onPress={() => {
                      var cloneSizes = oldSizes.map(i => {
                        if (item == i) {
                          return {
                            ...item,
                            isChoose:
                              i.isChoose == false || i.isChoose == undefined
                                ? true
                                : false,
                          };
                        }
                        return i;
                      });
                      setSizes(cloneSizes);
                    }}>
                    <Text
                      style={{color: item.isChoose ? 'white' : colors.disable}}>
                      {item.name}
                    </Text>
                    {/* {item.isChoose && <Icon name="check" color="white" style={{position: 'absolute', top: '30%'}}/>} */}
                  </TouchableOpacity>
                );
              }}
            />
            <Text style={styles.label}>Range price</Text>
            <Text>Min: {minPrice}</Text>
            <Text>Max: {maxPrice}</Text>

            <RangeSlider
              renderThumb={() => {
                return <View style={styles.thumb}></View>;
              }}
              renderRail={() => {
                return <View style={styles.rail}></View>;
              }}
              renderLabel={() => {
                return <View></View>;
              }}
              renderRailSelected={() => {
                return <View style={styles.railSelected}></View>;
              }}
              renderNotch={() => {
                return <View></View>;
              }}
              style={{marginVertical: 10, marginBottom: 100}}
              gravity={'center'}
              min={50000}
              max={999000}
              step={20000}
              selectionColor="#3df"
              blankColor="#f618"
              onValueChanged={(low, high, fromUser) => {
                setMinPrice(low);
                setMaxPrice(high);
              }}
            />
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: colors.primary,
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => {
                filterProducts(props.route.params.idCategory);
              }}>
              <Text style={{color: 'white'}}>Filter</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <UISearchBar navigation={navigation} setSearchText={setSearchText} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <UIGoBackButton navigation={navigation} style={styles.goBackButton} />
        <Text style={{color: colors.primary}}>{category}</Text>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => {
            setIsShowModal(!isShowModal);
          }}
          style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="filter" size={25} />
          <Text>filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{flex: 0.9}}
        keyExtractor={key => key.id}
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
                    ? deleteWishlist(item.id, response, wishListData) : addWishList(item.id, response, wishListData))
                  var cloneProducts = productsData.map(product => {
                    if (item.name == product.name) {
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
                  setProductsData(cloneProducts);
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  ) : (
    <ActivityIndicator animating={true} />
  );
};

var styles = StyleSheet.create({
  goBackButton: {
    fontSize: 16,
    padding: 5,
    paddingHorizontal: 10,
  },
  rail: {
    height: 5,
    flex: 1,
    backgroundColor: colors.disable,
    borderRadius: 5,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
  railSelected: {
    height: 5,
    flex: 1,
    backgroundColor: colors.primary,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default CategoryScreen;
