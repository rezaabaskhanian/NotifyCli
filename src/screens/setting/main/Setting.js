import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { Colors } from '../../../styles'
import Managment from '../profile/Managment'
import General from '../general/General'
import Help from '../help/Help'
const Main = () => {
  return (
    <ScrollView style={styles.container}>
       <Header  style={{backgroundColor:Colors.BLUE_THEME}} title={'Setting'} />
     
      <View style={styles.section}>
       <Managment/>
       <General/>
       <Help/>

      </View>
    </ScrollView>
  )
}

export default Main

const styles = StyleSheet.create({
  container:{
      flex:1,
      // backgroundColor:Colors.WHITE
  },
  section :{
     paddingHorizontal:10,

  }
})