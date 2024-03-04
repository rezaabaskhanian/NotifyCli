import React, { Component, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer ,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TabBar from './TabBar'; 

import  MessageStackScreen  from '../../navigation/MessageNavigation'
import  PromotionStackScreen  from '../../navigation/PromotionsNavigation'
import  AccBalanceStackScreen  from '../../navigation/BalanceNavigation'
import SettingsStackScreen from '../../navigation/SettingsNavigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);




const BottomTab = () => {
  // useEffect(() => { }, []);
  const Tab = createBottomTabNavigator();
  return (
            <Tab.Navigator 
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
             headerShown:false,
               
            }}

           >
             <Tab.Screen name="Message" component={MessageStackScreen}  options={({ route }) => {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);
          
          // if (focusedRouteName === 'MessageDetail'|| focusedRouteName === 'Search') {
            if (focusedRouteName === 'MessageDetail') {
            return {
              tabBarStyle: { display: 'none' },
            };
          }

          return {
            tabBarStyle: { display: 'flex' },
          };
        
          }}/>
              
              
       
             <Tab.Screen name="Promotions" component={PromotionStackScreen} 
             
             options={({ route }) => {
              const focusedRouteName = getFocusedRouteNameFromRoute(route);
              
              if (focusedRouteName === 'PromotionDetail') {
                return {
                  tabBarStyle: { display: 'none' },
                };
              }
    
              return {
                tabBarStyle: { display: 'flex' },
              };
            
              }}
             />


        <Tab.Screen name="AccBalance" component={AccBalanceStackScreen} 
             
             options={({ route }) => {
              const focusedRouteName = getFocusedRouteNameFromRoute(route);
              
              if (focusedRouteName === 'BalanceDetail') {
                return {
                  tabBarStyle: { display: 'none' },
                };
              }
    
              return {
                tabBarStyle: { display: 'flex' },
              };
            
              }}
             />

<Tab.Screen name="Setting" component={SettingsStackScreen} 
             
             options={({ route }) => {
              const focusedRouteName = getFocusedRouteNameFromRoute(route);
              
              if (focusedRouteName === 'SearchDetai') {
                return {
                  tabBarStyle: { display: 'none' },
                };
              }
    
              return {
                tabBarStyle: { display: 'flex' },
              };
            
              }}
             />
             {/* <Tab.Screen name="Acc.balance" component={HomeStackScreen} options={{title:'Message'}}/>
             <Tab.Screen name="Settings" component={HomeStackScreen}  options={{title:'Message'}}/> */}
                  </Tab.Navigator>
 
  );
};

export default BottomTab;
