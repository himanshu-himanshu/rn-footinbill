import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const AddMember = ({handleShow}) => {
  return (
    <View className="h-[70%] w-full px-4 flex justify-center items-center">
      <Text className="text-gray-900 text-md tracking-wide text-center font-bold mb-2">
        You are the only one here!
      </Text>
      <Text className="text-gray-700 text-md tracking-wide text-center py-2">
        Invite friends to join group and share expenses.
      </Text>

      {/*********** Add Member Button ***********/}
      <TouchableOpacity
        className="flex flex-row items-center justify-center border-b border-gray-100 px-8 py-4 bg-[#34A0A4] mt-6 rounded-md space-x-2"
        onPress={() => handleShow()}>
        <View className="flex flex-row items-center space-x-4">
          <Text className="text-md font-semibold text-gray-100">
            Add Member
          </Text>
        </View>
        <Image
          source={require('../../../../assets/images/plus.png')}
          className="h-6 w-6"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddMember;
