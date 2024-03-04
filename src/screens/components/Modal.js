import { StyleSheet, View, Modal,TouchableOpacity} from 'react-native';
import { Colors } from '../../styles';

export default function ModalCustom({ children, visible, transparent, dismiss, margin }) {
  return (
   
 
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={dismiss}
      statusBarTranslucent
    >
     
      <TouchableOpacity onPress={dismiss}
      activeOpacity={1}
      style={{flex:1}}>
      <View 
        style={styles.container}>
        {children}
      </View>
      </TouchableOpacity>
      
    </Modal>
    
  )
}

const styles = StyleSheet.create({
 container: {
  width: 200,
  // height: 160,
 
  // justifyContent: 'center',
            // alignItems: 'center',
            alignSelf:'flex-end',
  backgroundColor:Colors.WHITE,
  borderRadius:10,
  marginTop:20,
  marginRight:10
 
  
  
    // justifyContent: "center",
    // marginVertical: "100%"
  },
 
});