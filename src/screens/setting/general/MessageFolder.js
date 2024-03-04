import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React,{useState ,useEffect} from 'react'
import Header from '../../components/Header'
import { Colors } from '../../../styles'
import SectionMessage from '../component/SectionMessage'
import HeaderTitle from '../component/Header'

import  AntDesign  from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LineHor from '../component/LineHor'
const MessageFolder = (props) => {
  const [folderCategory ,getFolderCategory]= useState()
    
  const fetchData = async () => {
    try {
      const existingArrayString = await AsyncStorage.getItem('CategoryFolder');
      let existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];
      getFolderCategory(existingArray )
  
    } catch (e) {
      console.error('Error:', e.message);
    }
  };
  useEffect(() => {
    fetchData(); // Call the async function
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchData(); // Fetch data again when the component is focused (refresh)
    });

    return unsubscribe;
  }, [props.navigation]);
  
    
  return (
    <View style={styles.container}>
    
     <Header  style={{backgroundColor:Colors.BLUE_THEME}} title={'MessageFolders'} back/>

     <View style={styles.messageViw}>
        <HeaderTitle title={`Folder`}/>
        <TouchableOpacity style={styles.createViw} onPress={()=>props.navigation.navigate('CreateFolder')}>
        <AntDesign name="pluscircleo" size={20} color={Colors.BLUE_THEME}  />

        <Text style={styles.creatTxt}>
            {`Create new folder`}
        </Text>

        </TouchableOpacity>
      
       {
        folderCategory?.map((data)=>{
          return(
         <>
             <View style={{marginTop:20}} key={data.id}>
           <LineHor/>
            <SectionMessage data={data}/>
            </View>
            </>
        
          )
        })
       }

    
     </View>
    </View>
  )
}

export default MessageFolder

const styles = StyleSheet.create({
    container:{
     
    },
    messageViw:{
  
   backgroundColor:Colors.WHITE,
   padding:13,
   borderRadius:8
    },
    createViw:{
        flexDirection:'row',
        marginTop:8
    },
    creatTxt:{
        color:Colors.BLUE_THEME,
        marginLeft:8

    }
})