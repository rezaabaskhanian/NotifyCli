import React from 'react'
import {Text,StyleSheet} from 'react-native'

 const Txt=(props)=> {
  return (
    <Text style={props.style}>
       {props.children}
    </Text>
 
  )
}
const styles=StyleSheet.create({

})

export default Txt;