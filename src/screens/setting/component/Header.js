import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../styles'

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        paddingVertical:10
    },
    title:{
      color:Colors.GRAY_DARK
    }

})