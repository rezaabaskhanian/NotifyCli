import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../component/Header'
import LineHor from '../component/LineHor'
import { Colors } from '../../../styles'
import Section from '../component/Section'

const Help = () => {

  return (
    <View style={styles.container}>
     <Header title={'Help'}/>
     <View style={styles.viwSection}>
     <Section label={'Help and support'} iconName={'question'} icon iconBtn />
     <LineHor/>
     <Section label={'Rate this program'} iconName={'star'}  icon iconBtn />
     <LineHor/>
     <Section label={'About us'} iconName={'exclamation'} icon iconBtn />
     <LineHor/>
     <Section label={'Privacy policy'}  />
     <LineHor/>
     <Section label={'Terms of service'}  />
     <LineHor/>
     <Section label={'Logut'}  iconName={'door'}  lableStyle={{color:Colors.RED}} iconColor={Colors.RED} icon/>
     </View>
      
    </View>
  )
}

export default Help

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    viwSection:{ 
        backgroundColor:Colors.WHITE,
        borderRadius:8
    }
})