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
          <View className="h-full w-full p-4">
            <Text className="text-2xl font-Raleway tracking-wider px-4 py-4">
              Account
            </Text>

            {/*********** Card View ***********/}
            <View className="bg-[#D9ED92] py-6 px-2 w-full rounded-tl-3xl rounded-br-3xl flex flex-row justify-between items-center mt-4 mb-8">
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

            {/*********** Links View ***********/}
            <View className="m-2 flex flex-col space-y-6">
              <TouchableOpacity className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                <View className="flex flex-row items-center space-x-4">
                  <Image
                    source={require('../../../assets/images/password.png')}
                    className="h-6 w-6"
                  />
                  <Text className="text-lg font-light">Change Password</Text>
                </View>
                <Image
                  source={require('../../../assets/images/next.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>

              <TouchableOpacity className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
                <View className="flex flex-row items-center space-x-4">
                  <Image
                    source={require('../../../assets/images/star.png')}
                    className="h-6 w-6"
                  />
                  <Text className="text-lg font-light">Rate Us</Text>
                </View>
                <Image
                  source={require('../../../assets/images/next.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>

              <TouchableOpacity className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center space-x-4">
                  <Image
                    source={require('../../../assets/images/friend.png')}
                    className="h-6 w-6"
                  />
                  <Text className="text-lg font-light">Tell Your Friend</Text>
                </View>
                <Image
                  source={require('../../../assets/images/next.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>
            </View>

            {/*********** Logout View ***********/}
            <View className="flex w-full h- justify-center items-center px-4 py-6 mt-[30%] border-t border-b border-gray-100">
              <TouchableOpacity
                onPress={() => showAlert()}
                className="flex flex-row items-center space-x-4">
                <Image
                  source={require('../../../assets/images/off.png')}
                  className="h-5 w-5"
                />
                <Text className="text-lg font-semibold tracking-wide text-pink-600">
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
