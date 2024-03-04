
import { View, TouchableOpacity ,StyleSheet} from 'react-native';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../../screens/components/Text'
import {Colors} from '../../styles/index';
import { NavigationContainer ,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
function TabBar({ state, descriptors, navigation}) {

 

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  
  const {t} = useTranslation();
 
  const { display } = focusedOptions?.tabBarStyle
  if (display === "none") {
    return null;
  }else
  return (
    <View  style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
         
          <TouchableOpacity key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems:'center',marginBottom:10 }}
          >
          

          <View style={{backgroundColor:isFocused ? Colors.BLUE_LIGHT :null,justifyContent:'center',alignItems:'center',
           width:64,height:32,borderRadius:15}}>
          <Icon size={20} name={route.name =='Message' ? 'messenger' 
           : route.name =='Promotions' ? 'volume-mute' : route.name =='AccBalance'  ? 'account-balance' : route.name =='Setting'  ? 'settings' :null}  /> 
          </View>
            <Text style={styles.txtLabel}>
              {t(label)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles =StyleSheet.create({
  txtLabel:{
    fontSize:12
  }
})

export default TabBar