import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Groups from './Groups';
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
      {/*********** Home Tab ***********/}
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

      {/*********** Groups Tab ***********/}
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../../assets/images/meeting.png')}
              className="h-10 w-10"
              style={{tintColor: focused ? '#1E6091' : '#999999'}}
            />
          ),
        }}
      />

      {/*********** Profile Tab ***********/}
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
