import { StyleSheet, View,Dimensions,Image ,StatusBar} from 'react-native'
import React,{useState} from 'react'
import Text from '../components/Text'
import { Colors } from '../../styles'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import  SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'

import { useNavigation } from '@react-navigation/native';
import Modal  from  './Modal'
import { TouchableOpacity } from 'react-native';
const Header = (props) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const [show,setShow]=useState(false)
  const [modalMessage,setShowMessage]=useState(false)

  function showModal (){
       setShow(!show)
  }
  function showModalMessage (){
    setShowMessage(!modalMessage)
}
return (
    <View style={[{...styles.container,width:windowWidth},props.style]}> 
       <StatusBar  hidden={true}/>
     <View style={{flexDirection:'row',alignItems:'center'}}>
     {props.back?
      <MaterialIcons onPress={()=>navigation.goBack()} name="keyboard-backspace" size={24} color="white" style={{marginRight:25}}/>
      :
      null
      }
      {props.logo?
      <Image source={props.logo} style={{marginRight:10 ,width:30,height:30}} />
      :
      null
      }

{props.Image?
      <Image source={{uri:props.Image}} style={{marginRight:10 ,width:30,height:30,borderRadius:30/2}} />
      :
      null
      }
     <Text style={styles.title}>
      {props.title}
      </Text>
      
     </View>
      <View style={{flexDirection:'row' ,}}>
        {
          props.search ?
          <MaterialIcons name="search" size={24} color="white" style={{marginRight:15}} onPress={()=>navigation.navigate('Search')}/>
          :
          null
        }

         {
          props.dots ?
          <MaterialCommunityIcons name="dots-vertical" size={24} color="white"  onPress={()=>props.route=='MessageDetail' ? showModalMessage() : showModal()} />
          :
          null
        }
    
    <Modal  visible={show} dismiss={showModal}>
      <View style={styles.modalViw}>
       <TouchableOpacity style={styles.itemModal} >
       <Octicons name="mute" size={24} color="black" />
          <Text style={{marginLeft:10,marginTop:3}}>
            {`mute forr all `}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemModal} >
        <AntDesign name="swap" size={24} color="black" style={{transform: 'rotate(90deg)'}}/>
          <Text style={{marginLeft:10,marginTop:3}}>
            {`manage categories `}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemModal} >
        <SimpleLineIcons name="flag" size={24} color="black" style={{transform: 'rotate(20deg)'}}/>
          <Text style={{marginLeft:10,marginTop:3}}>
            {`Report issue `}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemModal} >
        <Feather name="square" size={24} color="black" />
          <Text style={{marginLeft:10,marginTop:3}}>
            {`Banking Details `}
          </Text>
        </TouchableOpacity>
      </View>
      </Modal>

      <Modal  visible={modalMessage} dismiss={showModalMessage}>
      <View style={styles.modalViwMessage}>
       <TouchableOpacity style={styles.itemModal} >
       <Octicons name="unmute" size={24} color="black" />
          <Text style={{marginLeft:10,marginTop:3}}>
            {`unmute `}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.itemModal} >
       <Octicons name="mute" size={24} color="black" />
          <Text style={{marginLeft:10,marginTop:3}}>
            {`mute `}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemModal} >
        <Feather name="star" size={24} color="black" />
          <Text style={{marginLeft:10,marginTop:3}}>
            {`stared message `}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemModal} >
        <MaterialCommunityIcons name="timer-sand" size={24} color="black" />
          <Text style={{marginLeft:10,marginTop:3}}>
            {`expired message`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemModal} >
        <AntDesign name="CodeSandbox" size={24} color="black" />
          <Text style={{marginLeft:10,marginTop:3}}>
            {`Archved message `}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemModal} >
        <Octicons name="mute" size={24} color="black" />
          <Text style={{marginLeft:10,marginTop:3}}>
            {`clear history `}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemModal} >
        <AntDesign name="minuscircleo" size={24} color={Colors.RED} />
          <Text style={{marginLeft:10,marginTop:3,color:Colors.RED}}>
            {`unfollow `}
          </Text>
        </TouchableOpacity>
      </View>
      </Modal>
     
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({

    container :{
      flexDirection:'row',
       
       height :48,
       alignItems:'center',
       justifyContent:'space-between',
       paddingHorizontal:10
   
    },
    title:{
      fontWeight:'bold',
       color:'white'
    },
    modalViw:{
     paddingVertical:5
    },
    modalViwMessage:{
      paddingVertical:5,
      
      
    },
    itemModal:{
      marginTop:10,
      flexDirection:'row',
      justifyContent:'flex-start',
      paddingHorizontal:10
    }
})