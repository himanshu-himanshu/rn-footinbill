import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const AddFriend = ({handleShow}) => {
  return (
    <>
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
            source={require('../../../../assets/images/plus.png')}
            className="h-6 w-6"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddFriend;
