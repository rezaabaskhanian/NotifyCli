import { StyleSheet,  View,TextInput } from 'react-native'
import React from 'react'
import { Colors,Spacing } from '../../../../styles'
import Text from '../../../components/Text'

const BoxInput = (props) => {
  return (
    <View style={styles.conntainer}>
        <Text style={styles.header}>
            {props.header}
        </Text>

        <View style={[styles.box,props.style]}>
              {props.children}
        </View>

       
    </View>
  )
}

export default BoxInput

const styles = StyleSheet.create({
    conntainer:{
       
        paddingHorizontal:15,
        marginTop:10,  
    },
    header:{
        fontSize:Spacing.SCALE_12,
        color:Colors.GRAY_DARK,
      
    },
    box:{
        borderWidth:0.5,
        boderColor:Colors.GRAY_MEDIUM,
        borderRadius:5,
        // width:328,
        height:40,
        marginTop:10

    }
})