import 'react-native-get-random-values'
import { StyleSheet,  View ,ImageBackground,TouchableOpacity} from 'react-native'
import React, { Children ,useState,useEffect} from 'react'
import { Colors ,Spacing} from '../../../styles'
import Tiltels from './Template/Titlels';
import ConfirmPhoneNumber from './Template/ConfirmPhoneNumber';

import {useTranslation} from 'react-i18next';
import ButtonLong from './component/ButtonLong';
import SetOtp from './Template/SetOtp';
import FinalStep from './Template/FinalStep'
import Toast from 'react-native-toast-message';
import showToast from '../../../utils/Toast';
import DeviceInfo from 'react-native-device-info';
import {Authenticate,VerifyPhoneNumber,Finalize} from '../services/Registeration'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Nkeys from 'nkeys.js'

import {ECDHCurve25519keyPairGeneratorService} from '../../../utils/ECDHCurve25519keyPairGeneratorService'

const image = require('../../../assets/images/registre.png');

const Otp = (props) => {
  const {t} = useTranslation();
  const [verifyCodes, setVerifyCode] = useState('')
const [step,useStep]=useState(1)
const [manifest,setManifest]=useState(false)
//fakeOtp
const [fakeOtp,setOtpFake]=useState(null)
const [phone,setPhone]=useState(null)
const [otp,setOtp]=useState(null)
const [token,setToken]=useState(null)
const [nats,setNats] =useState(null)

const [values, setValues] = useState({firstName:'', lastName: '', email: '' ,currency:''});
useEffect(() => {
  const user = Nkeys.createUser();

  //send to server 
  console.log(user.getPublicKey(),'pp')

  // console.log(user.getPublicKey(),new TextDecoder().decode(user.getSeed()),'pp')
  setNats(user.getPublicKey())
  AsyncStorage.setItem('publicNats',user.getPublicKey())
}, [])




const generatePublicKey = async (phone) => {
  try {
    const publicKey = new ECDHCurve25519keyPairGeneratorService(phone).publicKey;
    await AsyncStorage.setItem('publicKey', publicKey);
  } catch (error) {
    console.error('Error generating public key:', error);
  }
};

const getStoredPublicKey = async () => {
  try {
    const publicKey = await AsyncStorage.getItem('publicKey');
    return publicKey;
  } catch (error) {
    console.error('Error fetching stored public key:', error);
    return null;
  }
};

const NextStep = async ()=>{
  try {
    if (!manifest) {

      showToast({type:'error',txt1:'توجه',txt2:'لطفا قوانین را تایید کنید'})
      return;
    }
   
    let deviceModel = DeviceInfo.getBrand();
    let operatingSystem = DeviceInfo.getSystemName();
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    let newFcm = fcmToken.replace(":", "");
    // let publicKey = '42d2b60a29ea3c0b20ebfdbf99eabedbee4afefdc4f8bd557c204e57491d0df5';
  
    if (phone.length < 10) {
        showToast({type: 'error', txt1: 'توجه', txt2: 'شماره تلفن صحیح نیست'});
        return; 
    }

    let publicKey = await getStoredPublicKey();

    if (!publicKey) {
      await generatePublicKey(phone);
      publicKey = await getStoredPublicKey();
    }

   

    const response = await Authenticate(phone, publicKey, newFcm, operatingSystem, deviceModel);
    const responseObject = response;
    console.log(responseObject.otp, ' Authenticate ');
     setOtp(responseObject?.otp);
     setToken(responseObject?.token)

     useStep(step+1)
} catch (error) {
    console.error('Error occurred:', error);
    // Handle error
}
}



const VerifyOtpStep =async ()=>{

  
  
  try {
    const response = await VerifyPhoneNumber(phone, otp, token,nats);
    const responseObject =response;
    console.log(responseObject?.token?.idToken, 'Response from Verify function');
    // console.log(responseObject.data.token.idToken,responseObject.data.token)
    if (responseObject?.token?.idToken){
      AsyncStorage.setItem('token',responseObject.token.idToken)
      AsyncStorage.setItem('tokenNats',responseObject.token.natsToken)
      props.navigation.navigate('Home')
    }
    else{
      useStep(step+1)
    }
    
} catch (error) {
    console.error('Error occurred:', error);
    // Handle error
}
}

const FinalOtpStep = async()=>{
  try {
    const response = await Finalize(phone, token,nats,values);
    const responseObject = response.data;
    console.log(responseObject.token, 'Response from Finalize function');
  
    AsyncStorage.setItem('token',responseObject.token.idToken)
    AsyncStorage.setItem('tokenNats',responseObject.token.natsToken)

    props.navigation.navigate('Home')
   
} catch (error) {
    console.error('Error occurred:', error);
}

}

const GetPhone=(e)=>{
  setPhone(e)
}

const   changeStep=()=>{
     step ==1 ? NextStep()   :
    step ==2   ? VerifyOtpStep () :
    step ==3 ? FinalOtpStep() : null
  //  showToast({type:'error',txt1:'توجه',txt2:'کد otp صحیح نیست'})

  }

  
  function GetVerify(e){
     setVerifyCode(Object.values(e).join('') || undefined)
}
const GetValueToggle=(e)=>{
  setManifest(e)
}

SaveValueStorage=(e)=>{
  console.log(e,'valueStorage')
  setValues({
    ...values,
    ...e
  });

}

  return (
    <View style={styles.container}>
     <ImageBackground source={image}  style={[styles.imgBack ,{flex:step==3  ? 0.6 : 1 }]}>
     <Tiltels title={step==1 ? t('welcome-to-notify') : step==2 ?  t('otp-code-sent') :  t('final-step')}
      
     desc={step==1 ? t('desc-notify')  : step ==2 ?  t('desc-otp-send') : t('desc-final-step')  }/>
     
         </ImageBackground>
         <Toast topOffset={80}/>
          <View style={styles.box}>
         
          <View style={styles.lineHead}/>
          {
            step==1 ?<ConfirmPhoneNumber setValueToggle={GetValueToggle} getPhone={GetPhone}/> : step==2 ?
             <SetOtp otpTemporary={otp}  onChangeVerify={GetVerify} fake ={fakeOtp}/> : <FinalStep saveValue={SaveValueStorage} />
             

              //  <FinalStep saveValue={SaveValueStorage} />
             
          }
               <ButtonLong  text={step==1 ? t('confirm-number-phone') : step==2 ?  t('confirm-otp-code') : t('confirm') } onPress={()=>changeStep()}/>
          </View>

    </View>
  )
}

export default Otp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.YELLOW_DARK
 
  },
  imgBack:{
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
    paddingHorizontal:15,
   
  },
  title:{
    fontSize:Spacing.SCALE_16,
    fontWeight:'bold',
  },
  box:{
    flex:1,
    backgroundColor:Colors.WHITE,
    borderTopLeftRadius:16,
    borderTopRightRadius:16,
    justifyContent:'space-between'
  },
  lineHead:{
    borderWidth: 1,
        borderColor:Colors.GRAY_DARK,
        alignSelf:'center',
        width:70,
        marginTop:13
  },
  
 
});


