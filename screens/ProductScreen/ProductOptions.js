import React, {useState, useContext} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Text,
} from 'react-native'
import TouchableScale from 'react-native-touchable-scale';
import { colors, icons } from '../../constants';
import { colorContext } from './ProductScreen';
import Icon from 'react-native-vector-icons/FontAwesome';


var ProductOptions = () => {
    
    var context = useContext(colorContext)
    var [colors, setColors] = useState(context.variants)
    var [sizes, setSizes] = useState(context.variants)

    return <View style={styles.view}>
        <View style={styles.container_view}>
        <Text style={styles.text}>Colors</Text>
        <FlatList
        horizontal
        data={colors}
        keyExtractor={key => key.id}
        renderItem={({item, index}) => {
            return <TouchableScale
            onPress={() => {
                var cloneColors = context.variants.map(i => {
                    setColors(context.variants)
                    if (item.id == i.id){
                        return {
                            ...item,
                            isChoose: item.isChoose == false || item.isChoose == undefined ? true : false, 
                        }
                    }
                    return i
                })
                setColors(cloneColors)
            }}
            style={[
                styles.container,
            ]}>
                <View style={[
                    styles.color,
                ]}>
                    <Image source={{uri: item.image.image}} style={[
                        styles.img,
                        {
                            width: 40,
                            height: 40,
                            borderWidth: item.isChoose == false || item.isChoose == undefined ? 0 : 2,
                        }
                    ]}/>
                    {item.isChoose && <Icon name='check' size={20} style={styles.iconCheck}/>}
                </View>
            </TouchableScale>
        }}
        />
        </View>

        <View style={styles.container_view}>
        <Text style={styles.text}>Sizes</Text>
        <FlatList
        horizontal
        data={sizes}
        keyExtractor={key => key.id}
        renderItem={({item, index}) => {
            return <TouchableScale
                    style={styles.size}
                    onPress={() => {
                        var cloneSizes = context.variants.map(i => {
                            setSizes(context.variants)
                            if (item.id == i.id){
                                return {
                                    ...item,
                                    isChooseSize: item.isChooseSize == false || item.isChooseSize == undefined ? true : false,
                                }
                            }
                            return i
                        })
                        setSizes(cloneSizes)
                        console.log(sizes)
                    }}
                >
                    <Text style={{
                        color: item.isChooseSize ? 'white' : 'rgba(0, 0, 0, 0.5)',
                        textAlign: 'center',
                        padding: 10,
                        fontSize: 12,
                        backgroundColor: item.isChooseSize == true ? 'orange' : 'rgba(0, 0, 0, 0.1)',
                    }}>{item.size.name}</Text>
                </TouchableScale>
        }}
        />
        </View>
    </View>
}

var styles = StyleSheet.create({
    color: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    view: {
        flex: 1,
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
        minWidth: '57%',
    },
    size: {
        marginStart: 10,
        marginVertical: 5,
        minWidth: 40,
    },
    container_view: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ProductOptions;