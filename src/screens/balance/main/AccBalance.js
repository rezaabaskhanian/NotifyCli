import { StyleSheet, View } from 'react-native'
import React, { useTransition } from 'react'
import Header from '../../components/Header'
import {useTranslation} from 'react-i18next';
import { Colors } from '../../../styles';
import Slider from '../component/Slider'
const AccBalance = () => {
    const {t} =useTranslation()
    const entires=[
      {
        title:"Item 1",
        text: "Text 1",
        banckNam:'saman'
    },
    {
        title:"Item 2",
        text: "Text 2",
        banckNam:'melat'
    },
    {
        title:"Item 3",
        text: "Text 3",
        banckNam:'sepah'
    },
    {
        title:"Item 4",
        text: "Text 4",
        banckNam:'meli'
    },
    
    ]
  return (
    <View style={{flex:1}}>
        <Header title={t('account-balance')}  style={{backgroundColor:Colors.BLUE_THEME}} dots/>
        <Slider entries={entires}/>
    </View>
  )
}

export default AccBalance

const styles = StyleSheet.create({})