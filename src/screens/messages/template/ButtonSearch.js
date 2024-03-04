import { StyleSheet,  View,Dimensions ,TouchableOpacity} from 'react-native'
import  Text  from '../../components/Text'
import React from 'react'
const Width =Dimensions.get('window').width

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../../styles';

const ButtonSearch = (props) => {
    function showPicker(){
        console.log('serach')
    }
  return (
    <TouchableOpacity style={styles.container}>
         
        <Text style={styles.txtSerach}>
            {`Search`}
        </Text>
        <Icon name="search" size={20} color={Colors.WHITE} onPress={showPicker}/>
    
    </TouchableOpacity>
  )
}

export default ButtonSearch

const styles = StyleSheet.create({
    container:{
        width:Width-30,
        height:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:0.5,
        borderColor:Colors.BLUE_DARK,
        backgroundColor:Colors.BLUE_DARK,
        borderRadius:10,
        paddingHorizontal:10,
        marginTop:15
    },
    txtSerach:{
         color:Colors.WHITE,
         marginLeft:5

    }
})