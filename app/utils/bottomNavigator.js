// import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../Components/HomeScreen';
// import LogIn from '../Components/LogIn';

// const Tab = createBottomTabNavigator();

// const BottomTab = () => (
//     <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Profile" component={ProfilePage} />
//         <Tab.Screen name="Listing" component={ListingPage} />
//     </Tab.Navigator>
// );
// const Drawer = createDrawerNavigator();

// const NestedDrawerTab = () => (
//     <NavigationContainer>
//         <Drawer.Navigator initialRouteName="Home">
//             <Drawer.Screen name="Root" component={BottomTab} />
//             <Drawer.Screen name="Home" component={HomeScreen} />
//         </Drawer.Navigator>
//     </NavigationContainer>
// );
// export default NestedDrawerTab;