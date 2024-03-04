import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'
import React ,{useState} from 'react'
import Header from '../../components/Header'
import { Colors } from '../../../styles'
import SectionMessage from '../component/SectionMessage'
import HeaderTitle from '../component/Header'

import  AntDesign  from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import AddToList from '../component/AddToList'
import Buttons from '../../components/Buttons'
import AsyncStorage from '@react-native-async-storage/async-storage';

import showToast from '../../../utils/Toast';

const CreateNewFolder = () => {
    const navigation = useNavigation();

    const [folderName,setFolderName]=useState('folderName')
    const [showFolders,setShowFolders]=useState(false)
    const [text, onChangeText] = useState('');
    const [objFolder,setObjFolder]=useState({})

    const category =[{id:1,name:"Banking"},{id : 2 ,name :"Store"},{id : 3 ,name :"Progress"},{id : 4 ,name :"WithDrawe"}]
    const AddFolder=async ()=>{

        const folder = objFolder
    

        try {
                const existingArrayString = await AsyncStorage.getItem('CategoryFolder');
                
                let existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];
                existingArray.push(folder);
                await AsyncStorage.setItem('CategoryFolder', JSON.stringify(existingArray));
                
                  
                setTimeout(() => {
                    showToast({type:'success',txt1:'ok',txt2:'add to category'})
                    navigation.goBack()
                }, 1500);
            
          } catch (e) {
            console.log('catch')
           
          }
    }
 const saveFolder=(e)=>{
    setFolderName(e.name)
    setShowFolders(false)
    setObjFolder(e)
     

 }
  return (
    <View style={styles.container}>
    <Header style={{backgroundColor:Colors.BLUE_THEME}} title={'Create a new floder'} back/>
    <View style={styles.main}>
        <HeaderTitle title={'Base details'} />
        {/* <View style={styles.inputViw}>
            <Text style={styles.inputTxt}>
                {`Folder Name`}
            </Text>
            <TextInput style={styles.inpt}  onChangeText={onChangeText}
                 value={text}/>
        </View> */}
         <View style={styles.inputViw}>
            <Text style={styles.inputTxt}>
                {`Folder Name`}
            </Text>

            <TouchableOpacity style={styles.inpt} onPress={()=>setShowFolders(true)}>
                <Text style={{marginLeft:10}}>
                    {`${folderName}`}
                </Text>
                <AntDesign name="down" size={14} color="black" style={{marginRight:5}}/>
            </TouchableOpacity>
           
            {
                showFolders &&
                category.map((data)=>{
                    return(
                        <View key={data.id}>
                        <TouchableOpacity onPress={()=>saveFolder(data)} style={{marginTop:5,marginLeft:5}}>
                            <Text>
                                {data.name}
                            </Text>
                        </TouchableOpacity>
                        </View>
                    )
                  
                })

            }
           
        </View>
    </View>
    <View style={styles.includViw}>
        <HeaderTitle title={'include provider'} />
            <AddToList onPress={()=>console.log('add to list')}/>
        </View>

        <View style={styles.includViw}>
        <HeaderTitle title={'excluded provider'} />
            <AddToList onPress={()=>console.log('add to list')}/>
        </View>

   <Buttons oneTitle={'create folder'} onPress={AddFolder} style={{marginBottom:10}}/>
   
    </View>
  )
}

export default CreateNewFolder

const styles = StyleSheet.create({
container :{
    flex:1,
   
},
main:{
    marginTop:10,
    marginHorizontal:10,
    padding:13,
    backgroundColor:Colors.WHITE,
    borderRadius:8
},
inputViw:{
    marginTop:10
},
inputTxt:{
   fontSize:14,
   
},
inpt:{
    marginTop:10,
    borderRadius:5,
    borderColor:Colors.GRAY_MEDIUM,
    borderWidth:0.5,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:5
},
includViw:{
    paddingVertical:15,
    marginHorizontal:10,
    marginTop:10,
    paddingHorizontal:10,
    backgroundColor:Colors.WHITE,
    borderRadius:8
}
})