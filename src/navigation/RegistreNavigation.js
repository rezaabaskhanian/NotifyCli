import React, { Component, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import * as RegisterScreen from '../screens/registeration/index';

const Reg = createNativeStackNavigator();
export default function AuthStackScreen() {
    return (
        <Reg.Navigator
            initialRouteName="Onbording"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Reg.Screen name="Onbording" component={RegisterScreen.Onbording} />
            <Reg.Screen name="OtpScreen" component={RegisterScreen.OtpScreen} />
        </Reg.Navigator>
    );
}

