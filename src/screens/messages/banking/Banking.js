import { StyleSheet,View } from 'react-native'
import React,{useEffect,useState} from 'react'
import  Text  from  '../../components/Text'
import {BankMessage} from '../mockData'
import Section from '../template/MessageSection'
import SectionProvider from '../template/MessageTemplate'

const Banking = (props) => {
  return (
           
    // <Section data={props.data} navigation={props.navigation}/>
        <SectionProvider data={props.data} navigation={props.navigation} userId={props.userId}/>   
        
  )
}

export default Banking

const styles = StyleSheet.create({})