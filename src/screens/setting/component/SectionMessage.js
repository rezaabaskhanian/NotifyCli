import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../styles'
import Ionicons  from 'react-native-vector-icons/Ionicons';

import Entypo  from 'react-native-vector-icons/Entypo';
const SectionMessage = (props) => {
  return (
    <View style={styles.container}>
    <View style={styles.nameViw}>
    <Ionicons name="menu" size={20} color="black" />
    <Text style={styles.txt}>
      {
        `${props.data.name}`
      }
    </Text>

    </View>

    <Entypo name="dots-three-vertical" size={16} color="black" />
    </View>
  )
}

export default SectionMessage

const styles = StyleSheet.create({
    container:{
      
      flexDirection:'row',
        justifyContent : 'space-between',
        backgroundColor:Colors.WHITE,
        padding:10,
        marginVertical:10
      

    },
    nameViw:{
      justifyContent:"space-between",
      flexDirection:'row',
    },
    txt :{
      marginLeft:20,
   
      
    }

})