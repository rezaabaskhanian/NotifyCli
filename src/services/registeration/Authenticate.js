import Axios from "axios";
const BaseUrl = ''
 // Axios.defaults.baseURL = BaseUrl
export const Authenticate=async(phoneNumber,publicKey,deviceId,operatingSystem,deviceModel)=> {
    
   
    // const response=await  Axios.post('/Users/Authenticate',
         
    //  {
    //     phoneNumber:phoneNumber,
    //     publicKey:publicKey,
    //     deviceId:deviceId,
    //     operatingSystem :operatingSystem,
    //     deviceModel : deviceModel
    // })
}


export const VerifyPhoneNumber=async(phoneNumber,otp,token)=> {
    
    
    // const response=await  Axios.post('/Users/VerifyPhoneNumber',
         
    //  {
    //     phoneNumber:phoneNumber,
    //     otp:otp,
    //     token : token
    // })
}

export const Finalize=async(phoneNumber,otp,token)=> {
    
    
    // const response=await  Axios.post('https://dev.vitalize.dev/api/v1/auth/auth_req',
         
    //  {
    //     mobile:mobileNumber,
    //     recaptcha_token:captcha
    // })
}

export const RefreshTokens=async()=> {
    
   
    // const response=await  Axios.post('https://dev.vitalize.dev/api/v1/auth/auth_req',
         
    //  {
    //     mobile:mobileNumber,
    //     recaptcha_token:captcha
    // })
}