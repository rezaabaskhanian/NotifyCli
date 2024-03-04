


const useNats = ({ subject, onMessage }: { subject: string; onMessage: (msg: object) => void; }) =>
{
  const jsonCoded = JSONCodec();

  const nats = useRef<NatsConnection>();
  const subscription = useRef<Subscription>();

  useEffect(() =>
  {
    (async () =>
    {
      if (!natsConnectionExists())
      {
        await createNatsConnection();
      }
    })();
  }, []);

  const natsConnectionExists = function (): boolean
  {
    return !!nats.current;
  };

  const createNatsConnection = async function ()
  {
    try
    {
      nats.current = await connect({ servers: [ "ws://185.162.43.150:8474" ], authenticator: credsAuthenticator(new TextEncoder().encode(creds)) });
    }
    catch (error)
    {
      console.log(error);
    }
  };
  const subscribe = useCallback(() =>
  {
    subscription.current = nats.current?.subscribe(subject,
      {
        queue: "default",
        callback(err, msg)
        {
          if (err)
          {
            console.log("ERROR: ", err);
          }
          onMessage(jsonCoded.decode(msg.data) as object);
        }
      }
    );
  }, [ subject ]);

  const unsubscribe = useCallback(() =>
  {
    if (natsConnectionExists())
    {
      subscription.current?.unsubscribe();
    }
  }, [ subject ]);

  const publish = useCallback((data: object) =>
  {
    nats.current?.publish(subject, jsonCoded.encode(data));
  }, [ subject ]);

  return { publish, subscribe, unsubscribe };
};