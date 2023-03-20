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
import CreateGroup from './components/CreateGroup';
import {createGroup, getAllGroups} from '../../../app/actions/groupAction';
import {useSelector, useDispatch} from 'react-redux';

const Groups = ({navigation}) => {
  // State Variables
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(true);
  const {authToken} = useSelector(state => state.auth);
  const {groups} = useSelector(state => state.group);

  useEffect(() => {
    dispatch(getAllGroups(authToken));
  }, []);

  useEffect(
    () => {
      dispatch(getAllGroups(authToken));
    },
    [navigation],
    [visible],
  );

  const handleCreateGroup = () => {
    dispatch(createGroup({name: groupName}, authToken));
    handleHide();
    dispatch(getAllGroups(authToken));
    setTimeout(() => {
      setLoading(!loading);
    }, 4000);
  };

  //console.log('GROUPS***************', groups);

  const handleHide = () => {
    setVisible(false);
  };
  const handleShow = () => {
    setVisible(true);
  };

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full">
          <View className="h-full w-full p-4 ">
            {/*********** Heading Text ***********/}
            <View className="flex flex-row items-center justify-between">
              <Text className="text-2xl font-Raleway tracking-wider px-4 py-4">
                Groups
              </Text>
              <TouchableOpacity
                className="mr-2 flex justify-center items-center"
                onPress={handleShow}>
                <Text className="text-md text-blue-500">Add</Text>
              </TouchableOpacity>
            </View>

            {/** Show when no groups*/}
            {groups && groups.data.length == 0 && (
              <CreateGroup handleShow={handleShow} />
            )}

            {/** Show whenever there is atleast one group  */}
            <View className="p-2 flex flex-col">
              {/*********** Map through list to render each group ***********/}
              {groups &&
                groups.data &&
                groups.data.map((group, key) => (
                  <TouchableOpacity
                    key={key}
                    className="flex flex-row items-center justify-between p-2 py-3 shadow-lg border-b border-gray-100"
                    onPress={() =>
                      navigation.navigate('groupScreen', {groupData: group})
                    }>
                    <View className="flex flex-row items-center space-x-4">
                      <Image
                        source={require('../../../assets/images/meet.png')}
                        className="h-10 w-10"
                      />
                      <Text className="text-lg font-light">{group.name}</Text>
                    </View>
                    <Image
                      source={require('../../../assets/images/next.png')}
                      className="h-6 w-6"
                    />
                  </TouchableOpacity>
                ))}
            </View>
          </View>

          {/******************* MODAL *******************/}
          <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={handleHide}>
            <SafeAreaView>
              <View className="h-full">
                {/*********** Header View ***********/}
                <View className="flex p-4">
                  <TouchableOpacity onPress={handleHide}>
                    <Text className="text-2xl text-gray-500">&larr;</Text>
                  </TouchableOpacity>
                </View>
                <View className="flex w-full justify-center items-center pb-6">
                  <Image
                    source={require('../../../assets/images/group.jpg')}
                    className="h-44 w-44"
                  />
                  <Text className="text-2xl font-Raleway font-semibold tracking-wide py-4 capitalize">
                    Create new group
                  </Text>
                </View>

                {/*********** Inputs View ***********/}
                <View className="w-full h-screen bg-white">
                  {/*********** Name Input View ***********/}
                  <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                    <TextInput
                      onChangeText={value => setGroupName(value)}
                      // secureTextEntry={true}
                      placeholder="Group name"
                      name="name"
                      className="p-4 text-xl text-gray-600 border border-gray-300"
                      autoCapitalize="none"
                    />
                  </View>

                  {/*********** Add Friend Button View ***********/}
                  <View className="w-[90%] mx-auto shadow-md bg-[#34A0A4] rounded-sm mt-6">
                    <TouchableOpacity onPress={handleCreateGroup}>
                      <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full capitalize">
                        Create Group
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
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Groups;
