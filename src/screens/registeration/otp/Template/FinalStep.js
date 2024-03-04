import { StyleSheet,View } from 'react-native'
import React,{useState} from 'react'
import Text from '../../../components/Text'
import {useTranslation} from 'react-i18next';
import BoxInput from '../component/BoxInput'
import TextInput from '../../../components/TextInput'
const FinalStep = (props) => {
    const {t} = useTranslation();
    const [values, setValues] = useState({firstName:'', lastName: '', email: '' ,currency:''});
    const []=useState(t('iranian-riyal'))
    const onChange=(name, value)=>{
        setValues({
          ...values,
          [name]: value,
        });
        props.saveValue({ ...values,
          [name]: value})
      }
  return (
    <View style={styles.container}>
         <BoxInput  header={t('first-name')} style={styles.boxInput}>
              <TextInput  onChangeText={(text)=>onChange('firstName',text)} placeholder={t('your-first-name')}
               maxLength={40}/>
              </BoxInput>
              <BoxInput  header={t('last-name')} style={styles.boxInput}>
              <TextInput  onChangeText={(text)=>onChange('lastName',text)} placeholder={t('your-last-name')}
               maxLength={40}/>
              </BoxInput>
              <BoxInput  header={t('email')} style={styles.boxInput}>
              <TextInput  onChangeText={(text)=>onChange('email',text)} placeholder={t('E-email')}
               maxLength={40}/>
              </BoxInput>
              {/* <BoxInput  header={t('email')} style={styles.boxInput}>
              <TextInput  onChangeText={(text)=>onChange('email',text)} placeholder={t('E-email')}
               maxLength={40}/>
              </BoxInput> */}

            
              {/* <BoxInput  header={t('iranian-riyal')} style={styles.boxInput}>
             <Text style={styles.txtlang}>
                  {lang}
                          </Text>
             <Icon name="arrow-down" size={10} color={Colors.GRAY_DARK} onPress={()=>ShowLangs()}/>
              </BoxInput>
              <View style={{marginTop:20,alignItems:'flex-start'}}>
              {showLang &&
                 Object.keys(languageResources).map((item,index)=>(
                  <TouchableOpacity key={index} onPress={()=>{ChangeLang(item,languagesList[item].nativeName)}} style={{marginTop:10}}>
              <Text style={styles.txtlang}>
                  {languagesList[item].nativeName}
                          </Text>
                  </TouchableOpacity>
                 ))
             }
              </View> */}
             
     
     
    </View>
  )
}

export default FinalStep

const styles = StyleSheet.create({

    container:{
        flex:1,

    },
    boxInput:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        
       },
})