import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList, Image, Text, TextInput, LogBox} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {colors, icons} from '../../constants';
import {colorContext} from './ProductScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native-paper';

LogBox.ignoreLogs([
  'Cannot update a component (`ProductScreen`) while rendering a different component (`ProductOptions`). To locate the bad setState() call inside `ProductOptions`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render'
])

var ProductOptions = (props) => {
  var [isSelected, setIsSelected] = useState(false);

  const getColorsAndCover = detail => {
    const {variants} = detail;
    return [
      ...new Map(
        variants.map(variant => [
          variant.color.id,
          {...variant.color, cover: variant.cover},
        ]),
      ).values(),
    ];
  };

  var context = useContext(colorContext);
  var [colors, setColors] = useState(getColorsAndCover(context));
  var [qty, setQty] = useState(0);
  var [quantitySize, setQuantitySize] = useState([]);
  var [quantityColor, setQuantityColor] = useState([]);

  var getSizes = cloneSizes => {
    return cloneSizes.map(item => {
      if (item.isChooseSize) return item;
    });
  };

  var getColors = cloneColors => {
    return cloneColors.map(item => {
      if (item.isChoose) return item;
    });
  };

  var getQuantity = (quantityColor, quantitySize) => {
    if (quantityColor.length > 0 && quantitySize.length > 0) {
      var quantity = context.variants.filter(
        item =>
          item.color.id == quantityColor[0].id &&
          item.size.id == quantitySize[0].id,
      );
      if (quantity[0] !== undefined) {
        props.setProductVariantId(
          getProductVariantId(quantityColor, quantitySize),
        );
        props.setQty(qty);
        return quantity[0].quantity;
      } else return 0;
    } else return 0;
  };

  var getProductVariantId = (quantityColor, quantitySize) => {
    if (quantityColor.length > 0 && quantitySize.length > 0) {
      var quantity = context.variants.filter(
        item =>
          item.color.id == quantityColor[0].id &&
          item.size.id == quantitySize[0].id,
      );
      if (quantity[0] !== undefined) return quantity[0].id;
      else return '';
    } else return '';
  };

  var removeTheSameElement = array => {
    var result = [];
    array.filter(element => {
      if (!result.some(i => i.id == element.id)) {
        result.push(element);
      }
    });
    return result;
  };

  var getSizeByColor = () => {
    if (quantityColor.length > 0) {
      var result = context.variants.filter(
        element => element.color.id == quantityColor[0].id,
      );
      return result.map(element => element.size);
    }
  };

  var [sizes, setSizes] = useState(getSizeByColor());

  useEffect(() => {
    setSizes(getSizeByColor());
    console.log(quantityColor)
  }, [colors]);


  return (
    <View style={styles.view}>
      <View style={styles.container_view}>
        <Text style={styles.text}>Colors</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={removeTheSameElement(colors)}
          keyExtractor={key => key.id}
          renderItem={({item, index}) => {
            return (
              <TouchableScale
                onPress={() => {
                  var cloneColors = removeTheSameElement(
                    getColorsAndCover(context),
                  ).map(i => {
                    if (item.id == i.id) {
                      return {
                        ...item,
                        isChoose:
                          item.isChoose == false || item.isChoose == undefined
                            ? true
                            : false,
                      };
                    }
                    return i;
                  });
                  setColors(cloneColors);
                  setQuantityColor(
                    getColors(cloneColors).filter(item => item != undefined),
                  );
                  props.setColor(getColors(cloneColors).filter(item => item != undefined))
                }}
                style={styles.container}>
                <View style={styles.color}>
                  {/* <Text style={{
                      flex: 1,
                    }}>{item.name}</Text> */}
                  <Image
                    source={{uri: item.cover}}
                    style={[
                      styles.img,
                      {
                        width: 40,
                        height: 40,
                        borderWidth:
                          item.isChoose == false || item.isChoose == undefined
                            ? 0
                            : 2,
                      },
                    ]}
                  />
                  {item.isChoose && (
                    <Icon name="check" size={20} style={styles.iconCheck} />
                  )}
                </View>
              </TouchableScale>
            );
          }}
        />
      </View>

      <View style={styles.container_view}>
        <Text style={styles.text}>Sizes</Text>

        {quantityColor.length > 0 ? <FlatList
          horizontal

          showsHorizontalScrollIndicator={false}
          data={sizes}
          keyExtractor={key => key.id}
          renderItem={({item, index}) => {
            return (
              <TouchableScale
                style={styles.size}
                onPress={() => {
                  var cloneSizes = getSizeByColor().map(i => {
                    if (item.id == i.id) {
                      return {
                        ...item,
                        isChooseSize:
                          item.isChooseSize == false ||
                          item.isChooseSize == undefined
                            ? true
                            : false,
                      };
                    }
                    return i;
                  });
                  setSizes(cloneSizes);

                  setQuantitySize(
                    getSizes(cloneSizes).filter(item => item != undefined),
                  );
                  props.setSize(getSizes(cloneSizes).filter(item => item != undefined))
                }}>
                <Text
                  style={{
                    borderRadius: 5,
                    color: item.isChooseSize ? 'white' : 'rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                    padding: 10,
                    fontSize: 12,
                    backgroundColor:
                      item.isChooseSize == true
                        ? 'orange'
                        : 'rgba(0, 0, 0, 0.1)',
                  }}>
                  {item.name}
                </Text>
              </TouchableScale>
            );
          }}
        /> : <View style={{flex: 1, alignItems: 'center', backgroundColor: 'orange', marginVertical: 3.8}}>
          <Text style={{padding: 10, color: 'white'}}>Choose color to show its sizes</Text>  
        </View>}
      </View>

      <View style={styles.quantity}>
        <Text style={styles.quantityText}>Quantity </Text>
        <Text
          style={[
            styles.quantityText,
            {
              color: 'rgb(7, 161, 79)',
            },
          ]}>
          ({getQuantity(quantityColor, quantitySize)} products)
        </Text>
      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableScale
            disabled={qty == 0 ? true : false}
            onPress={() => {
              var qtyMinus = qty - 1;
              setQty(qtyMinus);
            }}
            style={[
              styles.qtyButton,
              {
                backgroundColor:
                  qty == 0 || getQuantity(quantityColor, quantitySize) == 0
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'orange',
              },
            ]}>
            <Text
              style={{
                color:
                  qty == 0 || getQuantity(quantityColor, quantitySize) == 0
                    ? 'rgba(0, 0, 0, 0.5)'
                    : 'white',
              }}>
              -
            </Text>
          </TouchableScale>
          <Text style={styles.qtyText}>
            {getQuantity(quantityColor, quantitySize) == 0 ? 0 : qty}
          </Text>
          <TouchableScale
            disabled={getQuantity(quantityColor, quantitySize) == qty}
            onPress={() => {
              var qtyAdd = qty + 1;
              setQty(qtyAdd);
            }}
            style={[
              styles.qtyButton,
              {
                backgroundColor:
                  getQuantity(quantityColor, quantitySize) == qty ||
                  getQuantity(quantityColor, quantitySize) == 0
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'orange',
              },
            ]}>
            <Text
              style={{
                color:
                  getQuantity(quantityColor, quantitySize) == qty ||
                  getQuantity(quantityColor, quantitySize) == 0
                    ? 'rgba(0, 0, 0, 0.5)'
                    : 'white',
              }}>
              +
            </Text>
          </TouchableScale>
        </View>
        <View style={{flex: 0.7}}></View>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  color: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: colors.primary,
  },
  view: {
    flex: 1,
    marginVertical: 20,
  },
  container: {
    marginStart: 10,
    borderRadius: 20,
    borderColor: colors.primary,
  },
  iconCheck: {
    color: colors.primary,
    position: 'absolute',
  },
  img: {
    borderRadius: 20,
    flex: 1,
    borderColor: colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 10,
    marginBottom: 10,
    minWidth: '35%',
  },
  size: {
    marginStart: 10,
    marginVertical: 5,
    minWidth: 40,
  },
  container_view: {
    marginEnd: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qty: {
    flex: 1,
  },
  qtyButton: {
    padding: 5,
    paddingHorizontal: 10,
    minWidth: 30,
    alignItems: 'center',
    borderRadius: 10,
  },
  qtyText: {
    textAlign: 'center',
  },
  quantity: {
    flex: 1,
    flexDirection: 'row',
    marginStart: 10,
    marginBottom: 10,
  },
  quantityText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
});

export default ProductOptions;
