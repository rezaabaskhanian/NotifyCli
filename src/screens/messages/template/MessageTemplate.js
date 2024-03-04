import { StyleSheet,View,TouchableOpacity ,FlatList,Image, ToastAndroid} from 'react-native'
import React ,{useState} from 'react'
 import Text from '../../components/Text'
import { FlashList } from "@shopify/flash-list";
import { Colors } from '../../../styles';
import PriceFix from '../../../utils/PriceFix'
import jalaliMoment from 'jalali-moment'
import Clipboard from '@react-native-clipboard/clipboard';
// import Header from '../../components/Header'
const MessageTemplate = (props) => {

    

    const renderItem =React.useCallback(({item})=>(
     
        <View style={styles.container}>
           
            <TouchableOpacity
             style={styles.section} onPress={()=>props.navigation.navigate('MessageTemplateList',{
            userId:props.userId,providerId:item.id,title:item.name
          })}>
                  <Image source={{uri:item?.icon}} style={{width:30,height:30 ,borderRadius :30/2}}/> 
                <View style={{flex:0.8,marginLeft:20}}>
                <Text style={styles.txtStyle}>
                  {item.name}
               </Text>
               
                </View>

                
                </TouchableOpacity>
                
               

                <View style={styles.draweHor}/>
        </View> 
      ))
  return (
    <View >
        {/* <Header search dots title={t('Messages')}  style={{backgroundColor:Colors.BLUE_THEME}} /> */}
      <FlatList
      data={props.data}
      renderItem={renderItem}
   keyExtractor={(item, index) => index.toString()}
   contentContainerStyle={{ paddingBottom: 80 }}
    />
    </View>
  )
}

export default MessageTemplate

const styles = StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:15,
        paddingVertical:15,
    },
    section:{
      
        flexDirection:'row',
        justifyContent:'space-between'
    },
    draweHor:{
        borderBottomColor: Colors.GRAY_DARK,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop:10
      },
})