import { TextInput,StyleSheet} from 'react-native'
import React from 'react'

const Input = (props) => {
  return (
    <TextInput {...props}>
     {props.children}
    </TextInput>
  )
}
const styles=StyleSheet.create({

})

export default Input