import React, { Component, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import* as  SettingScreen from '../screens/setting/index';

const Setting = createNativeStackNavigator();
export default function AuthStackScreen() {
    return (
        <Setting.Navigator
            initialRouteName="SettingHome"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Setting.Screen name="SettingHome" component={SettingScreen.Setting} />
            <Setting.Screen name="MessageFolder" component={SettingScreen.MessageFolder} />
            <Setting.Screen name="CreateFolder" component={SettingScreen.CreateFolder} />
        </Setting.Navigator>
    );
}

