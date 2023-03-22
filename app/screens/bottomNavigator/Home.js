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
import AddFriend from './components/AddFriend';
import {createFriend, getAllFriends} from '../../actions/friendAction';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [allFriends, setAllFriends] = useState([]);

  const {authToken} = useSelector(state => state.auth);

  const {friend} = useSelector(state => state.friend);

  useEffect(() => {
    dispatch(getAllFriends(authToken));
  }, []);

  const createFriendFunc = () => {
    dispatch(createFriend({name: friendName, email: friendEmail}, authToken));
    handleHide();
    dispatch(getAllFriends(authToken));
  };

  const handleHide = () => {
    setVisible(false);
  };
  const handleShow = () => {
    setVisible(true);
  };

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-[90%]">
          <View className="h-full w-full py-4 ">
            {/*********** Heading Text ***********/}
            <View className="flex flex-row items-center justify-between px-2">
              <Text className="text-2xl font-Raleway tracking-wider px-4 py-4">
                Friends
              </Text>
              <TouchableOpacity
                className="mr-2 flex justify-center items-center"
                onPress={handleShow}>
                <Text className="text-md text-blue-500">Add</Text>
              </TouchableOpacity>
            </View>

            {/** Show when user has no friends */}
            {!friend && <AddFriend handleShow={handleShow} />}

            {/** Show whenever there is atleast one friend  */}
            <View className="py-2 flex flex-col">
              {/*********** Card View ***********/}
              <View className="px-4">
                <View className="bg-gray-200 p-2 w-full rounded-xl flex flex-row items-center mb-2 shadow-md">
                  <View className="px-2">
                    <Image
                      source={require('../../../assets/images/list.png')}
                      className="h-14 w-14"
                    />
                  </View>
                  <View className="px-4 py-2">
                    <Text className="text-lg tracking-wider">
                      Total balance
                    </Text>
                    <Text className="text-xsm text-gray-700">
                      You are all settled up
                    </Text>
                  </View>
                </View>
              </View>

              {/*********** Map through list to render each friend ***********/}
              <ScrollView className="mb-24 px-4">
                {friend &&
                  friend.data &&
                  friend.data.map((friend, index) => (
                    <TouchableOpacity
                      key={index}
                      className="flex flex-row items-center justify-between p-2 py-3 shadow-lg border-b border-gray-100"
                      onPress={() =>
                        navigation.navigate('friendScreen', {
                          friendData: friend,
                        })
                      }>
                      <View className="flex flex-row items-center space-x-3">
                        <Image
                          source={require('../../../assets/images/user12.png')}
                          className="h-11 w-11"
                        />
                        <Text className="text-lg font-light capitalize">
                          {friend.name}
                        </Text>
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
                <View className="flex w-full justify-center items-center pb-6">
                  <Image
                    source={require('../../../assets/images/add_friend.jpg')}
                    className="h-44 w-44"
                  />
                  <Text className="text-2xl font-Raleway font-semibold tracking-wide py-4">
                    Add new friend
                  </Text>
                </View>

                {/*********** Inputs View ***********/}
                <View className="w-full h-screen bg-white">
                  {/*********** Name Input View ***********/}
                  <View className="flex w-[90%] flex-row justify-center items-center mx-auto my-2">
                    <Image
                      source={require('../../../assets/images/card.png')}
                      className="h-9 w-9"
                    />
                    <TextInput
                      onChangeText={value => setFriendName(value)}
                      placeholder="Enter Name"
                      name="name"
                      className="p-4 text-xl text-gray-600 rounded-md w-[85%]"
                    />
                  </View>

                  {/*********** Name Input View ***********/}
                  <View className="flex w-[90%] flex-row justify-center items-center mx-auto my-2">
                    <Image
                      source={require('../../../assets/images/email.png')}
                      className="h-9 w-9"
                    />
                    <TextInput
                      onChangeText={value => setFriendEmail(value)}
                      placeholder="Enter Email"
                      name="email"
                      className="p-4 text-xl text-gray-600 rounded-md w-[85%]"
                    />
                  </View>

                  {/*********** Add Friend Button View ***********/}
                  <View className="w-[90%] mx-auto shadow-md bg-[#76C893] rounded-sm mt-6">
                    <TouchableOpacity onPress={createFriendFunc}>
                      <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full capitalize">
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
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
