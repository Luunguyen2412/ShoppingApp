import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {COLOURS, Items} from '../databases/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../redux/actions';

const ProductInfo = ({route, navigation}) => {
  const {ProductID} = route.params;
  const [product, setProduct] = useState({});
  const {goods} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromFB();
      getDataFromAPI();
      dispatch(getProducts());
    });
    return unsubscribe;
  }, [navigation]);

  const getDataFromFB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == ProductID) {
        await setProduct(Items[index]);
        return;
      }
    }
  };

  const getDataFromAPI = async () => {
    for (let index = 0; index < goods.length; index++) {
      if (goods[index].id == ProductID) {
        await setProduct(goods[index]);
        return;
      }
    }
  };

  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item added successfully to Cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item added successfully to Cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  const renderProduct = ({item, index}) => {
    return (
      <View
        style={{
          height: 240,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}></Image>
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: COLOURS.backgroundDark,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <View
            style={{
              width: '100%',
              paddingTop: 16,
              paddingLeft: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.backgroundMedium,
                  borderRadius: 10,
                }}></Entypo>
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={renderProduct}></FlatList>

          {/* <View
            style={{
              // width: '100%',
              // flexDirection: 'row',
              // alignItems: 'center',
              // justifyContent: 'center',
              // marginBottom: 16,
              // marginTop: 32,
            }}>
            <Image
              source={product.productImage}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}></Image>
          </View> */}
        </View>
        <View style={{paddingHorizontal: 16}}>
          <View style={{marginVertical: 15}}>
            <Text
              style={{color: COLOURS.blue, fontWeight: '500', fontSize: 16}}>
              shopping
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLOURS.black,
                maxWidth: '84%',
              }}>
              {product.productName}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
            }}>
            {product.description}
          </Text>
          <View style={{paddingHorizontal: 16, marginTop: 20}}>
            <Text
              style={{
                fontSize: 20,
                color: COLOURS.black,
                fontWeight: '400',
                letterSpacing: 1,
              }}>
              {product.productPrice}.00$
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            width: '80%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  items: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default ProductInfo;
