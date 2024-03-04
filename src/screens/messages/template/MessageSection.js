import { StyleSheet,View,TouchableOpacity ,FlatList,Image, ToastAndroid} from 'react-native'
import React ,{useState} from 'react'
 import Text from '../../components/Text'
import { FlashList } from "@shopify/flash-list";
import { Colors } from '../../../styles';
import PriceFix from '../../../utils/PriceFix'
import jalaliMoment from 'jalali-moment'
import Clipboard from '@react-native-clipboard/clipboard';
const MessageSection = (props) => {
  const [showExpand,setShowExpand] =useState(false)
  const [idExpand,setIdExpand] =useState(null)

  // for otp fake 
//   const getOtp=(inputString)=>{
//     const otpRegex = /\b\d{6}\b/; 
//   const match = inputString.match(otpRegex);
//   if (match) {
//     return match[0]; // Return the matched OTP
//   } else {
//     return null; // Return null if no OTP is found
//   }
// }

//for api fake
// function getWithDraw(inputString) {
//   const numberRegex = /\d+/g;
//   const matches = inputString.match(numberRegex);
//   if (matches) {
//     return matches.map(Number); 
//   } else {
//     return null;
//   }
// }

const openExpand=(id,catName)=>{
let status = catName == 'WithDrawe' || catName == 'Progress'  ? true : false
   setShowExpand(showExpand ? !showExpand : status)
  setIdExpand(id)
 
}

const copyToClipboard = (data) => {
  Clipboard.setString(data);
  ToastAndroid.showWithGravity(
    'Save in CLipBord',
    ToastAndroid.SHORT,
    ToastAndroid.TOP,
  );
};
  
      const renderItem =React.useCallback(({item})=>(
     
        <View style={styles.container}>
           
            <TouchableOpacity
              // delayLongPress={500} 
            // onLongPress={()=>openExpand(item.id,item.categoryName)}
             style={styles.section} onPress={()=>props.navigation.navigate('MessageDetail',{
            item: item,
          })}>
                {/* <Image source={item?.logo} style={{width:30,height:30}}/> */}
                <View style={{flex:0.8,marginLeft:20}}>
                <Text style={styles.txtStyle}>
                  {item.name}
               </Text>
               <Text style={styles.txtsub}>
                  {item.templateDecode}
               </Text>
                </View>

                <View>
                <Text style={styles.txtDate}>
                  {jalaliMoment(item.publishedAt).locale('fa').format(' jMMMM  HH:mm')}
               </Text>
                
               {
                item.dataCodeType?.OTP   ?
                 <TouchableOpacity style={styles.otpViw} onLongPress={()=>{copyToClipboard(item.dataCodeType?.OTP)}}>
                 <Text style={{color:Colors.BLUE_THEME}}>
                  {`${item.dataCodeType?.OTP}`}
                {/* {`${getOtp(item.detail)}`} */}
                </Text>
                 </TouchableOpacity>

                 :
                 item.dataCodeType?.AMOUNT   ?
                 <View style={styles.WithOneViw}>

                 <TouchableOpacity style={styles.tochOne}>
                 <Text style={{color:Colors.GREEN_LIGHT,fontSize:12}}>
                 {`${PriceFix(item.dataCodeType?.AMOUNT)}`}
                {/* {`$ ${getWithDraw(item.detail)[0]}`} */}
                </Text>
                </TouchableOpacity>
                 {/* <TouchableOpacity style={styles.tochTwo}>
                 <Text style={{color:Colors.RED,fontSize:12}}>
                 {`$ ${getWithDraw(item.detail)[1]}`}
                </Text>
                 </TouchableOpacity>
                  */}
                 </View>
                 :
                 item.dataCodeType?.LINK   ?
                 <TouchableOpacity style={styles.otpViw}>
                 <Text style={{color:Colors.BLUE_THEME}}>
                  {/* {`${item.dataCodeType?.LINK}`} */}
                  {`لینک`}
                {/* {`${getOtp(item.detail)}`} */}
                </Text>
                 </TouchableOpacity>
                 :
                 null
               }

                </View>
                </TouchableOpacity>
                
               {
                
                showExpand  && idExpand ===item.id  ?

                <View style={styles.expViw}>
                  <Text style={styles.txtStyle}>
               {`${item.detail}`}
                  </Text>
                  </View>
                  :
                  null
               }

                <View style={styles.draweHor}/>
        </View> 
      ))

      
      // const navigation = useNavigation();  
  return (
  <View style={{ padding:3}}>
    
    {/* {console.log(props.data)} */}
      <FlatList
      data={props.data}
      renderItem={renderItem}
   keyExtractor={(item, index) => index.toString()}
   contentContainerStyle={{ paddingBottom: 80 }}
    />
  </View>
    
  )
}

export default MessageSection

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
    txtStyle:{

    },
    txtsub:{
      fontSize:12,
      color:Colors.GRAY_DARK
    },
    txtDate:{
        fontSize:12,
      color:Colors.GRAY_DARK,
      alignSelf:'flex-end'
    },
    draweHor:{
        borderBottomColor: Colors.GRAY_DARK,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop:10
      },
      otpViw:{
        borderWidth:1,
        borderColor:Colors.BLUE_THEME,
        padding:5,
        marginTop:5,
        borderRadius:15,
        alignItems:"center",
        marginTop:10,
        width:70

      },
      WithOneViw:{
        justifyContent:'space-between',
        flexDirection:'row',
   
      },
      tochOne:{
        borderWidth:1,
        borderColor:Colors.GREEN_LIGHT,
        padding:5,
        marginTop:5,
        borderRadius:15,
        alignItems:"center",
        marginTop:10,
        
      },
      tochTwo:{
        borderWidth:1,
        borderColor:Colors.RED,
        padding:5,
        marginTop:5,
        borderRadius:15,
        alignItems:"center",
        marginTop:10,
        marginLeft:5
      },
      expViw : {
        marginTop:10
      }

})