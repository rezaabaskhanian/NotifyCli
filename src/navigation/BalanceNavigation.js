import React, { Component, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import* as  BalanceScreen from '../screens/balance/index';

const Balance = createNativeStackNavigator();
export default function AuthStackScreen() {
    return (
        <Balance.Navigator
            initialRouteName="BalanceHome"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Balance.Screen name="BalanceHome" component={BalanceScreen.AccBalance} />
          
        </Balance.Navigator>
    );
}

