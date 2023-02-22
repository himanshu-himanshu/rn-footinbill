import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Text,
  Image,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Home from './Home';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          height: 90,
          backgroundColor: '#99D98C',
          paddingTop: 40,
          //   bottom: 30,
          //   marginHorizontal: 10,
          //   borderRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 18,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../../assets/images/home.png')}
              className="h-9 w-9"
              style={{tintColor: focused ? '#184E77' : '#999999'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../../assets/images/settings.png')}
              className="h-9 w-9"
              style={{tintColor: focused ? '#184E77' : '#999999'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
