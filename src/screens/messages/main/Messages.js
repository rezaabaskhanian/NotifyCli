import { View, StyleSheet, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import Text from '../../components/Text';
import Header from '../../components/Header';
import { Colors } from '../../../styles';
import TabTop from './TabTop';
import Banking from '../banking/Banking';
import Notifications from '../Notifications/Notifications';
import Channels from '../channels/Channels';
import All from '../all/All';
import { useTranslation } from 'react-i18next';
import { BankMessage } from '../mockData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetProvider } from '../services/Messages';
import PriceFix from '../../../utils/PriceFix';
// import MessageDecoder from '../../../utils/test'

import { decodeMessage } from '../../../utils/Template';
import { Buffer } from 'buffer';
import { connect, NatsConnection, StringCodec } from 'nats.ws';
import { useNATS } from '../../../context/NATSContext';


const Messages = (props) =>
{
  const [statePage, setStatePage] = useState('');
  const [categoryTab, setCategory] = useState(null);
  const password = "42d2b60a29ea3c0b20ebfdbf99eabedbee4afefdc4f8bd557c204e57491d0df5";
  //for data fake
  // const [data , setData]=useState(BankMessage)

  const { t } = useTranslation();

  const [nc, setConection] = useState(undefined);
  const [isError, setError] = useState(undefined);
  const [data, setData] = useState([]);

  const [decodedMessages, setDecodedMessages] = useState([]);
  const [decodeProvider, setDecodeProvider] = useState([]);

  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   AsyncStorage.getItem('token').then((data)=>{
  //  const body = data.split('.')[1]
  //   const userData=Buffer.from(body,'base64').toString()
  //   const userDataBuffer=JSON.parse(userData)
  //  GetProvider(userDataBuffer.id).then((providerData)=>{
  //     const providerDataNew= providerData.data
  //     providerDataNew.forEach((item) => {
  //       decodeMessage(password,item).then(decoded => {
  //               const updatedDecodedMessages = [...decodedMessages,...decoded];
  //                       setDecodedMessages(updatedDecodedMessages);
  //       })
  //     });
  //  })
  //    })
  // }, [])
  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try
      {
        const data = await AsyncStorage.getItem('token');

        const body = data?.split('.')[1];

        const userData = Buffer.from(body, 'base64').toString();

        const userDataBuffer = JSON.parse(userData);

        setUserId(userDataBuffer.id);

        const providerData = await GetProvider(userDataBuffer.id);
        const providerDataNew = providerData.data;


        const decodedMessages = await Promise.all(providerDataNew.map(item => decodeMessage(password, item)));


        const templates = decodedMessages.map(decodedMessage => decodedMessage.template);
        const providers = decodedMessages.map(decodedMessage => decodedMessage.provider);

        const uniqueProviders = Array.from(new Set(providers.map(item => item.publicKey)))
          .map(publicKey => providers.find(item => item.publicKey === publicKey));

        setDecodeProvider(uniqueProviders);
        setDecodedMessages(templates);

        // const { template,provider } = providerDataNew.map(item => decodeMessage(password, item));
        // console.log(template,provider,'providerNew')
        // const decodedResults = await Promise.all(decodedPromises);

        // const updatedDecodedMessages = [...decodedMessages, ...decodedResults];
        // setDecodedMessages(updatedDecodedMessages);
      } catch (error)
      {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const messageSecttion = async (id) =>
  {
    try
    {
      const providerData = await GetProvider(userDataBuffer.id);
      const providerDataNew = providerData.data;

      const decodedPromises = providerDataNew.map(item => decodeMessage(password, item));
      const decodedResults = await Promise.all(decodedPromises);

      const updatedDecodedMessages = [...decodedMessages, ...decodedResults];
      setDecodedMessages(updatedDecodedMessages);


    } catch (error)
    {
      console.error('Error Message Section:', error);

    }

  };

  useEffect(() =>
  {

    fetchData(); // Call the async function
    const unsubscribe = props.navigation.addListener('focus', () =>
    {
      fetchData(); // Fetch data again when the component is focused (refresh)
    });

    return unsubscribe;
  }, [props.navigation]);



  const fetchData = async () =>
  {
    try
    {

      const existingArrayString = await AsyncStorage.getItem('CategoryFolder');

      let existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];
      console.log(existingArray, 'existingArray');
      setCategory(existingArray);
    } catch (e)
    {
      console.error('Error:', e.message);
    }
  };


  const changeTab = (e) =>
  {
    setStatePage(() => e);
    ChangeData(e);
  };
  const ChangeData = (e) =>
  {
    if (e == 'All')
    {
      setData(BankMessage);
    } else
    {
      const filteredMessages = BankMessage.filter((message) =>
      {
        return message.categoryName && e.toLowerCase() == message.categoryName.toLowerCase();
      });
      setData(filteredMessages);
    }

  };

  function renderSwitch(param)
  {
    switch (param)
    {
      case 'Banking':
        return <Banking navigation={props.navigation} />;
      case 'Notifications':
        return <Notifications />;
      case 'Channels':
        return <Channels />;
      case 'All':
        return <All />;
      default:
        return null;
    }
  }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Header search dots title={t('Messages')} style={{ backgroundColor: Colors.BLUE_THEME }} />
      <TabTop onPress={changeTab} tabs={categoryTab} />
      {/* {renderSwitch(statePage)} */}

      <Banking data={decodeProvider} navigation={props.navigation} userId={userId} />


    </View>
  );
};

export default Messages;


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});