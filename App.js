import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListaScreen from './ListaScreen'
import LomakeScreen from './LomakeScreen'
import EtusivuScreen from './EtusivuScreen'
import Ionicons from '@expo/vector-icons/Ionicons';
import CameraScreen from './CameraScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({ color, size}) => {
                let iconName;

                if(route.name === 'Etusivu') {
                  iconName = 'home';
                } else if (route.name === 'Vaatelista') {
                  iconName = 'list';
                } else if (route.name === 'Lisää vaate'){
                  iconName = 'add-circle';
                } else if (route.name === 'Kamera'){
                  iconName = 'camera';
                }
                return <Ionicons name={iconName} size={size} color={color} />
              },
              
            })}>
            <Tab.Screen name="Etusivu" component={EtusivuScreen} />
            <Tab.Screen name="Vaatelista" component={ListaScreen} />
            <Tab.Screen name="Lisää vaate" component={LomakeScreen} />
            <Tab.Screen name="Kamera" component={CameraScreen}/>
          </Tab.Navigator>

        </NavigationContainer>
  );
}


