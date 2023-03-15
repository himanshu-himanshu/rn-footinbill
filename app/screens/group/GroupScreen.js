import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {API_URL} from '../../constants/actionStrings';
import {getAGroup} from '../../../app/actions/groupAction';
import {getAuthUser} from '../../../app/actions/authAction';
import AddFriendModal from './AddFriendModal';
import GroupSettingModal from './GroupSettingModal';
import AddMember from './components/AddMember';
import AddExpense from './components/AddExpense';

const GroupScreen = ({navigation, route}) => {
  const {_id} = route.params.groupData;

  const dispatch = useDispatch();

  // useState Variables
  const [visible, setVisible] = useState(false);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);

  // Fetch from state
  const {authToken, authUser} = useSelector(state => state.auth);

  useEffect(() => {
    console.log('USE EFFECT CALLED', authToken, _id);
    dispatch(getAGroup(authToken, _id));
    getGroupMembers();
    dispatch(getAuthUser(authToken));
    console.log('USE STATE ARRAY ', groupMembers);
  }, []);

  useEffect(
    () => {
      console.log('USE EFFECT CALLED', authToken, _id);
      dispatch(getAGroup(authToken, _id));
      getGroupMembers();
      dispatch(getAuthUser(authToken));
      console.log('USE STATE ARRAY ', groupMembers);
    },
    [route],
    [navigation],
    [visible],
    [groupMembers],
  );

  //---------------------------------------------------//
  /*** Function to fetch members of current group */
  //---------------------------------------------------//
  const getGroupMembers = async () => {
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .get(`groups` + `/` + _id + `/members`)
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

  const {group} = useSelector(state => state.group);

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
            {groupMembers.length > 1 && (
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
            {groupMembers.length > 1 && <AddExpense />}

            {/** Show when no members in group */}
            {groupMembers.length == 1 && <AddMember handleShow={handleShow} />}
          </View>

          {/******************* ADD FRIEND MODAL *******************/}
          <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={handleHide}>
            <AddFriendModal
              handleHide={handleHide}
              addFriendFunction={addFriendFunction}
              groupId={group && group.data._id}
              authToken={authToken}
              getGroupMembers={getGroupMembers}
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
              createdBy={group && group.data.createdBy}
              groupName={route.params.groupData.name}
            />
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GroupScreen;
