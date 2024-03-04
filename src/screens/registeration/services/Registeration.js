import Axios from "axios";
// const BaseUrl = 'http://185.162.43.150:1859'
  // const BaseUrl = 'http://192.168.3.201:3000'
  const BaseUrl =  'http://185.162.43.150:3002';

 Axios.defaults.baseURL = BaseUrl
 export const Authenticate = async (phoneNumber, publicKey, deviceId, operatingSystem, deviceModel) => {
  console.log(phoneNumber, publicKey, deviceId, operatingSystem, deviceModel,'phoneNumber, publicKey, deviceId, operatingSystem, deviceModel')


      let data = JSON.stringify({
        "phoneNumber": `0098${phoneNumber}`,
        // use phoneNumber now as publicky
        "publicKey":publicKey,
        "fcmToken" : deviceId,
        "operatingSystem": operatingSystem.toUpperCase(),
        "deviceModel": deviceModel
      });
      
      let config = {
        method: 'post',
        redirect: "follow",
      
        headers: { 
          'Content-Type': 'application/json'
        },
        body : data
      };
      
  // const res =await    Axios.request(config)
  const res =await  fetch(BaseUrl+'/Users/Authenticate',config)

  let response =await res.json()
  console.log(response.data,'response')
  return(response.data)
   
};


export const VerifyPhoneNumber=async(phoneNumber,otp,token,nats)=> {


    let data = JSON.stringify({
        "otp": otp,
        "phoneNumber": `0098${phoneNumber}`,
        "otpToken" : token,
        "natsUserPublicKey" : nats
      });
      let config = {
        method: 'post',
        redirect: "follow",
        
        headers: { 
          'Content-Type': 'application/json'
        },
        body : data
      };
      // const res =await  Axios.request(config)
      const res =await  fetch(BaseUrl+'/Users/VerifyPhoneNumber',config)
      let response =await res.json()
  console.log(response.data,'response')
  return(response.data)
  // let response =res.data
  // console.log(response,'responseeee')
 
}

export const Finalize=async(phoneNumber,token,nats,value)=> {
  console.log(phoneNumber,token,nats,value.email,value.firstName,value.lastName,'phoneNumber,token,nats,value')
    let data = JSON.stringify({
      
        "phoneNumber": `0098${phoneNumber}`,
        "otpToken" : token,
        "natsUserPublicKey" : nats,
        "email":value.email,
        "firstName": value.firstName,
        "lastName": value.lastName,
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/Users/Finalize',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      const res =await  Axios.request(config)
      console.log(res.data,'Finalize')
  let response =res.data
  return(response)
}

export const RefreshTokens=async()=> {
    
   
    // const response=await  Axios.post('https://dev.vitalize.dev/api/v1/auth/auth_req',
         
    //  {
    //     mobile:mobileNumber,
    //     recaptcha_token:captcha
    // })
}