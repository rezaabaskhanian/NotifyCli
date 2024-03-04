import { StyleSheet,  View,Dimensions } from 'react-native'
import  Text  from '../../components/Text'
import React from 'react'
const Width =Dimensions.get('window').width

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../styles';
const PickerSerchSection = (props) => {
    function showPicker(){
        console.log('picker')
    }
  return (
    <View style={styles.container}>
        <Text style={styles.txt}>
            {props.text}
        </Text>
        <Icon name="keyboard-arrow-down" size={15} color={Colors.GRAY_DARK} onPress={showPicker}/>
     
    </View>
  )
}

export default PickerSerchSection

const styles = StyleSheet.create({
    container:{
        width:Width-30,
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:0.5,
        borderColor:Colors.GRAY_MEDIUM,
        backgroundColor:Colors.WHITE,
        borderRadius:10,
        paddingHorizontal:10,
        marginTop:15

    },
    txt:{
        color:Colors.GRAY_MEDIUM
    }
})