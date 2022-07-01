import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {COLOURS, Items} from '../databases/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {increaseCount, decreaseCount, countingPrice} from '../redux/actions';

const MyCart = ({route, navigation}) => {
  const [product, setProduct] = useState([]);
  const [total, setToTal] = useState(0);
  const count = useSelector(state => state.userReducer.count);
  const totalPrice = useSelector(state => state.userReducer.price);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });
    return unsubscribe;
  }, [navigation]);

  // get data
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  //get total price
  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice * count;
    }
    setToTal(total);
  };

  // delete data from cart
  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', {ProductID: data.id})}
        key={index}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLOURS.backgroundLight,
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 15,
            alignContent: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={data.productImage}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}></Image>
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {data.productName}
            </Text>
            <Text style={{color: COLOURS.black}}>
              {data.productPrice * count}.00$
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(decreaseCount());
                  }}
                  style={{
                    borderRadius: 100,
                    marginRight: 20,
                    padding: 6,
                    borderWidth: 1,
                    borderColor: COLOURS.backgroundDark,
                    opacity: 0.5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: COLOURS.backgroundDark,
                    }}>
                    --
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>{count}</Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(increaseCount());
                  }}
                  style={{
                    borderRadius: 100,
                    marginLeft: 20,
                    padding: 6,
                    borderWidth: 1,
                    borderColor: COLOURS.backgroundDark,
                    opacity: 0.5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: COLOURS.backgroundDark,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => removeItemFromCart(data.id)}
              style={{
                borderRadius: 100,
                marginRight: 20,
                padding: 6,
                borderWidth: 1,
                borderColor: COLOURS.backgroundDark,
                opacity: 0.5,
              }}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
            paddingTop: 16,
            paddingLeft: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
            }}>
            Order Details
          </Text>
        </View>
        <Text
          style={{
            padding: 16,
            fontSize: 20,
            color: COLOURS.black,
            fontWeight: '500',
          }}>
          My cart
        </Text>
        <View style={{paddingHorizontal: 10}}>
          {product.map(renderProducts)}
        </View>
        <View style={{padding: 16}}>
          <Text
            style={{
              fontSize: 20,
              color: COLOURS.black,
              fontWeight: '500',
            }}>
            Order Info
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>Total Price: </Text>
            <Text style={styles.text}>{total}.00$</Text>
          </View>
        </View>
        <View
          style={{
            height: 50,
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
              Check out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {color: '#000'},
});

export default MyCart;
