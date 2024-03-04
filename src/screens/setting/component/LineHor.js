import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../styles'

const LineHor = (props) => {
  return (
    <View  style={{
        borderBottomColor:Colors.GRAY_MEDIUM,
        borderBottomWidth:0.3,
        marginHorizontal:10,
        ...props.style
      }}/>
    
  )
}

export default LineHor

const styles = StyleSheet.create({})