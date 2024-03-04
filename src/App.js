import { Buffer } from '@craftzdog/react-native-buffer'

global.Buffer = global.Buffer || Buffer


import 'react-native-url-polyfill/auto';
import 'text-encoding-polyfill';
import '@azure/core-asynciterator-polyfill';
import 'react-native-get-random-values'

import React, { Component, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterStackscreen from './navigation/RegistreNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeTab from './navigation/bottomNavigation/BottomNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RealmProvider } from '@realm/react';
import  {Providers,Templates} from './utils/realm'
import  { NATSProvider } from './context/NATSContext';
import messaging from '@react-native-firebase/messaging';



async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}




I18nManager.allowRTL(false);
I18nManager.forceRTL(false);



const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState('Register');
  useEffect(() => {
     if (requestUserPermission){
      messaging().getToken().then((data)=>{
        console.log(data,'tokennnn')
        AsyncStorage.setItem('fcmToken' ,data)
      })
     }
   }, []);

   useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setInitialRouteName('Home');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    checkToken();
  }, []);


  return (
    // <RealmProvider schema={[Templates,Providers]}>
    // <NATSProvider>
    <NavigationContainer>
   
      <Stack.Navigator
        // initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
      }}>
        {
          initialRouteName=='Register' ?
          <>
   
          <Stack.Screen name="Register" component={RegisterStackscreen} />
          <Stack.Screen name="Home" component={HomeTab} />
          </>
          :
          <Stack.Screen name="Home" component={HomeTab} />
        }
 
           
        {/* <Stack.Screen name="Tabs" component={TabStackScreen} /> */}

         {/* <Stack.Screen name="Table" component={TableStackScreen} />  
        <Stack.Screen name="Home" component={HomeStackScreen} /> 
        <Stack.Screen name="Auth" component={AuthStackScreen} />
        <Stack.Screen name="Dashboards" component={DashStackScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    //  </NATSProvider>
    // {/* </RealmProvider> */}
  );
};

export default App;

