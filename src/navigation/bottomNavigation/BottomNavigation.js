import React, { useContext, useEffect, useState } from 'react';
import { I18nManager,  } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TabBar from './TabBar';
import MessageStackScreen from '../../navigation/MessageNavigation';
import PromotionStackScreen from '../../navigation/PromotionsNavigation';
import AccBalanceStackScreen from '../../navigation/BalanceNavigation';
import SettingsStackScreen from '../../navigation/SettingsNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NATSContext, useNats } from '../../context/useNats';
import AsyncStorage from '@react-native-async-storage/async-storage';


I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

const BottomTab = () =>
{
  const [userData, setUserData] = useState({ id: null, namespace: null });

  const { connection, connectionStatus } = useContext(NATSContext);

  const { publish, subscribe, unsubscribe, useConnection } = useNats({ connection, onMessage: console.log })

  useEffect(() =>
  {
    (async function ()
    {
      const data = await AsyncStorage.getItem('token');

      const base64EncryptedUserData = data?.split('.')[1];

      const jsonUserData = Buffer.from(base64EncryptedUserData, 'base64').toString("utf-8");

      const userData = JSON.parse(jsonUserData);

      setUserData((prev) => ({ ...prev, id: userData.id, namespace: userData.namespace }));
    })();
  }, []);

  const send = () => publish(`${ userData.namespace }.presence`, { userId: userData.id });

  useEffect(() =>
  {
    if (!!userData.namespace)
    {
      console.log("namespace Found")
      if (connectionStatus.isConnected)
      {
        console.log("NATS is ready")
        useConnection(connection)
        const subscriptionId = subscribe(`${ userData.namespace }.presence`);

        console.log("creating subscription: ", subscriptionId);
        
        setInterval(() =>
        {
          if (connectionStatus.isConnected)
          {
            publish(`${ userData.namespace }.presence`, { userId: userData.id });
          }
        }, 2000);

        return function ()
        {
          console.log("unsubscribing ...: ", subscriptionId);
          unsubscribe(subscriptionId);
        };
      }
    }
  }, [userData.namespace, connectionStatus.isConnected]);


  useEffect(() =>
  {
    if (!!userData.namespace)
    {
      console.log("namespace Found")
      if (connectionStatus.isConnected)
      {
        console.log("NATS is ready")
        useConnection(connection)
        const subscriptionId = subscribe(`${ userData.namespace }.message`);

        console.log("creating subscription: ", subscriptionId);
        
        const interval = setInterval(() =>
        {
          publish(`${ userData.namespace }.message`, { message: "new message is ready"});
        }, 2000);
        
        setTimeout(() => {
          clearInterval(interval)
          unsubscribe(subscriptionId);
        }, 10000)

        return function ()
        {
          console.log("unsubscribing ...: ", subscriptionId);
          unsubscribe(subscriptionId);
        };
      }
    }
  }, [userData.namespace, connectionStatus.isConnected]);

  const Tab = createBottomTabNavigator();

  return (
    <>
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="MessasetUserIdge" component={MessageStackScreen} options={({ route }) =>
      {
        const focusedRouteName = getFocusedRouteNameFromRoute(route);

        // if (focusedRouteName === 'MessageDetail'|| focusedRouteName === 'Search') {
        if (focusedRouteName === 'MessageDetail')
        {
          return {
            tabBarStyle: { display: 'none' },
          };
        }

        return {
          tabBarStyle: { display: 'flex' },
        };

      }} />

      <Tab.Screen
        name="Promotions"
        component={PromotionStackScreen}
        options={({ route }) =>
        {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);

          if (focusedRouteName === 'PromotionDetail')
          {
            return {
              tabBarStyle: { display: 'none' },
            };
          }
          return {
            tabBarStyle: { display: 'flex' },
          };
        }}
      />
      <Tab.Screen
        name="AccBalance"
        component={AccBalanceStackScreen}
        options={({ route }) =>
        {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);

          if (focusedRouteName === 'BalanceDetail')
          {
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

        options={({ route }) =>
        {
          const focusedRouteName = getFocusedRouteNameFromRoute(route);

          if (focusedRouteName === 'SearchDetai')
          {
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
    </>
  );
};

export default BottomTab;
