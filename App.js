/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



import 'react-native-url-polyfill/auto';
import 'text-encoding-polyfill';
import '@azure/core-asynciterator-polyfill';
import { connect, NatsConnection, StringCodec } from 'nats.ws';

import elliptic from "elliptic"


function App() {


  useEffect(() => {
    (async () => {
      const stan = await connect({ servers: ["ws://185.162.43.150:8474"] });
      const sc = StringCodec()

      stan.subscribe("0d50925d-e1f3-4bf7-8a34-5cf4924a6f0c", {

        callback(err, message) {

          const msg = sc.decode(message.data);

          console.log(msg)

        }
      });
      console.log("connected");
    })();
    return () => {
      stan?.drain();
      console.log("disconnected");
    };
  }, []);


  return (
    <View>
      <Text>
        {'Test'}
      </Text>
    </View>
  )


}


export default App;
