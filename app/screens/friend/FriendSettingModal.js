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
import React from 'react';

const FriendSettingModal = ({handleSettingHide, friendData}) => {
  return (
    <SafeAreaView>
      <View className="w-full h-full">
        <View className="h-full w-full p-4">
          <View className="flex flex-row items-center justify-between mb-6">
            <View className="flex flex-row items-center">
              <TouchableOpacity
                className=""
                onPress={() => handleSettingHide()}>
                <Text className="text-2xl text-gray-500">&larr;</Text>
              </TouchableOpacity>
              <Text className="text-xl font-Raleway tracking-wider px-4 py-2">
                Friend settings
              </Text>
            </View>
          </View>

          {/*********** Group Name View ***********/}
          <View className="p-2 w-full flex flex-row items-center mt-2 mb-2 space-x-2 border-b border-gray-100 pb-4">
            <View className="flex flex-row items-center space-x-4 w-full">
              <Image
                source={require('../../../assets/images/man.png')}
                className="h-8 w-8"
              />
              <View className="flex flex-col w-[85%]">
                <Text className="text-md font-normal">{friendData.name}</Text>
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-[12px] font-light text-gray-700">
                    {friendData.email}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/*********** Links View ***********/}
          <View className="m-2 flex flex-col space-y-6 border-b border-gray-100 pb-8 w-full">
            <Text className="font-light mb-2">Shared groups</Text>
          </View>

          {/*********** Links View ***********/}
          <View className="m-2 flex flex-col space-y-6 border-b border-gray-100 pb-8">
            <Text className="font-light mb-2">Others</Text>

            {/*********** Rate Us Link ***********/}
            <TouchableOpacity className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
              <View className="flex flex-row items-center space-x-4">
                <Image
                  source={require('../../../assets/images/star.png')}
                  className="h-6 w-6"
                />
                <Text className="text-[14px] font-light">Rate Us</Text>
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
                <Text className="text-[14px] font-light">
                  Share with your friend
                </Text>
              </View>
              <Image
                source={require('../../../assets/images/next.png')}
                className="h-6 w-6"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FriendSettingModal;
