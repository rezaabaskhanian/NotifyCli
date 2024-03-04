import { StyleSheet,  View ,TouchableOpacity,StatusBar} from 'react-native'
import React ,{useCallback,useEffect,useState}from 'react'
import { Colors } from '../../../styles'
import Tiltels from './Tiltels'
import Buttons from '../../components/Buttons'
import Step from './Step'
import Text from '../../components/Text'

//use memo and callback

const Onbording = (props) => {
  const [step,useStep]=useState('one')
  return (

    <View style={styles.container}>
      <StatusBar hidden={true} />
     {/* <StatusBar style="auto" /> */}
      <View style={styles.skipeViw}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Home')} style={{marginTop:10}}>
        <Text style={{textAlign:'right'}}>
           {`skipe`}
        </Text>
        </TouchableOpacity>
      </View>

     <Tiltels oneTitle={'oneTitle'} twoTitle={'onBoadingTitle'} threeTitle={'descriptionTitle'} fourTitle={'oneTitle'}/>
     <Step step={step}/>
     <Buttons oneTitle={'Start using Notify'} onPress={()=>props.navigation.navigate('OtpScreen')}/>

    </View>
   
  )
}

export default Onbording

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingVertical:10

  },
  skipeViw:{
    

    // flexDirection:'row',
    // justifyContent:'space-between'

  }
})