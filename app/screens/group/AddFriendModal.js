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
import axios from 'axios';
import {API_URL} from '../../constants/actionStrings';
import showSnack from '../../utils/ShowSnack';

const AddFriendModal = ({
  handleHide,
  addFriendFunction,
  groupId,
  authToken,
  getGroupMembers,
}) => {
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');

  //---------------------------------------------------//
  /*** Function to add member to current group */
  //---------------------------------------------------//
  const addMember = async () => {
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .post(`groups` + `/` + groupId + `/members`, {
        members: [
          {
            name: friendName,
            email: friendEmail,
          },
        ],
      })
      .then(response => {
        console.log('INSIDE ADD MEMBER FUNC THEN ', response.data);
        showSnack(response.data.message);
        getGroupMembers();
        handleHide();
      })
      .catch(function (error) {
        console.log('INSIDE ADD MEMBER FUNC CATCH ', error);
        let any = {
          code: 401,
          message: error.response.data.message,
        };
        return any;
      });
    return res;
  };

  return (
    <SafeAreaView>
      <View className="h-full">
        {/*********** Header View ***********/}
        <View className="flex px-4">
          <TouchableOpacity onPress={handleHide}>
            <Text className="text-2xl text-gray-500">&larr;</Text>
          </TouchableOpacity>
        </View>
        <View className="flex w-full justify-center items-center pb-6">
          <Image
            source={require('../../../assets/images/GRP.png')}
            className="h-56 w-72"
          />
          <Text className="text-2xl font-Raleway font-semibold tracking-wide pb-4">
            Add Group Member
          </Text>
        </View>

        {/*********** Inputs View ***********/}
        <View className="w-full h-screen bg-white">
          {/*********** Name Input View ***********/}
          <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
            <TextInput
              onChangeText={value => setFriendName(value)}
              // value={newPassword}
              placeholder="Name"
              name="name"
              className="p-4 text-xl text-gray-600 border border-gray-300 rounded-md"
              autoCapitalize="none"
            />
          </View>

          {/*********** Email Input View ***********/}
          <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
            <TextInput
              onChangeText={value => setFriendEmail(value)}
              // value={confirmPassword}
              placeholder="Email"
              name="email"
              className="p-4 text-xl text-gray-600 border border-gray-300 rounded-md"
              autoCapitalize="none"
            />
          </View>

          {/*********** Add Friend Button View ***********/}
          <View className="w-[90%] mx-auto shadow-xl bg-[#8F43EE] rounded-md mt-6">
            <TouchableOpacity onPress={() => addMember()}>
              <Text className="text-center px-10 py-4 text-gray-100 font-bold text-xl rounded-full capitalize">
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
  );
};

export default AddFriendModal;
