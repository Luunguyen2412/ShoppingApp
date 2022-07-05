import React, {useEffect} from 'react';
import {Pressable, Text, View, Dimensions, Image} from 'react-native';
import {COLOURS, Items} from '../../databases/Database';

// const CategoryCarousel = ({navigation}) => {
//   const {categories} = useSelector(state => state.userReducer);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCategories());
//   }, [navigation]);

//   return (
//     <ScrollView horizontal={true}>
//       <FlatList
//         data={categories}
//         renderItem={({item}) => (
//           <Text
//             style={{
//               fontSize: 14,
//               color: COLOURS.black,
//               fontWeight: '400',
//               letterSpacing: 1,
//             }}>
//             {item.name}
//           </Text>
//         )}
//       />
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   text: {color: '#000'},
// });
// export default CategoryCarousel;

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({item, index}) => {
  return (
    <View
      key={index}
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        width: ITEM_WIDTH,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      }}>
      <Image
        style={{width: ITEM_WIDTH, height: 300}}
        source={{uri: item.imgUrl}}
      />
      <Text
        style={{
          color: '#222',
          fontSize: 28,
          fontWeight: 'bold',
          paddingLeft: 20,
          paddingTop: 20,
        }}>
        {item.title}
      </Text>
      <Text
        style={{
          color: '#222',
          fontSize: 18,
          paddingLeft: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        {item.body}
      </Text>
    </View>
  );
};

export default CarouselCardItem;
