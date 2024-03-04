import { StyleSheet, View,SafeAreaView } from 'react-native'
import React,{useState} from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Text from '../../components/Text'
import { Colors } from '../../../styles';


const Slider = (props) => {
    _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
              <View style={{flexDirection:'row'}}>
              <Text style={styles.title}>{ item.banckNam }</Text>
              </View>
                <Text style={styles.title}>{ item.title }</Text>
                
            </View>
        );
    }

   const PaginationCustom= (props) =>{
     
      return (
          <Pagination
            dotsLength={props.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.pagination}
            dotStyle={styles.dots}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
  }
  const [activeSlide,setActivSlide]=useState(0)
  const onSnap=(index)=>{
    setActivSlide(index)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor:Colors.BLUE_THEME}}>
      <Text style={styles.txtHead}>
        {`Your bank accounts`}
      </Text>
      </View>
    <View style={styles.viwCarousel}>
      
    <Carousel
          
              ref={(c) => {_carousel = c; }}
              data={props.entries}
              renderItem={_renderItem}
              sliderWidth={300}
              itemWidth={300}
              onBeforeSnapToItem={onSnap}
              loop={true}
            />
           
            </View>
            <PaginationCustom length={props.entries.length} />
            </SafeAreaView>
  )
}

export default Slider

const styles = StyleSheet.create({
  container:{flex: 1,   },
  slide:{

  backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 150,
               padding: 30,
              marginLeft: 15,
              marginRight: 15,
              
  },
  pagination:{
    backgroundColor: Colors.BLUE_THEME
  },
  txtHead:{
    marginHorizontal:10,
    color:Colors.WHITE,
    marginTop:10
  },
  dots:{
    width: 40,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)'
},
viwCarousel:{  flexDirection:'row',
 backgroundColor:Colors.BLUE_THEME,
 paddingVertical:30
}


})