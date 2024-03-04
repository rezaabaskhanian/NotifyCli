import React, { Component, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import* as  MessageScreen from '../screens/messages/index';


const Messgae = createNativeStackNavigator();
export default function AuthStackScreen() {
    return (
        <Messgae.Navigator
            initialRouteName="MessageHome"
            screenOptions={{
                headerShown:false
              
            }}
        >
            <Messgae.Screen name="MessageHome" component={MessageScreen.Messages} options={{}}/>
            <Messgae.Screen name="MessageDetail" component={MessageScreen.MessageDetail} />
            <Messgae.Screen name="MessageTemplateList" component={MessageScreen.MessageTemplateList} />
            <Messgae.Screen name="Search" component={MessageScreen.Search} />
          
        </Messgae.Navigator>
    );
}

