import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full">
          {/********* Upper View **********/}
          <View className="h-[70vh] flex w-full justify-start items-start px-4 py-2">
            {/********* Title Text **********/}
            <Text className="text-2xl font-Raleway tracking-wider px-4 py-4">
              Home
            </Text>

            {/********* User View **********/}
            <View className="bg-[#D9ED92] py-6 px-2 w-full rounded-tl-3xl rounded-br-3xl flex flex-row justify-between items-center mt-4">
              <View className="px-4 py-2">
                <Text className="text-xl tracking-wider pb-2">Hi Username</Text>
                <Text className="text-xsm text-gray-500">
                  Let's begin your journey
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
      </SafeAreaView>
    </View>
  );
};

export default Home;
