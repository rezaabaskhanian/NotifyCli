import { StyleSheet,  View } from 'react-native'
import Text from '../../components/Text'
import React,{useState,useEffect} from 'react'
import Header from '../../components/Header'
import { Colors } from '../../../styles'
import {getRandomColor} from '../../../utils/RandomColor'
import { BankMessage } from '../mockData'
import LineHor from '../../setting/component/LineHor'


const MessageDetail = (props) => {
  const [data,setData]=useState([])
  const {item} = props.route.params;
  const randomHeaderColor = getRandomColor();
useEffect(() => {
  const newDatas= BankMessage.filter((e)=>(
    e.bankName ==item.bankName
  )) 

  setData(newDatas)
}, [])

const route =props.route.name

  return (
    <View style={styles.container}>
       <Header search dots back route={route} logo={item.logo}  style={{backgroundColor:randomHeaderColor}} title={item?.bankName} />
   
      {
        data.map((datas)=>{
          return(
            <>
           <View style={styles.main}>
         <Text style={styles.title}>
        {`${datas.bankName}`}
         </Text>
      <View style={styles.bankViw}>

      </View>
      <Text style={styles.desc}>
        {`${datas.detail}`}
      </Text>
      <LineHor style={{marginVertical:10}}/>
      </View>
      </>
          )
        })
      }
  
    
    </View>
  )
}

export default MessageDetail

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    main:{
      padding:10,
      backgroundColor:Colors.WHITE,
      margin:15,
      borderRadius:8

    },
    title:{
      fontSize:14,
      fontWeight:'bold'
    },
    desc:{
       marginTop:10,
    },
    bankViw:{
      flexDirection:'row',
      marginTop:10
    }
})