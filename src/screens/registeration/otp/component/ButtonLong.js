import { StyleSheet,  View,TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors,Spacing } from '../../../../styles'
import  Text from '../../../components/Text'

const ButtonLong = (props) => {
  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={props.onPress}>
    <Text style={styles.txtBtn}>
        {props.text}
    </Text>
     </TouchableOpacity>
    </View>
  )
}

export default ButtonLong

const styles = StyleSheet.create({
container:{
    
marginHorizontal:15,
marginVertical:10,
    borderRadius:5,
    backgroundColor:Colors.BLUE_LIGHT,
    justifyContent:'center',
    alignItems:'center',
   padding:15
},
txtBtn:{
    color:Colors.BLUE_FONT
}

})