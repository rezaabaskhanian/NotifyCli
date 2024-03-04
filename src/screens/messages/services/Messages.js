import Axios from 'axios'
Axios.defaults.baseURL = null;

// Or set it to undefined
Axios.defaults.baseURL = undefined;




// export const GetProvider = async (id) => {

//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `http://185.162.43.150:3001/Message/GetLastMessageOfDistinctProviders?userId=${id}` ,
//         headers: { }
//       };
          
//       const res =await   Axios.request(config)
      
//       let response =res.data
//       return(response)
       
//     };

  //   export const GetProvider = async (id) => {
  //     console.log(id,'ressponseee')
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow"
  //   };
    
  //   const res =await  fetch(`http://192.168.21.76:3001/Message/GetLastMessageOfDistinctProviders?userId=${id}`, requestOptions)
   
  //   let response =res.text()
  //   return(response)

  // }
  export const GetProvider = async (id) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://185.162.43.150:3001/Message/GetLastMessageOfDistinctProviders?userId=${id}` ,
        headers: { }
      };
          
      const res =await   Axios.request(config)
      
      let response =res.data
      return(response)
       
    };

    export const GetMessages = async (userId,providerId) => {

      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      const res =await  fetch(`http://185.162.43.150:3001/Message/Get?providerId=${providerId}&userId=${userId}&page=1`, requestOptions)
      
      let response =await res.json()
      console.log(response,'resss')
      return(response)

      // let config = {
      //     method: 'get',
      //     maxBodyLength: Infinity,
      //     url: `http://185.162.43.150:3001/Message/Get?providerId=${providerId}&userId=${userId}&page=1` ,
      //     headers: { }
      //   };
            
      //   const res =await   Axios.request(config)
      //   console.log(res.data,'data')
      //   let response =res.data
      //   return(response)
         
      };