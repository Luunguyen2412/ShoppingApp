import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Dimensions,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import CarouselCards from './component/CarouselCards';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../redux/actions';
import {COLOURS, Items} from '../databases/Database';

const AllProducts = ({navigation}) => {
  const {goods} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getProducts());
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      {/* <CarouselCards /> */}
      <FlatList
        style={{
          marginVertical: 15,
          width: Dimensions.get('screen').width * 0.9,
          alignSelf: 'center',
        }}
        contentContainerStyle={{
          justifyContent: 'space-between',
          backgroundColor: 'gray',
        }}
        numColumns={2}
        data={goods}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductInfo', {
                ProductID: item.id,
              })
            }
            key={item.id}
            style={{
              width: Dimensions.get('window').width * 0.3,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{height: 100, width: 100}}>
              <Image
                source={{uri: item.thumbnail}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
                letterSpacing: 1,
                marginBottom: 10,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}></FlatList>
    </View>
  );
};

export default AllProducts;
