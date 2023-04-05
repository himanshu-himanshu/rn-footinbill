import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Modal,
  ActivityIndicator,
  Button,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import CreateGroup from './components/CreateGroup';
import {createGroup, getAllGroups} from '../../../app/actions/groupAction';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

const Groups = ({navigation}) => {
  // State Variables
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const {authToken} = useSelector(state => state.auth);

  const {groups} = useSelector(state => state.group);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllGroups(authToken));
    setLoading(false);
  }, []);

  useEffect(
    () => {
      setLoading(true);
      dispatch(getAllGroups(authToken));
      setLoading(false);
    },
    [navigation],
    [visible],
  );

  const handleCreateGroup = () => {
    if (groupName === '') {
      alert('Group name cannot be empty');
      return;
    } else {
      setLoading(true);
      console.log('41*******');
      dispatch(createGroup({name: groupName}, authToken));
      handleHide();
      console.log('44*******');
      dispatch(getAllGroups(authToken));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
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
          <View className="h-full w-full py-4">
            {/*********** Heading Text ***********/}
            <View className="flex flex-row items-center justify-between px-2">
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
            {/* {groups && groups.data.length == 0 && (
              <CreateGroup handleShow={handleShow} />
            )} */}

            {/** Show whenever there is atleast one group  */}
            <View className="py-2 flex flex-col px-4">
              {/****** Render Each Group ******/}
              <TouchableOpacity
                className="flex flex-row items-center justify-between p-2 py-3 shadow-lg border-b border-gray-100"
                onPress={() => navigation.navigate('nonGroupScreen')}>
                <View className="flex flex-row items-center space-x-3">
                  <Image
                    source={require('../../../assets/images/nongroup.png')}
                    className="h-11 w-11"
                  />
                  <Text className="text-lg font-light">Non-group Expenses</Text>
                </View>
                <Image
                  source={require('../../../assets/images/next.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>

              {/** Show if loading is true */}
              {loading && (
                <View className="h-[80%] w-full flex justify-center items-center">
                  <ActivityIndicator size="large" color="#8F43EE" />
                  <Text className="mt-2 font-light text-gray-500">
                    Fetching groups
                  </Text>
                </View>
              )}

              {/*********** Map through list to render each group ***********/}
              <ScrollView className="mb-24">
                {!loading &&
                  groups &&
                  groups.data &&
                  groups.data.map((group, key) => (
                    <TouchableOpacity
                      key={key}
                      className="flex flex-row items-center justify-between p-2 py-3 shadow-lg border-b border-gray-100"
                      onPress={() =>
                        navigation.navigate('groupScreen', {groupData: group})
                      }>
                      <View className="flex flex-row items-center space-x-3">
                        <Image
                          source={require('../../../assets/images/mountains.png')}
                          className="h-11 w-11"
                        />
                        <Text className="text-lg font-light">{group.name}</Text>
                      </View>
                      <Image
                        source={require('../../../assets/images/next.png')}
                        className="h-6 w-6"
                      />
                    </TouchableOpacity>
                  ))}
              </ScrollView>
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
                <View className="flex w-full justify-center items-center pb-8">
                  <Image
                    source={require('../../../assets/images/group.jpg')}
                    className="h-44 w-44"
                  />

                  <Text className="text-[12px] font-Raleway font-light tracking-wide px-4 pt-1 text-center">
                    Create group now and start adding members to share expense
                    to a larger group.
                  </Text>
                </View>

                {/*********** Inputs View ***********/}
                <View className="w-full h-screen bg-white">
                  {/*********** Name Input View ***********/}
                  <View className="flex w-[90%] flex-row justify-center items-center mx-auto my-2">
                    <Image
                      source={require('../../../assets/images/desc.png')}
                      className="h-8 w-8"
                    />
                    <TextInput
                      onChangeText={value => setGroupName(value)}
                      placeholder="Group name"
                      name="name"
                      className="p-4 text-xl text-gray-600 rounded-md w-[85%]"
                    />
                  </View>

                  {/*********** Add Friend Button View ***********/}
                  <View className="w-[90%] mx-auto shadow-md bg-[#34A0A4] rounded-sm mt-6">
                    <TouchableOpacity onPress={handleCreateGroup}>
                      <Text className="text-center px-10 py-4 text-gray-100 font-bold text-xl rounded-full capitalize">
                        Create Now
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
