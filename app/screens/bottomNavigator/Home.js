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

import React, {useEffect, useState} from 'react';

const Home = () => {
  // State Variables
  const [visible, setVisible] = useState(false);

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
          <View className="h-full w-full p-4 ">
            {/*********** Heading Text ***********/}
            <Text className="text-2xl font-Raleway tracking-wider px-4 py-4">
              Home
            </Text>

            {/*********** Center Text View ***********/}
            <View className="h-[80%] w-full px-4 flex justify-center items-center">
              <Text className="text-gray-900 text-md tracking-wide text-center font-bold mb-2">
                Welcome to FootInBill
              </Text>
              <Text className="text-gray-700 text-md tracking-wide text-center py-2">
                You have not added any friends yet.
              </Text>

              {/*********** Add Friend Button ***********/}
              <TouchableOpacity
                className="flex flex-row items-center justify-center border-b border-gray-100 px-8 py-4 bg-[#76C893] mt-6 rounded-md space-x-2"
                onPress={handleShow}>
                <View className="flex flex-row items-center space-x-4">
                  <Text className="text-md font-semibold text-gray-800">
                    Add friend
                  </Text>
                </View>
                <Image
                  source={require('../../../assets/images/plus.png')}
                  className="h-6 w-6"
                />
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
                    source={require('../../../assets/images/add_friend.jpg')}
                    className="h-44 w-44"
                  />
                  <Text className="text-2xl font-Raleway font-semibold tracking-wide py-4">
                    Add new friend
                  </Text>
                </View>

                {/*********** Inputs View ***********/}
                <View className="w-full h-screen bg-white">
                  {/*********** Name Input View ***********/}
                  <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                    <TextInput
                      // onChangeText={value => setNewPassword(value)}
                      // value={newPassword}
                      secureTextEntry={true}
                      placeholder="Name"
                      name="name"
                      className="p-4 text-xl text-gray-600 border border-gray-300"
                      autoCapitalize="none"
                    />
                  </View>

                  {/*********** Email Input View ***********/}
                  <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                    <TextInput
                      // onChangeText={value => setConfirmPassword(value)}
                      // value={confirmPassword}
                      secureTextEntry={true}
                      placeholder="Email"
                      name="email"
                      className="p-4 text-xl text-gray-600 border border-gray-300"
                      autoCapitalize="none"
                    />
                  </View>

                  {/*********** Add Friend Button View ***********/}
                  <View className="w-[90%] mx-auto shadow-md bg-[#76C893] rounded-sm mt-6">
                    <TouchableOpacity>
                      <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full capitalize">
                        Add friend
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
  );
};

export default Home;
