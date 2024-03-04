import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Colors,Typography,Mixins,Spacing } from '../../../styles'
import Text from '../../components/Text'
const Tiltels = (props) => {
  return (
    <View style={styles.container}>

      <Text style={styles.oneTitle}>{props.oneTitle}</Text>
      <Text style={styles.twoTitle}>{props.twoTitle}</Text>
      <Text style={styles.threeTitle}>{props.threeTitle}</Text>
    
    </View>
  )
}



export default Tiltels

const styles = StyleSheet.create({
    container:{
      flex:1,
     justifyContent:'center',
     alignItems :'center'
  
    },
    oneTitle:{
   fontSize:Spacing.SCALE_12,
   color:Colors.GRAY_DARK
    },
    twoTitle:{
        fontSize:Spacing.SCALE_18,
        color:Colors.BLACK,
        marginVertical:6,

         },
         threeTitle:{
            fontSize:Spacing.SCALE_14,
            color:Colors.GRAY_DARK,
            marginVertical:6,
            
             }

  })