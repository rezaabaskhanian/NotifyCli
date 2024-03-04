import { View ,StyleSheet,TouchableOpacity ,ActivityIndicator} from 'react-native'
import React,{useEffect,useState} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Banking from '../banking/Banking';
import Notifications from '../Notifications/Notifications';
import Text from '../../components/Text'
import { Colors } from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';



function MyTabs(props) {
   const [categoryTab , setCategory]=useState(null)
    const [borderLine,setBorder]=useState('All')

    function changeTab(e) {
       props.onPress(e)
       setBorder(e)
    } 
   
  return (
    props.tabs ==null ?
      <ActivityIndicator/>

        :
   <View style={styles.container}>
<TouchableOpacity onPress={()=>changeTab('All')} style={{...styles.eachTab,borderBottomColor:borderLine =='All' ? 'white' :'transparent'} }>
 <Text style={{fontWeight:borderLine =='All' ? 'bold' :'100',color:'white',}}>
        {'All'}
    </Text>
 </TouchableOpacity>
    {
        props.tabs?.map((data)=>{
            return(
                <TouchableOpacity key={data.id} onPress={()=>changeTab(data.name)} style={{...styles.eachTab,borderBottomColor:borderLine ==data.name ? 'white' :'transparent'} }>
                <Text style={{fontWeight:borderLine ==data.name ? 'bold' :'100',color:'white'}}>
                    {`${data.name}`}
                </Text>
             </TouchableOpacity>
            )
           
           
        })
    }

   </View>

   

  );
}

const styles=StyleSheet.create({
    container:{
        // flex:1,
        flexDirection:'row',
        // justifyContent:'space-between',
        // alignItems:'center',
        paddingHorizontal:10,
        backgroundColor:Colors.BLUE_THEME,
        height:40,
        flexWrap:'wrap',
      
      
    },
    eachTab:{
        flex: 1,
        borderBottomWidth:1.5,
        marginTop:10,
        alignItems:'center',
        maxWidth:100
    
       
        
    }
})

export default MyTabs
