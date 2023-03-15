import React from 'react';
import isEmpty from './app/validations/isEmpty';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/Welcome';
import ProfileScreen from './app/screens/profile/ProfileScreen';
import UpdatePasswordScreen from './app/screens/password/UpdatePasswordScreen';
import ForgotPasswordScreen from './app/screens/auth/ForgotPasswordScreen';
import VerifyForgotPasswordOtpScreen from './app/screens/auth/VerifyForgotPasswordOtpScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import RegisterScreen from './app/screens/auth/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen';
import navLabelHelper from './app/utils/navLabelHelper.json';
import GroupScreen from './app/screens/group/GroupScreen';
import FriendScreen from './app/screens/friend/FriendScreen';

const App = () => {
  let auth = useSelector(state => state.auth);
  let Stack = createNativeStackNavigator();
  let isLoggedIn = isEmpty(auth) ? false : true;

  const helper = navLabelHelper[0];
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
        <Stack.Screen
          name="loginScreen"
          options={
            isLoggedIn
              ? {title: helper.loginScreen.loggedInTitle}
              : {title: helper.loginScreen.loggedOutTitle}
          }
          component={LoginScreen}
        />

        <Stack.Screen
          name="homeScreen"
          options={
            isLoggedIn
              ? {title: helper.homeScreen.loggedInTitle}
              : {title: helper.homeScreen.loggedOutTitle}
          }
          component={HomeScreen}
        />

        <Stack.Screen
          name="registerScreen"
          options={
            isLoggedIn
              ? {title: helper.registerScreen.loggedInTitle}
              : {title: helper.registerScreen.loggedOutTitle}
          }
          component={RegisterScreen}
        />

        <Stack.Screen
          name="forgotPasswordScreen"
          options={
            isLoggedIn
              ? {title: helper.forgotPasswordScreen.loggedInTitle}
              : {title: helper.forgotPasswordScreen.loggedOutTitle}
          }
          component={ForgotPasswordScreen}
        />

        <Stack.Screen
          name="verifyForgotPasswordOtpScreen"
          options={
            isLoggedIn
              ? {title: helper.verifyForgotPasswordOtpScreen.loggedInTitle}
              : {title: helper.verifyForgotPasswordOtpScreen.loggedOutTitle}
          }
          component={VerifyForgotPasswordOtpScreen}
        />

        <Stack.Screen
          name="updatePasswordScreen"
          options={
            isLoggedIn
              ? {title: helper.updatePasswordScreen.loggedInTitle}
              : {title: helper.updatePasswordScreen.loggedOutTitle}
          }
          component={UpdatePasswordScreen}
        />

        <Stack.Screen
          name="welcomeScreen"
          options={
            isLoggedIn
              ? {title: helper.welcomeScreen.loggedInTitle}
              : {title: helper.welcomeScreen.loggedOutTitle}
          }
          component={isLoggedIn ? WelcomeScreen : LoginScreen}
        />

        <Stack.Screen
          name="profileScreen"
          options={
            isLoggedIn
              ? {title: helper.profileScreen.loggedInTitle}
              : {title: helper.profileScreen.loggedOutTitle}
          }
          component={isLoggedIn ? ProfileScreen : LoginScreen}
        />

        <Stack.Screen
          name="groupScreen"
          options={
            isLoggedIn
              ? {title: helper.profileScreen.loggedInTitle}
              : {title: helper.profileScreen.loggedOutTitle}
          }
          component={isLoggedIn ? GroupScreen : LoginScreen}
        />

        <Stack.Screen
          name="friendScreen"
          options={
            isLoggedIn
              ? {title: helper.profileScreen.loggedInTitle}
              : {title: helper.profileScreen.loggedOutTitle}
          }
          component={isLoggedIn ? FriendScreen : LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
