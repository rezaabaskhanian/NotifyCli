import React, { createContext, useContext, useEffect, useState } from 'react';
import { connect, StringCodec,credsAuthenticator ,} from 'nats.ws';
import * as Nkeys from 'nkeys.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { encode, decode } from 'base-64';

import base64 from 'base-64'; 
const NATSContext = createContext();

export const useNATS = () => {
  return useContext(NATSContext);
};

export const NATSProvider = ({ children }) => {
  const [nats, setNATS] = useState(null);


  useEffect(() => {
    const setupNATSConnection = async () => {
      try {
    
        const user = Nkeys.createUser();
        // const seedUser = new TextDecoder().decode(user.getSeed());
        const seedUser = new TextDecoder().decode(user.getSeed());
        console.log(seedUser, 'seedUser');

   
        const jwtToken = await AsyncStorage.getItem('tokenNats');
        if (jwtToken) {
          
      
          const credentials = createCredentials(jwtToken, seedUser);
        //   const credentialsBase64 = encode(credentials);
              const credentialsBase64 = new TextEncoder().encode(credentials)
            //   const encodedCredentials = base64.encode(String.fromCharCode.apply(null, credentialsBase64));
              
          
              console.log(credentialsBase64,'credentialsBase64') 
          const stan = await connect({
            debug:true,
            servers: ['ws://185.162.43.150:8474'], 
           
            authenticator: credsAuthenticator(credentialsBase64),
          });
          // await connect({ servers: [ "nats://185.162.43.150:8473" ], authenticator: credsAuthenticator(new TextEncoder().encode(creds)) }

          console.log('Connected to NATSddd');
          // Store NATS connection for later use if needed
          setNATS(stan);
        } else {
          console.log('AsyncStorage tokenNats is null');
        }
      } catch (error) {
        console.error('Error connecting to NATS:', error);
      }
    };

    setupNATSConnection();

    
    return () => {
      // Drain NATS connection when component unmounts
      nats?.drain();
      console.log('Disconnected from NATS');
    };
  }, []);
  

  const createCredentials = (jwtToken, seedUser) => {
    return `
      -----BEGIN NATS USER JWT-----
      ${jwtToken}
      ------END NATS USER JWT------

      ************************* IMPORTANT *************************
      NKEY Seed printed below can be used to sign and prove identity.
      NKEYs are sensitive and should be treated as secrets.

      -----BEGIN USER NKEY SEED-----
      ${seedUser}
      ------END USER NKEY SEED------

      *************************************************************
    `;
  };

  return (
    <NATSContext.Provider value={nats}>
      {children}
    </NATSContext.Provider>
  );
};
