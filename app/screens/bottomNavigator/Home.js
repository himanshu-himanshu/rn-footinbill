import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full">
          {/********* Title View **********/}
          <View className="h-[70vh] flex w-full justify-start items-start px-4 py-2">
            <Text className="text-2xl font-Raleway tracking-wider py-4">
              Home
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
