import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../../../styles';

const Section = (props) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.viwName} onPress={props.onPress}>
            {
                props.icon &&
                <FontAwesome name={props.iconName} size={20} color={props.iconColor || "black"} />
            }
        
        <Text style={[styles.txt,props.lableStyle]}>
            {props.label}
        </Text>

        </TouchableOpacity>
        <View style={styles.viwIcon}>
            {
               props.featureName &&
                <Text style={styles.featureTxt}>
                    {props.featureName }
                </Text>
               
            }
            <View style={{backgroundColor:Colors.GRAY_LIGHT, borderRadius:10}}>
                {
                     props.iconBtn &&
                     <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
                }
          
            </View>
      
        </View>
      
    </View>
  )
}

export default Section

const styles = StyleSheet.create({
    container:{
       paddingHorizontal:10,
       paddingVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
    
    },
    viwName:{
        flexDirection:'row',
          
    },
    txt:{
        marginLeft:10
    },
    viwIcon:{
        flexDirection:'row',
        
    },
    featureTxt:{
        marginRight:8,
        fontSize:11,
        marginTop:3,
        color:Colors.GRAY_DARK
    }
})