import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import Header from '../component/Header'
import { Colors } from '../../../styles'
import Section from '../component/Section'
import LineHor from '../component/LineHor'
import SectionSwitch from '../component/SectionSwitch'
import { useNavigation } from '@react-navigation/native';
const General = (props) => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState({switchOne:false,switchTwo:false});
    const handleToggle = (switchName) => {
        setIsEnabled((prevState) => ({
          ...prevState,
          [switchName]: !prevState[switchName],
        }));
    
        // Add any additional logic you want to perform when a switch is toggled
      };
  return (
    <View style={styles.container}>
    <Header title={'General settings'}/>
    <View style={styles.viwSection}>
     <Section label={'Messages Folders'} iconName={'folder-open-o'} onPress={()=>navigation.navigate('MessageFolder')}icon iconBtn />
     <LineHor/>
     <Section label={'Language'} iconName={'globe'} featureName={'English'} icon iconBtn />
     <LineHor/>
     <Section label={'App theme'} iconName={'circle-thin'} featureName={'Light'} icon iconBtn />
     <LineHor/>
     <SectionSwitch label={'Show expired message by default'}  isEnabled={isEnabled.switchOne} toggleSwitch={()=>handleToggle('switchOne') }/>
     <LineHor/>
     <SectionSwitch label={'Display account balance is messages'}
        desc={`Your account remaining balance amount will always by visible in the banking messages`}
        isEnabled={isEnabled.switchTwo} toggleSwitch={()=>handleToggle('switchTwo') }/>
    </View>

    </View>
  )
}

export default General

const styles = StyleSheet.create({
    container :{
     
    },
    viwSection:{
       
        backgroundColor:Colors.WHITE,
        borderRadius:8
    }

})