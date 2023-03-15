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

import {API_URL} from '../../constants/actionStrings';
import React, {useEffect, useState} from 'react';
import {getAGroup} from '../../../app/actions/groupAction';
import {getAuthUser} from '../../../app/actions/authAction';
import {useSelector, useDispatch} from 'react-redux';
import AddFriendModal from './AddFriendModal';
import GroupSettingModal from './GroupSettingModal';
import axios from 'axios';

const GroupScreen = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const {_id} = route.params.groupData;
  const [groupMembers, setGroupMembers] = useState([]);

  const {authToken, authUser} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('USE EFFECT CALLED', authToken, _id);
    dispatch(getAGroup(authToken, _id));
    getGroupMembers(authToken, _id);
    dispatch(getAuthUser(authToken));
    console.log('USE STATE ARRAY ', groupMembers);
  }, []);

  useEffect(() => {
    console.log('USE EFFECT CALLED', authToken, _id);
    dispatch(getAGroup(authToken, _id));
    getGroupMembers(authToken, _id);
    dispatch(getAuthUser(authToken));
    console.log('USE STATE ARRAY ', groupMembers);
  }, [route]);

  const getGroupMembers = async (authToken, id) => {
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 1000,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .get(`groups` + `/` + id + `/members`)
      .then(response => {
        console.log('INSIDE GET ALL MEMBERS FUNC THEN ', response.data.data);
        setGroupMembers(response.data.data);
      })
      .catch(function (error) {
        console.log('INSIDE GET ALL MEMBERS FUNC CATCH ', error);
        let any = {
          code: 401,
          message: error.response.data.message,
        };
        return any;
      });
    return res;
  };

  console.log('AFTER USE EFFECT');

  const {group} = useSelector(state => state.group);

  console.log('GROUP DATA FROM STATE: ', group);

  const handleHide = () => {
    setVisible(false);
  };
  const handleShow = () => {
    setVisible(true);
  };
  const handleSettingHide = () => {
    setVisibleSetting(false);
  };
  const handleSettingShow = () => {
    setVisibleSetting(true);
  };

  const addFriendFunction = () => {};

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
                  onPress={() => handleSettingShow()}>
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

                <TouchableOpacity
                  className="flex flex-row items-center justify-center border border-[#76C893] px-3 py-2 mt-6 rounded-md space-x-2"
                  onPress={() => handleShow()}>
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

            {/** Show when atleast two members and no expense added in group */}
            {group && group.data && group.data.members.length > 1 && (
              <View className="h-[60%] w-full px-4 flex justify-center items-center">
                <Text className="text-gray-900 text-md tracking-wide text-center font-bold mb-2">
                  Nothing to show here!
                </Text>
                <Text className="text-gray-700 text-md tracking-wide text-center py-2">
                  Click on Add Expense button to add an expense with this group.
                </Text>

                {/*********** Add Member Button ***********/}
                <TouchableOpacity className="flex flex-row items-center justify-center border-b border-gray-100 px-8 py-4 bg-[#8F43EE] mt-6 rounded-md space-x-2">
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-md font-semibold text-gray-100">
                      Add Expense
                    </Text>
                  </View>
                  <Image
                    source={require('../../../assets/images/plus.png')}
                    className="h-6 w-6"
                  />
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
                <TouchableOpacity
                  className="flex flex-row items-center justify-center border-b border-gray-100 px-8 py-4 bg-[#34A0A4] mt-6 rounded-md space-x-2"
                  onPress={() => handleShow()}>
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-md font-semibold text-gray-100">
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

          {/******************* ADD FRIEND MODAL *******************/}
          <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={handleHide}>
            <AddFriendModal
              handleHide={handleHide}
              addFriendFunction={addFriendFunction}
            />
          </Modal>

          {/******************* SETTING MODAL *******************/}
          <Modal
            visible={visibleSetting}
            onRequestClose={handleSettingHide}
            animationType="fade">
            <GroupSettingModal
              handleSettingHide={handleSettingHide}
              groupMembers={groupMembers}
              authUser={authUser}
              createdBy={group.data.createdBy}
            />
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GroupScreen;
