import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors ,Spacing} from '../../styles'
const Buttons = (props) => {
  return (
    <View style={[styles.container,props.style]}>

      <TouchableOpacity style={styles.oneButton} onPress={props.onPress}>
        <Text style={styles.txtBtn}>
          {props.oneTitle}
        </Text>

      </TouchableOpacity>


      
    </View>
  )
}

export default Buttons

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
  },
  oneButton:{
    justifyContent:'center',
    alignItems:'center',
     width:330,
     height:35,
     borderRadius:10,
     backgroundColor:Colors.BLUE_LIGHT,
    
     
  },
  txtBtn:{
    color:Colors.BLUE_DARK
  }
   
})