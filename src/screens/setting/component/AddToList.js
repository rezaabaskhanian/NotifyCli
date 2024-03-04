import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

import AntDesign  from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../styles';
const AddToList = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
           <AntDesign name="pluscircleo" size={20} color={Colors.BLUE_THEME} />
           <Text style={{marginLeft:30,marginTop:2,color:Colors.BLUE_THEME}}>
               {`Add to list`}
           </Text> 
    
    </TouchableOpacity>
  )
}

export default AddToList

const styles = StyleSheet.create({
    container :{
        marginTop:10,
        flexDirection:'row',

    }
})