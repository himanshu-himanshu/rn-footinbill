import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

import {API_URL} from '../../constants/actionStrings';
import {createFriend, getAllFriends} from '../../actions/friendAction';
import AddFriend from './components/AddFriend';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [allFriends, setAllFriends] = useState([]);
  const [youPaid, setYouPaid] = useState(0);
  const [youBorrowed, setYouBorrowed] = useState(0);

  const {authToken} = useSelector(state => state.auth);

  const {friend} = useSelector(state => state.friend);

  useEffect(() => {
    //setLoading(true);
    getExpenses();
    dispatch(getAllFriends(authToken));
    console.log('AUTH TOKEN HOME SCREEN', authToken);
    //setLoading(false);
  }, []);

  useEffect(() => {
    getExpenses();
    dispatch(getAllFriends(authToken));
  }, [isFocused]);

  //---------------------------------------------------//
  /*** Function to get expenses with a friend */
  //---------------------------------------------------//
  const getExpenses = async () => {
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .get(`expenses`)
      .then(response => {
        const dummyExpense = response.data.data;
        let localLent = 0;
        let localBorrowed = 0;
        dummyExpense.map(expense => {
          console.log('EXPENSE FROM FRIENDS', expense);
          if (expense.detailsPaid.message == 'you paid') {
            localLent = localLent + expense.detailsPaid.amount / 2;
            setYouPaid(localLent);
          }
          if (expense.detailsPaid.message != 'you paid') {
            localBorrowed = localBorrowed + expense.detailsPaid.amount / 2;
            setYouBorrowed(localBorrowed);
          }
        });
        console.log('Lent: ', localLent, ' AND BORROWED: ', localBorrowed);
        //console.log('INSIDE GET EXPENSE FUNC THEN ', response.data);
      })
      .catch(function (error) {
        console.log('INSIDE GET EXPENSE FUNC CATCH ', error);
        let any = {
          code: 401,
          message: '-',
        };
        setLoading(false);
        return any;
      });
    return res;
  };

  const createFriendFunc = () => {
    if (friendName === '' || friendEmail === '') {
      alert('Fields cannot be empty');
      return;
    } else {
      setLoading(true);
      dispatch(createFriend({name: friendName, email: friendEmail}, authToken));
      handleHide();
      dispatch(getAllFriends(authToken));
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
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
          <View className="h-full w-full py-4 ">
            {/*********** Heading Text ***********/}
            <View className="flex flex-row items-center justify-between px-2">
              <Text className="text-2xl font-Raleway tracking-wider px-4 py-3">
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
              <View className="px-4 py-2">
                <View className="bg-gray-200 px-2 py-3 w-full rounded-xl flex flex-row space-x-2 items-center mb-2 shadow-md">
                  <View className="px-2">
                    <Image
                      source={require('../../../assets/images/list.png')}
                      className="h-14 w-14"
                    />
                  </View>
                  <View className="px-4 py-2">
                    <Text className="text-lg tracking-wider font-semibold text-gray-700">
                      Total Balance
                    </Text>
                    <Text
                      className={`text-xsm ${
                        youPaid < youBorrowed ? 'text-pink-500' : 'text-sky-600'
                      }`}>
                      You are owed CA
                      {youPaid >= youBorrowed
                        ? ` +$${youPaid - youBorrowed}`
                        : ` -$${youBorrowed - youPaid}`}
                    </Text>
                  </View>
                </View>
              </View>

              {/** Show if loading is true */}
              {loading && (
                <View className="h-[80%] w-full flex justify-center items-center">
                  <ActivityIndicator size="large" color="#8F43EE" />
                  <Text className="mt-2 font-light text-gray-500">
                    Fetching friends
                  </Text>
                </View>
              )}

              {/*********** Map through list to render each friend ***********/}
              <ScrollView className="mb-24 px-4">
                {!loading &&
                  friend &&
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
                  <Text className="text-2xl font-Raleway font-semibold tracking-wide pt-4 pb-2">
                    Add new friend
                  </Text>
                  <Text className="text-[14px] font-Raleway font-light tracking-wide pb-2">
                    Add new friends in your app to share expense.
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
                      autoCapitalize={false}
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
