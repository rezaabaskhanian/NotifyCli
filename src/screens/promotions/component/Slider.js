import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';

const Slider = (props) => {
    _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }
  return (
    <Carousel
              ref={(c) => {_carousel = c; }}
              data={props.entries}
              renderItem={_renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
  )
}

export default Slider

const styles = StyleSheet.create({


})