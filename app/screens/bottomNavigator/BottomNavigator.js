import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './Home';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
