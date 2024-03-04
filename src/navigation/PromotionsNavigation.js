import React, { Component, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import* as  PromotionScreen from '../screens/promotions/index';

const Messgae = createNativeStackNavigator();
export default function AuthStackScreen() {
    return (
        <Messgae.Navigator
            initialRouteName="PromotionHome"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Messgae.Screen name="PromotionHome" component={PromotionScreen.Promotion} />
          
        </Messgae.Navigator>
    );
}

