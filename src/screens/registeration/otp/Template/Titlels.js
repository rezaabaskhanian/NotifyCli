import { StyleSheet,  View } from 'react-native'
import React from 'react'
import { Colors ,Spacing} from '../../../../styles'
import Text from '../../../components/Text'
const Titles = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.desc}>{props.desc}</Text>
    </View>
  )
}

export default Titles;

const styles = StyleSheet.create({
container:{
  flex:1,
  marginBottom:30,
  justifyContent:'flex-end'
},
title:{
  fontWeight:'bold',
  fontSize:Spacing.SCALE_16,
},
desc:{
  marginTop:10,
  fontSize:Spacing.SCALE_12,
  lineHeight: 20,
}

})