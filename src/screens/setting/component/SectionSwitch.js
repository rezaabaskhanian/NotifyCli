import { StyleSheet, Text, View ,Switch} from 'react-native'
import React from 'react'


import { Colors } from '../../../styles';

const Section = (props) => {
  return (
    <View style={styles.container}>
        <View style={styles.viwName}>
       
        <Text style={styles.txt}>
            {props.label}
        </Text>
        {
            props.desc &&
            <Text style={styles.txtDesc}>
                {props.desc}
            </Text>
        }


        </View>
        <Switch
        trackColor={{false: Colors.GRAY_MEDIUM, true: Colors.GREEN_LIGHT}}
        //  thumbColor={props.isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.toggleSwitch}
        value={props.isEnabled}
      />
    </View>
  )
}

export default Section

const styles = StyleSheet.create({
    container:{
     padding:10,
       flexDirection:'row',
       justifyContent:'space-between',
    
    },
    viwName:{
      width:280
        
    },
    txt:{
        marginLeft:10,
        marginTop:12
    },
    txtDesc:{
        marginLeft:10,
        color:Colors.GRAY_MEDIUM,
        marginTop:5,
        fontSize:12
    }
  
})