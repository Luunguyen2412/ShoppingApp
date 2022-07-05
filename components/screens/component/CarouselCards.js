import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import {COLOURS, dataCarousel} from '../../databases/Database';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CategoryCarousel';
import Carousel from 'react-native-snap-carousel';

const CarouselCards = () => {
  const isCarousel = React.useRef(null);

  return (
    <View>
      <Carousel
        layout="tinder"
        data={dataCarousel}
        layoutCardOffset={9}
        ref={isCarousel}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  );
};

export default CarouselCards
