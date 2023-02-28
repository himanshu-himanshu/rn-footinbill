import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Image,
  Button,
} from 'react-native';
import React from 'react';
import {
  logoutUser,
  getAllPatientsOfAUser,
} from '../../../app/actions/authAction';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showSnack from '../../utils/ShowSnack';
import {useState} from 'react';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

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

  const handleHide = () => {
    setVisible(false);
  };

  const handleShow = () => {
    setVisible(true);
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
            <View className="bg-[#76C893] py-6 px-2 w-full rounded-tl-3xl rounded-br-3xl flex flex-row justify-between items-center mt-4 mb-8">
              <View className="px-4 py-2">
                <Text className="text-xl tracking-wider pb-2 text-gray-800">
                  Username
                </Text>
                <Text className="text-xsm text-gray-700">
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
              <TouchableOpacity
                className="flex flex-row items-center justify-between border-b border-gray-100 pb-4"
                onPress={handleShow}>
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

        {/****************************************************************************************/}
        {/***************************************** MODAL ****************************************/}

        <Modal
          visible={visible}
          animationType="slide"
          onRequestClose={handleHide}>
          <SafeAreaView>
            <View className="h-full">
              <View className="flex p-4">
                <TouchableOpacity onPress={handleHide}>
                  <Text className="text-2xl text-gray-500">&larr;</Text>
                </TouchableOpacity>
              </View>
              {/********* Header View **********/}
              <View className="flex w-full justify-center items-center pb-12">
                <Image
                  source={require('../../../assets/images/otp.png')}
                  className="h-40 w-40"
                />
                <Text className="text-3xl font-Raleway font-semibold tracking-wide py-4">
                  Change Password
                </Text>
              </View>

              {/********* Password View **********/}
              <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                <TextInput
                  secureTextEntry={true}
                  placeholder="New Password"
                  name="otp"
                  keyboardType="numeric"
                  className="p-4 text-xl text-gray-600 border border-gray-300"
                  autoCapitalize="none"
                />
              </View>

              {/********* Password View **********/}
              <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                <TextInput
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  name="otp"
                  keyboardType="numeric"
                  className="p-4 text-xl text-gray-600 border border-gray-300"
                  autoCapitalize="none"
                />
              </View>

              {/********* Login Button View **********/}
              <View className="w-[90%] mx-auto shadow-md bg-[#b5e48c] rounded-sm mt-12">
                <TouchableOpacity>
                  <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full">
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleHide}>
                <Text className="text-center px-10 py-4 text-pink-700 text-md rounded-full mt-12">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
