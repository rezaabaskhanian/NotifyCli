import React, { Component, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterStackscreen from '../../navigation/RegistreNavigation';



I18nManager.allowRTL(false);
I18nManager.forceRTL(false);



const Stack = createNativeStackNavigator();
const App = () => {
  // useEffect(() => { }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{
          headerShown: false,
      }}>
            <Stack.Screen name="Register" component={RegisterStackscreen} />
           
       
        {/* <Stack.Screen name="Tabs" component={TabStackScreen} /> */}

         {/* <Stack.Screen name="Table" component={TableStackScreen} />  
        <Stack.Screen name="Home" component={HomeStackScreen} /> 
        <Stack.Screen name="Auth" component={AuthStackScreen} />
        <Stack.Screen name="Dashboards" component={DashStackScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
