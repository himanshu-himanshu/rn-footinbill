import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Activity from './Activity';
import Groups from './Groups';
import Home from './Home';
import Profile from './Profile';
import AddExpense from './AddExpense';

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
          marginHorizontal: 10,
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
              className="h-9 w-9"
              style={{tintColor: focused ? '#EA5455' : '#999999'}}
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
              style={{tintColor: focused ? '#EA5455' : '#999999'}}
            />
          ),
        }}
      />

      {/*********** Add Expense Tab ***********/}
      {/* <Tab.Screen
        name="Add Expense"
        component={AddExpense}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../../assets/images/button.png')}
              className="h-12 w-12"
              style={{tintColor: focused ? '#19A7CE' : '#999999'}}
            />
          ),
        }}
      /> */}

      {/*********** Activity Tab ***********/}
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../../assets/images/hour-glass.png')}
              className="h-9 w-9"
              style={{tintColor: focused ? '#EA5455' : '#999999'}}
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
              style={{tintColor: focused ? '#EA5455' : '#999999'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
