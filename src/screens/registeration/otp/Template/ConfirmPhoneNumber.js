import { StyleSheet,  TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import BoxInput from '../component/BoxInput'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import { Colors ,Spacing} from '../../../../styles'

import {useTranslation} from 'react-i18next';
import i18next,{languageResources} from '../../../../services/lang/i18next'
import languagesList from '../../../../services/lang/languagesList.json'
  import CheckBox from '@react-native-community/checkbox';

import Text from '../../../components/Text'
import TextInput from '../../../components/TextInput'
import showToast from '../../../../utils/Toast';


const ConfirmPhoneNumber = (props) => {
  const [lang,setlang]=useState('English')
  const [showLang,setShowLang]=useState(false)
  const[phone,setPhone] = useState('')
   const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const {t}=useTranslation()
 
    const ShowLangs=()=>{
        setShowLang(!showLang)
       }
       
       const ChangeLang=(lng,txt)=>{
        i18next.changeLanguage(lng)
        setlang(txt)
        setShowLang(false)
       }
       const checkInput =(e)=>{
        if(e=='0' )
{
  showToast({type:'error',txt1:'توجه',txt2:'لطفا صفر را وارد نکنید'})
}else{
  setPhone(e)
  props.getPhone(e)
}
       }

       const SetToggle=(e)=>{
        setToggleCheckBox(e)

       }

    const onChangeCheckBox=(e)=>{
        SetToggle(e) 
        props.setValueToggle(e)
       }

       

  return (
    
    <View style={{flex:1}}>

              <View>
              <BoxInput  header={t('application-languages')} style={styles.boxInput}>
             <View style={styles.viwlang}>
             <Icon name="globe" size={20} color={Colors.GRAY_DARK}/>
             <Text style={styles.txtlang}>
                  {lang}
                          </Text>
             </View>
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
              </View>
              </View>
             
             <View>
             <BoxInput  header={t('phone-number')} style={styles.boxInput}>
             <View style={styles.viwlang}>
             <IconFeather name="phone-call" size={20} color={Colors.GRAY_DARK}/>
             <Text style={styles.txtlang}>
                 {`+98`}
                  </Text>
             </View>
              <TextInput onChangeText={(e)=>checkInput(e)} value={phone} placeholder={''}
                 
              style={{flex:1,marginLeft:10}}
              keyboardType={'numeric'}
               maxLength={10}/>
             <Icon name="arrow-down" size={10} color={Colors.GRAY_DARK} />
              </BoxInput>
             </View>

             <View style={[styles.viwTerms,{flexDirection:lang=='English'? 'row':'row-reverse'}]}>
               <CheckBox  disabled={false} value={toggleCheckBox}   onValueChange={(newValue) =>onChangeCheckBox(newValue)} />
                  <View style={{flex:1,marginLeft:5,marginTop:5,flexDirection:lang=='English'? 'row':'row-reverse'}}>

               
              <Text style={styles.txtSimple}>
                {t('rullesOtp1')}
              </Text>
             <TouchableOpacity style={{flexDirection:'row'}}>
              <Text style={styles.txtBlue}>
                  {t('terms')}
              </Text>
              <Text style={styles.txtSimple}>
                  {t('and')}
              </Text>
              <Text style={styles.txtBlue}>
                  {t('conditions')}
              </Text>
             </TouchableOpacity>
             <Text style={styles.txtSimple}>
                {t('rullesOtp2')}
              </Text>
              </View>
             </View>
             <View style={[styles.viwTerms,{flexDirection:lang=='English'? 'row':'row-reverse',marginTop:1}]}>
             <Text style={[styles.txtSimple,{marginHorizontal:25}]}>
                {t('application')}
              </Text>
             </View>
               
    </View>
  )
}

export default ConfirmPhoneNumber

const styles = StyleSheet.create({
    boxInput:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10
       },
       viwlang:{
         flexDirection:'row'
       },
       txtlang:{
          marginLeft:10
       },
       viwTerms:{
       
        paddingHorizontal:15,
        marginTop:15,
       
       },
       txtSimple:{
           fontSize:Spacing.SCALE_12,
           color:Colors.BLACK
       },
       txtBlue:{
        fontSize:Spacing.SCALE_12,
        color:Colors.BLUE_DARK,
        textDecorationLine:'underline'
       }
       

})