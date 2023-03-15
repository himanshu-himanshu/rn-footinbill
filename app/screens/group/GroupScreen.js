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
import {getAGroup} from '../../../app/actions/groupAction';
import {useSelector, useDispatch} from 'react-redux';

const GroupScreen = ({navigation, route}) => {
  const {_id} = route.params.groupData;

  const {authToken} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('USE EFFECT CALLED', authToken, _id);
    dispatch(getAGroup(authToken, _id));
  }, []);

  useEffect(() => {
    console.log('USE EFFECT CALLED', authToken, _id);
    dispatch(getAGroup(authToken, _id));
  }, [route]);

  console.log('AFTER USE EFFECT');

  const {group} = useSelector(state => state.group);

  console.log('GROUP DATA FROM STATE: ', group);

  // let members = group.data.members;

  // console.log('GROUP MEMBER FROM STATE: ', members);

  const handleSettingModal = () => {};

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full">
          {/*********** Banner View ***********/}
          <View className="relative pt-2">
            <Image
              source={require('../../../assets/images/bgg.jpg')}
              className="h-24 w-full"
            />
            <TouchableOpacity
              className="absolute left-1 flex justify-center items-center rounded-full"
              onPress={() => navigation.goBack()}>
              <Text className="text-2xl text-gray-500">&larr;</Text>
            </TouchableOpacity>
          </View>

          <View className="h-full w-full p-4">
            {/*********** Heading Text ***********/}
            <View className="flex flex-row items-start justify-between py-2">
              <View>
                <Text className="text-xl font-Raleway tracking-wider px-2 text-gray-800 pb-1">
                  {route.params.groupData.name}
                </Text>
                <Text className="text-xsm font-Raleway px-2 text-gray-600 font-light">
                  No expenses to show.
                </Text>
              </View>
              <View className="">
                <TouchableOpacity
                  className="flex justify-center items-center rounded-full"
                  onPress={() => handleSettingModal()}>
                  <Image
                    source={require('../../../assets/images/setting2.jpg')}
                    className="h-10 w-10"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/*********** Three Butons View (Only show if there is atleast one member in group) ***********/}
            {group && group.data && group.data.members.length > 1 && (
              <View className="flex flex-row items-center space-x-3 justify-center">
                <TouchableOpacity className="flex flex-row items-center justify-center shadow-xl border border-[#8F43EE] bg-[#8F43EE] px-3 py-2 mt-6 rounded-md space-x-2">
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-sm font-normal text-white">
                      Settle up
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity className="flex flex-row items-center justify-center border border-[#76C893] px-3 py-2 mt-6 rounded-md space-x-2">
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-sm font-normal text-[#184E77]">
                      Add Member
                    </Text>
                  </View>
                  <Image
                    source={require('../../../assets/images/plus.png')}
                    className="h-4 w-4"
                  />
                </TouchableOpacity>

                <TouchableOpacity className="flex flex-row items-center justify-center border border-[#76C893] px-3 py-2 mt-6 rounded-md space-x-2">
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-sm font-normal text-[#184E77]">
                      Add Expense
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/** Show when no members in group */}
            {group && group.data && group.data.members.length == 1 && (
              <View className="h-[70%] w-full px-4 flex justify-center items-center">
                <Text className="text-gray-900 text-md tracking-wide text-center font-bold mb-2">
                  You are the only one here!
                </Text>
                <Text className="text-gray-700 text-md tracking-wide text-center py-2">
                  Invite friends to join group and share expenses.
                </Text>

                {/*********** Add Member Button ***********/}
                <TouchableOpacity className="flex flex-row items-center justify-center border-b border-gray-100 px-8 py-4 bg-[#B5E48C] mt-6 rounded-md space-x-2">
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-md font-semibold text-gray-800">
                      Add Member
                    </Text>
                  </View>
                  <Image
                    source={require('../../../assets/images/plus.png')}
                    className="h-6 w-6"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GroupScreen;
