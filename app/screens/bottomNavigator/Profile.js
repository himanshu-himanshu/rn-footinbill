import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import {
  logoutUser,
  getAllPatientsOfAUser,
} from '../../../app/actions/authAction';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showSnack from '../../utils/ShowSnack';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();

  const showAlert = () =>
    Alert.alert(
      'Are You Sure?',
      'You want to Logout',
      [
        {
          text: 'Ok',
          onPress: () => {
            performLogout();
          },
          style: 'default',
        },
        {
          text: 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          return false;
        },
      },
    );
  let performLogout = () => {
    // AsyncStorage.removeItem('userToken');
    dispatch(logoutUser());
    navigation.navigate('loginScreen');
    showSnack('See you soon!');
  };
  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full">
          {/********* Title View **********/}
          <View className="h-[70vh] flex w-full justify-start items-start px-4 py-2">
            <View className="h-full w-full">
              <Text className="text-2xl font-Raleway tracking-wider px-4 py-4">
                Account
              </Text>

              <View className="bg-[#D9ED92] py-6 px-2 w-full rounded-tl-3xl rounded-br-3xl flex flex-row justify-between items-center mt-4">
                <View className="px-4 py-2">
                  <Text className="text-xl tracking-wider pb-2">Username</Text>
                  <Text className="text-xsm text-gray-500">
                    Thanks for being a loyal user
                  </Text>
                </View>
                <View className="px-4">
                  <Image
                    source={require('../../../assets/images/man.png')}
                    className="h-16 w-16"
                  />
                </View>
              </View>
            </View>
          </View>

          {/********* Logout View **********/}
          <View className="flex w-full justify-center items-center px-4 py-6">
            <TouchableOpacity onPress={() => showAlert()}>
              <Text className="text-lg tracking-wide text-[#168AAD]">
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
