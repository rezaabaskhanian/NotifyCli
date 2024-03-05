import { DebugEvents, Events, JSONCodec, NatsConnection, Subscription, connect, credsAuthenticator, Msg } from "nats.ws";
import { useRef, useEffect, useCallback, useState, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from "react-native";

const createCredentials = function (jwtToken: string, seedUser: string)
{
  return `
  -----BEGIN NATS USER JWT-----
  ${ jwtToken }
  ------END NATS USER JWT------

  ************************* IMPORTANT *************************
  NKEY Seed printed below can be used to sign and prove identity.
  NKEYs are sensitive and should be treated as secrets.

  -----BEGIN USER NKEY SEED-----
  ${ seedUser }
  ------END USER NKEY SEED------

  *************************************************************
`;
};
const jsonCoded = JSONCodec();
export const NATSContext = createContext({});

export const NATSProvider = function (props: any)
{
  const nats = useRef<NatsConnection>();

  const [ connectionStatus, setConnectionStatus ] = useState({ isConnected: false, reconnecting: false });

  const createNatsConnection = useCallback(async function ()
  {
    const userSeed = await AsyncStorage.getItem("natsUserSeed") as string;
    const jwtToken = await AsyncStorage.getItem('tokenNats');

    if (!!jwtToken)
    {
      const creds = createCredentials(jwtToken, userSeed);

      try
      {
        nats.current = await connect
          ({
            servers: [ 'ws://185.162.43.150:8474' ],
            authenticator: credsAuthenticator(new TextEncoder().encode(creds)),
            maxReconnectAttempts: -1,
            reconnect: true
          });
        setConnectionStatus((prev) => ({ ...prev, isConnected: true }));

        console.log("NATS connected");

        (async () =>
        {
          for await (const s of nats.current!.status())
          {
            switch (s.type)
            {
              case Events.Disconnect:
                {
                  console.log(`client disconnected - ${ s.data }`);
                  setConnectionStatus((prev) => ({ ...prev, isConnected: false, reconnecting: false }));
                  break;
                }
              case Events.Reconnect:
                {
                  console.log(`client reconnected - ${ s.data }`);
                  setConnectionStatus((prev) => ({ ...prev, isConnected: true, reconnecting: false }));
                  break;
                }
              case DebugEvents.Reconnecting:
                {
                  console.log("client is attempting to reconnect");
                  setConnectionStatus((prev) => ({ ...prev, isConnected: false, reconnecting: true }));
                  break;
                }
              default:
                console.log(`got an unknown status ${ s.type }`);
            }
          }
        })();
      }
      catch (error)
      {
        console.log(error);
      }
    }
    else
    {
      console.log("login first");
    }
  }, [ connectionStatus.isConnected ]);

  useEffect(() =>
  {
    const subscription = AppState.addEventListener('change', async nextAppState =>
    {
      if (nextAppState.match(/inactive|background/))
      {
        console.log('AppState', nextAppState);
        try
        {
          await nats.current?.drain();
          nats.current = undefined;
          console.log("NATS connection closed ...");
        }
        catch (error)
        {
          console.log("Error on draining ...");
        }
        setConnectionStatus((prev) => ({ ...prev, isConnected: false }));
      }
      else if (nextAppState === "active")
      {
        console.log('AppState', nextAppState);
        try
        {
          await createNatsConnection();
        }
        catch (error)
        {
          console.log(error)
        }
      }
    });
    return () =>
    {
      subscription.remove();
    };
  }, []);

  return <NATSContext.Provider value={ { connection: nats.current, connectionStatus } }>
    { props.children }
  </NATSContext.Provider>;
};
export const useNats = ({ onMessage }: { onMessage: (msg: object) => void; }) =>
{
  const nats = useRef<NatsConnection>();
  const subscriptions = useRef<{ [ key: string ]: Subscription | undefined; }>({});

  const { current: { publish, subscribe, unsubscribe, useConnection } } = useRef({
    subscribe(subject: string)
    {
      const subscriptionId = Date.now().toString();

      subscriptions.current[ subscriptionId ] = nats.current!.subscribe(subject, {
        queue: 'default',
        callback(err: any, msg: Msg)
        {
          if (err)
          {
            console.log('ERROR: ', err);
          }
          else onMessage(jsonCoded.decode(msg.data) as object);
        },
      });

      return subscriptionId;
    },
    unsubscribe(subscriptionId: string)
    {
      subscriptions.current[ subscriptionId ]?.unsubscribe();
      subscriptions.current[ subscriptionId ] = undefined;
    },
    publish(subject: string, data: object)
    {
      if (!!nats.current && !nats.current.isClosed())
      {
        nats.current.publish(subject, jsonCoded.encode(data));
      }
    },
    useConnection(connection: NatsConnection)
    {
      nats.current = connection;
    }
  });

  useEffect(() =>
  {
    const subscription = AppState.addEventListener('change', nextAppState =>
    {
      if (nextAppState.match(/inactive|background/))
      {
        for (const subscription in subscriptions.current)
        {
          console.log('unsubscribing ' + subscription + " ... which is " + subscriptions.current[ subscription ]);
          subscriptions.current[ subscription ]?.unsubscribe();
          subscriptions.current = {};
        }
      }
    });
    return () =>
    {
      subscription.remove();
    };
  }, []);

  return { publish, subscribe, unsubscribe, useConnection };
};
