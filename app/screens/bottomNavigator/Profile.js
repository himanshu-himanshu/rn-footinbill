import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Modal,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import {
  logoutUser,
  getAuthUser,
  changePassword,
} from '../../../app/actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
import showSnack from '../../utils/ShowSnack';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema = Yup.object({
  currentPassword: Yup.string('Not a valid currentPassword.')
    .trim()
    .required('currentPassword is required.'),
  confirmPassword: Yup.string('Not a valid confirmPassword.')
    .trim()
    .required('confirmPassword is required.'),
  password: Yup.string('Not a valid password.')
    .trim()
    .required('new password is required.'),
});

export const Profile = ({ navigation }) => {
  const dispatch = useDispatch();

  // const formObject = { confirmPassword: '', currentPassword: '', password: '' };
  const { authToken, authUser } = useSelector(state => state.auth);

  useEffect(() => {
    console.log('DISPATCHING GETAUTHUSER');
    dispatch(getAuthUser(authToken));
  }, []);

  useEffect(() => {
    console.log('DISPATCHING GETAUTHUSER');
    dispatch(getAuthUser(authToken));
  }, [authToken]);

  // State Variables
  const [visible, setVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  //------------------------------------------------------//
  /** submit Function when users click on change password */
  //-----------------------------------------------------//
  const submitFunc = async e => {
    e.preventDefault();
    console.log('currentPassword', currentPassword);
    console.log('newPassword', newPassword);
    console.log('confirmPassword', confirmPassword);

    // Form Validation
    if (currentPassword == '') {
      alert('Current Password cannot be empty');
      return;
    } else if (newPassword == '') {
      alert('New Password cannot be empty');
      return;
    } else if (confirmPassword == '') {
      alert('Confirm Password cannot be empty');
      return;
    } else if (newPassword !== confirmPassword) {
      alert('New Password and confirm password must match');
      return;
    }

    console.log('SUBMIT FUNCTION *****************', currentPassword);
    console.log('SUBMIT FUNCTION *****************', authToken);

    let payload = {
      currentPassword: currentPassword,
      confirmPassword: confirmPassword,
      password: newPassword,
      authToken: authToken,
    };

    // Dispatch changePassword reducer with payload data
    let response = await dispatch(changePassword(payload));

    if (response.code == 200) {
      alert(response.message);
      handleHide();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigation.navigate('homeScreen');
    } else {
      console.log('INSDIE PROFILE ELSE ************');
      alert(response.message);
    }
  };

  const handleHide = () => {
    setVisible(false);
  };
  const handleShow = () => {
    setVisible(true);
  };

  //------------------------------------------------------//
  /** Show alert when user clicks on logout */
  //-----------------------------------------------------//
  const showAlert = () => {
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
  };

  let performLogout = () => {
    // AsyncStorage.removeItem('userToken');
    dispatch(logoutUser());
    navigation.navigate('loginScreen');
    showSnack('See you soon!');
  };

  return (
    <ScrollView>
      <>
        <View className="w-full h-screen bg-white">
          <SafeAreaView>
            <View className="w-full h-full">
              <View className="h-full w-full p-4">
                <Text className="text-2xl font-Raleway tracking-wider px-4 py-4">
                  Account
                </Text>
                {/*********** Card View ***********/}
                <View className="bg-[#76C893] py-6 px-2 w-full rounded-3xl flex flex-row justify-between items-center mt-4 mb-8">
                  <View className="px-4 py-2">
                    <Text className="text-xl tracking-wider pb-2">
                      Hi, {authUser ? authUser.name : 'Gold'}
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
                  {/*********** Change Password Link ***********/}
                  <TouchableOpacity
                    className="flex flex-row items-center justify-between border-b border-gray-100 pb-4"
                    onPress={handleShow}>
                    <View className="flex flex-row items-center space-x-4">
                      <Image
                        source={require('../../../assets/images/password.png')}
                        className="h-6 w-6"
                      />
                      <Text className="text-lg font-light">
                        Change Password
                      </Text>
                    </View>
                    <Image
                      source={require('../../../assets/images/next.png')}
                      className="h-6 w-6"
                    />
                  </TouchableOpacity>

                  {/*********** Rate Us Link ***********/}
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

                  {/*********** Tell Your Friend Link ***********/}
                  <TouchableOpacity className="flex flex-row items-center justify-between">
                    <View className="flex flex-row items-center space-x-4">
                      <Image
                        source={require('../../../assets/images/friendship.png')}
                        className="h-6 w-6"
                      />
                      <Text className="text-lg font-light">
                        Tell Your Friend
                      </Text>
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
                    className="flex flex-row items-center space-x-2">
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

              {/******************* MODAL *******************/}
              <Modal
                visible={visible}
                animationType="slide"
                onRequestClose={handleHide}>
                <SafeAreaView>
                  <View className="h-full">
                    {/*********** Header View ***********/}
                    <View className="flex p-4">
                      <TouchableOpacity onPress={handleHide}>
                        <Text className="text-2xl text-gray-500">&larr;</Text>
                      </TouchableOpacity>
                    </View>
                    <View className="flex w-full justify-center items-center pb-6">
                      <Image
                        source={require('../../../assets/images/otp.png')}
                        className="h-40 w-40"
                      />
                      <Text className="text-3xl font-Raleway font-semibold tracking-wide py-4">
                        Change Password
                      </Text>
                    </View>

                    {/*********** Inputs View ***********/}
                    <View className="w-full h-screen bg-white">
                      {/*********** Current Password Input View ***********/}
                      <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                        <TextInput
                          onChangeText={value => setCurrentPassword(value)}
                          value={currentPassword}
                          secureTextEntry={true}
                          placeholder="Current Password"
                          name="currentPassword"
                          className="p-4 text-xl text-gray-600 border border-gray-300"
                          autoCapitalize="none"
                        />
                      </View>

                      {/*********** New Password Input View ***********/}
                      <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                        <TextInput
                          onChangeText={value => setNewPassword(value)}
                          value={newPassword}
                          secureTextEntry={true}
                          placeholder="New Password"
                          name="password"
                          className="p-4 text-xl text-gray-600 border border-gray-300"
                          autoCapitalize="none"
                        />
                      </View>

                      {/*********** Confirm Password Input View ***********/}
                      <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                        <TextInput
                          onChangeText={value => setConfirmPassword(value)}
                          value={confirmPassword}
                          secureTextEntry={true}
                          placeholder="Confirm New Password"
                          name="confirmPassword"
                          className="p-4 text-xl text-gray-600 border border-gray-300"
                          autoCapitalize="none"
                        />
                      </View>

                      {/*********** Submit Button View ***********/}
                      <View className="w-[90%] mx-auto shadow-md bg-[#b5e48c] rounded-sm mt-6">
                        <TouchableOpacity onPress={submitFunc}>
                          {/* <TouchableOpacity onPress={handleSubmit}> */}
                          <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full">
                            Submit
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/*********** Cancel Button View ***********/}
                      <TouchableOpacity onPress={handleHide}>
                        <Text className="text-center px-10 py-4 text-pink-700 text-md rounded-full mt-6">
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </SafeAreaView>
              </Modal>
            </View>
          </SafeAreaView>
        </View>
      </>
    </ScrollView>
  );
};

export default Profile;
