import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const CreateGroup = ({handleShow}) => {
  return (
    <View className="h-[80%] w-full px-4 flex justify-center items-center">
      <Text className="text-gray-900 text-md tracking-wide text-center font-bold mb-2">
        You don't have any groups.
      </Text>
      <Text className="text-gray-700 text-md tracking-wide text-center py-2">
        Creating groups makes it easy to divide expenses between your friends.
      </Text>

      {/*********** Create Group Button ***********/}
      <TouchableOpacity
        className="flex flex-row items-center justify-center border-b border-gray-100 px-8 py-4 bg-[#76C893] mt-6 rounded-md space-x-2"
        onPress={handleShow}>
        <View className="flex flex-row items-center space-x-4">
          <Text className="text-md font-semibold text-gray-800">
            Create Group
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

export default CreateGroup;
