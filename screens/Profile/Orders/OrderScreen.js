import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {UIHeader} from '../../../components';
import {useSelector, useDispatch} from 'react-redux';
import {orderSelector} from '../../../Store/selector';
import {setOrder} from './Store/actions';
import {colors} from '../../../constants';

var OrderScreen = props => {
  var order = useSelector(orderSelector);
  console.log(order);

  var dispatchOrder = useDispatch();
  var dispatchHandler = () => {
    dispatchOrder(setOrder(orderAfterDelete));
  };

  var deleteOrder = (key) => {
    setOrderAfterDelete(order.filter(item => item.key !== key))
  }

  var {title} = props.route.params;

  var {navigation, route} = props;
  var {navigate, goBack} = navigation;

  var [showModal, setShowModal] = useState(false);
  var [orderAfterDelete, setOrderAfterDelete] = useState([]);

  return (
    <View style={styles.container}>
      <Modal transparent={true} animationType="slide" visible={showModal}>
        <View style={styles.containerAlertRemove}>
          <View style={styles.alertRemove}>
            <Text style={{marginBottom: 5}}>
              Once you cancel your order, it cannot be
              undone.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false)
                }}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatchHandler()
                  setShowModal(false)
                }}>
                <Text style={styles.removeOrder}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <UIHeader
        title={title}
        leftIcon="arrow-left"
        onPressLeftIcon={() => goBack()}
      />
      {order.length > 0 ? (
        <FlatList
          data={order}
          keyExtractor={key => key.key}
          renderItem={({item, index}) => {
            return (
              <View style={[styles.i, {marginTop: index > 0 ? 0 : 10}]}>
                <FlatList
                  keyExtractor={key => key.id}
                  data={item.listProducts}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={[
                          styles.containerItem,
                          {
                            marginTop: index > 0 ? 0 : 10,
                          },
                        ]}>
                        <Image
                          source={{
                            uri: item.cover,
                          }}
                          style={styles.image}
                        />
                        <View style={{flex: 0.5}}>
                          <Text style={styles.name} numberOfLines={2}>
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.color}>
                              {item.options === undefined
                                ? item.color.name
                                : item.color[0].name}
                            </Text>
                            <Text style={styles.size}>
                              {item.options === undefined
                                ? item.size.name
                                : item.size[0].name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                            }}>
                            <Text style={styles.priceLine}>
                              {item.price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </Text>
                            <Text style={styles.sale_price}>
                              {item.sale_price.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.viewQty}>
                          <Text>x{item.cart_quantity}</Text>
                        </View>
                      </View>
                    );
                  }}
                />

                <View style={styles.containerBottom}>
                  <View style={styles.item}>
                    <Text>Address</Text>
                    <View style={{flex: 1}}></View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Text>{item.add[0].phone}</Text>
                      <Text>{item.add[0].address}</Text>
                      <Text>{item.add[0].province.name}</Text>
                      <Text>{item.add[0].district.name}</Text>
                      <Text>{item.add[0].ward.name}</Text>
                    </View>
                  </View>

                  <View style={styles.item}>
                    <Text>Payment method</Text>
                    <View style={{flex: 1}}></View>
                    <Text style={styles.price}>{item.paymentMethod}</Text>
                  </View>

                  <View style={styles.item}>
                    <Text>Price</Text>
                    <View style={{flex: 1}}></View>
                    <Text style={styles.price}>
                      {item.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </Text>
                  </View>
                </View>

                <View style={styles.containerBtnCancel}>
                  <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={() => {
                        setShowModal(true)
                        deleteOrder(item.key)
                    }}>
                    <Text style={styles.btnCancelText}>Cancel order</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>No order in {title}</Text>
        </View>
      )}
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  containerItem: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  },
  containerBottom: {
    flex: 1,
  },
  i: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  item: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  price: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.primary,
  },
  name: {
    color: colors.primary,
  },
  image: {
    flex: 0.25,
    height: '100%',
    marginEnd: 10,
    borderRadius: 10,
  },
  color: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: 5,
    paddingHorizontal: 10,
  },
  size: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: colors.primary,
  },
  viewQty: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 0.25,
  },
  containerBtnCancel: {
    flex: 1,
    alignItems: 'flex-end',
  },
  btnCancel: {
    backgroundColor: colors.danger,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  btnCancelText: {
    color: 'white',
  },
  sale_price: {
    color: colors.danger,
    fontWeight: 'bold',
  },
  priceLine: {
    textDecorationLine: 'line-through',
    marginEnd: 10,
  },
  alertRemove: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius:5,
  },
  containerAlertRemove: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    padding: 10,
    color: colors.primary,
  },
  removeOrder: {
    backgroundColor: colors.primary,
    padding: 10,
    color: 'white',
    borderRadius:5,
  }
});

export default OrderScreen;
