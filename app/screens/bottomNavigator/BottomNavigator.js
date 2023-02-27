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
          //height: 90,
          //backgroundColor: '#D9ED92',
          //paddingTop: 30,
          //borderRadius: 10,
          height: 80,
          backgroundColor: '#D9ED92',
          paddingTop: 40,
          bottom: 30,
          marginHorizontal: 20,
          borderRadius: 20,
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
              className={focused ? 'h-9 w-9' : 'h-9 w-9'}
              style={{tintColor: focused ? '#1E6091' : '#999999'}}
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
              style={{tintColor: focused ? '#1E6091' : '#999999'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
