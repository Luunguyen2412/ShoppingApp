import React, {useEffect} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  View,
  FlatList,
} from 'react-native';
import {COLOURS, Items} from '../../databases/Database';
import {useSelector, useDispatch} from 'react-redux';
import { getCategories } from '../../redux/actions';

const CategoryCarousel = ({navigation}) => {
  const {categories} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [navigation]);

  return (
    <ScrollView horizontal={true}>
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
            }}>
            {item.name}
          </Text>
        )}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  text: {color: '#000'},
});
export default CategoryCarousel;
