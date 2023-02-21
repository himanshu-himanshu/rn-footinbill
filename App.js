/**
 * Project React Native by Himanshu and Gurminder(301294300)
 *
 */
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
import AddAPatientScreen from './app/screens/patient/AddAPatientScreen';
import ViewAllPatientsScreen from './app/screens/patient/ViewAllPatientsScreen';
import ViewAPatientScreen from './app/screens/patient/ViewAPatientScreen';
import HomeScreen from './app/screens/HomeScreen';
import ViewAllTestResultsScreen from './app/screens/test/ViewAllTestResultsScreen';
import AddATestResultScreen from './app/screens/test/AddATestResultScreen';
import ViewATestResultScreen from './app/screens/test/ViewATestResultScreen';
// import PracticeScreen from './app/screens/practiceScreen';
import navLabelHelper from './app/utils/navLabelHelper.json';

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
        }}>
        <Stack.Screen
          name="loginScreen"
          options={
            isLoggedIn
              ? {title: helper.loginScreen.loggedInTitle}
              : {title: helper.loginScreen.loggedOutTitle}
          }
          component={isLoggedIn ? HomeScreen : LoginScreen}
        />

        <Stack.Screen
          name="homeScreen"
          options={
            isLoggedIn
              ? {title: helper.homeScreen.loggedInTitle}
              : {title: helper.homeScreen.loggedOutTitle}
          }
          component={isLoggedIn ? HomeScreen : LoginScreen}
        />

        <Stack.Screen
          name="registerScreen"
          options={
            isLoggedIn
              ? {title: helper.registerScreen.loggedInTitle}
              : {title: helper.registerScreen.loggedOutTitle}
          }
          component={isLoggedIn ? HomeScreen : RegisterScreen}
        />

        <Stack.Screen
          name="forgotPasswordScreen"
          options={
            isLoggedIn
              ? {title: helper.forgotPasswordScreen.loggedInTitle}
              : {title: helper.forgotPasswordScreen.loggedOutTitle}
          }
          component={isLoggedIn ? HomeScreen : ForgotPasswordScreen}
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
          name="addPatientScreen"
          options={
            isLoggedIn
              ? {title: helper.addPatientScreen.loggedInTitle}
              : {title: helper.addPatientScreen.loggedOutTitle}
          }
          component={isLoggedIn ? AddAPatientScreen : LoginScreen}
        />

        <Stack.Screen
          name="viewAllPatients"
          options={
            isLoggedIn
              ? {title: helper.viewAllPatients.loggedInTitle}
              : {title: helper.viewAllPatients.loggedOutTitle}
          }
          component={isLoggedIn ? ViewAllPatientsScreen : LoginScreen}
        />

        <Stack.Screen
          name="viewAPatientScreen"
          options={
            isLoggedIn
              ? {title: helper.viewAPatientScreen.loggedInTitle}
              : {title: helper.viewAPatientScreen.loggedOutTitle}
          }
          component={isLoggedIn ? ViewAPatientScreen : LoginScreen}
        />

        <Stack.Screen
          name="viewAllTestResultsScreen"
          options={
            isLoggedIn
              ? {title: helper.viewAllTestResultsScreen.loggedInTitle}
              : {title: helper.viewAllTestResultsScreen.loggedOutTitle}
          }
          component={isLoggedIn ? ViewAllTestResultsScreen : LoginScreen}
        />

        <Stack.Screen
          name="addATestResultScreen"
          options={
            isLoggedIn
              ? {title: helper.addATestResultScreen.loggedInTitle}
              : {title: helper.addATestResultScreen.loggedOutTitle}
          }
          component={isLoggedIn ? AddATestResultScreen : LoginScreen}
        />

        <Stack.Screen
          name="viewATestResultScreen"
          options={
            isLoggedIn
              ? {title: helper.viewATestResultScreen.loggedInTitle}
              : {title: helper.viewATestResultScreen.loggedOutTitle}
          }
          component={isLoggedIn ? ViewATestResultScreen : LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
