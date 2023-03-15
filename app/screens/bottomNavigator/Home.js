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

const Home = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');

  const {authToken} = useSelector(state => state.auth);

  const {friend} = useSelector(state => state.friend);

  // useSelector(state => console.log('HOME SCREEN STATE *********** ', state));

  useEffect(() => {
    let response = dispatch(getAllFriends(authToken));
    //console.log('response000000 - --  -', response.data);
    // if (response.code == 200) {
    //   alert(response.message);
    // } else {
    //   alert(response.message);
    // }
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
        <View className="w-full h-full">
          <View className="h-full w-full p-4 ">
            {/*********** Heading Text ***********/}
            <View className="flex flex-row items-center justify-between">
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
            {/* <AddFriend handleShow={handleShow} /> */}

            {/** Show whenever there is atleast one friend  */}
            <View className="p-2 flex flex-col">
              {/*********** Card View ***********/}
              <View className="bg-gray-200 py-2 px-2 w-full rounded-xl flex flex-row items-center mb-2 shadow-2xl">
                <View className="px-2">
                  <Image
                    source={require('../../../assets/images/man.png')}
                    className="h-14 w-14"
                  />
                </View>
                <View className="px-4 py-2">
                  <Text className="text-lg tracking-wider pb-2">
                    Total balance
                  </Text>
                  <Text className="text-xsm text-gray-700">
                    You are all settled up
                  </Text>
                </View>
              </View>

              {/*********** Map through list to render each friend ***********/}
              {friend.data &&
                friend.data.map((friend, index) => (
                  <TouchableOpacity
                    key={index}
                    className="flex flex-row items-center justify-between p-2 py-3 shadow-lg border-b border-gray-100">
                    {console.log('INSIDE FRIEND MAP', friend)}
                    <View className="flex flex-row items-center space-x-4">
                      <Image
                        source={require('../../../assets/images/user.png')}
                        className="h-10 w-10"
                      />
                      <Text className="text-lg font-light">{friend.name}</Text>
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
                  <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                    <TextInput
                      onChangeText={value => setFriendName(value)}
                      // value={newPassword}
                      placeholder="Name"
                      name="name"
                      className="p-4 text-xl text-gray-600 border border-gray-300"
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
                      className="p-4 text-xl text-gray-600 border border-gray-300"
                      autoCapitalize="none"
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
