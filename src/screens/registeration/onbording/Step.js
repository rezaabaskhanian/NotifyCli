import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors,Typography,Mixins,Spacing } from '../../../styles'

//use with use memo or callbakc function 

const Step = (props) => {
  return (
    <View style={styles.container}>
           <View style={props.step=='one' ?styles.blue :styles.gray}/>
           <View style={props.step=='two' ?styles.blue :styles.gray}/>
           <View style={props.step=='three' ?styles.blue :styles.gray}/>
      
    </View>
  )
}

export default Step

const styles = StyleSheet.create({
    container:{
        
        flexDirection:'row',
        justifyContent:'center',
      
        
       
    },
    gray:{
      width:Spacing.SCALE_12,
      height:Spacing.SCALE_4,
      backgroundColor:Colors.GRAY_MEDIUM,
      marginRight:5
    },
    blue:{
      width:Spacing.SCALE_12,
      height:Spacing.SCALE_4,
      backgroundColor:Colors.BLUE_DARK,
      marginRight:5
    }
    
})