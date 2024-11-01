import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListaScreen from './ListaScreen'
import LomakeScreen from './LomakeScreen'
import EtusivuScreen from './EtusivuScreen'
import Ionicons from '@expo/vector-icons/Ionicons';
import { app } from './firebaseConfig';

const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({ focused, color, size}) => {
                let iconName;

                if(route.name === 'Etusivu') {
                  iconName = 'home';
                } else if (route.name === 'Vaatelista') {
                  iconName = 'list';
                } else if (route.name === 'Lisää vaate'){
                  iconName = 'add-circle';
                }
                return <Ionicons name={iconName} size={size} color={color} />
              },
              
            })}>
            <Tab.Screen name="Etusivu" component={EtusivuScreen} />
            <Tab.Screen name="Vaatelista" component={ListaScreen} />
            <Tab.Screen name="Lisää vaate" component={LomakeScreen} />
          </Tab.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
