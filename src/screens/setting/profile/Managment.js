import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../component/Header'
import LineHor from '../component/LineHor'
import { Colors } from '../../../styles'
import Section from '../component/Section'

const Managment = () => {
  return (
    <View style={styles.container}>
         <Header title={'Managment'}/>
         <View style={styles.viwSection}>
     <Section label={'Accounts'} iconName={'person'} icon iconBtn />
     <LineHor/>
     <Section label={'Cards'} iconName={'credit-card'}  icon iconBtn />
     <LineHor/>
    </View>
      
    </View>
  )
}

export default Managment

const styles = StyleSheet.create({

    container:{
      
    },
    viwSection:{ 
      backgroundColor:Colors.WHITE,
      borderRadius:8
  }
})