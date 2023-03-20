import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FriendSettingModal from './FriendSettingModal';
import {useSelector, useDispatch} from 'react-redux';

import {API_URL} from '../../constants/actionStrings';
import AddExpense from './components/AddExpense';
import AddExpenseModal from './AddExpenseModal';
import showSnack from '../../utils/ShowSnack';

const FriendScreen = ({navigation, route}) => {
  const [expenses, setExpenses] = useState([]);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);

  const {authToken} = useSelector(state => state.auth);

  useEffect(() => {
    getExpenses();
  }, []);

  //console.log('EXPENSES ARRAY', expenses[0]);

  const handleSettingHide = () => {
    setVisibleSetting(false);
  };
  const handleSettingShow = () => {
    setVisibleSetting(true);
  };

  const handleExpenseHide = () => {
    setExpenseModal(false);
  };
  const handleExpenseShow = () => {
    setExpenseModal(true);
  };

  const friendId = route.params.friendData._id;
  console.log('FRIEND DATA', route.params.friendData, friendId);

  //---------------------------------------------------//
  /*** Function to get expenses of group */
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
        const friendExpesne = dummyExpense.filter(expense => {
          if (friendId in expense.allDetails === true) {
            return expense;
          }
        });
        setExpenses(friendExpesne);
        console.log('INSIDE GET EXPENSE FUNC THEN ', response.data);
        handleExpenseHide();
      })
      .catch(function (error) {
        console.log('INSIDE GET EXPENSE FUNC CATCH ', error);
        let any = {
          code: 401,
          message: error.response.data.message,
        };
        return any;
      });
    return res;
  };

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full -mt-14">
          {/*********** Banner View ***********/}
          <View className="relative pt-2">
            <Image
              source={require('../../../assets/images/ppp.jpg')}
              className="h-40 w-full"
            />
            <TouchableOpacity
              className="absolute left-1 flex justify-center items-center rounded-full mt-14 ml-4"
              onPress={() => navigation.goBack()}>
              <Text className="text-2xl text-gray-900">&larr;</Text>
            </TouchableOpacity>
          </View>

          <View className="h-full w-full p-4">
            {/*********** Heading Text ***********/}
            <View className="flex flex-row items-start justify-between py-2">
              <View>
                <Text className="text-xl font-Raleway tracking-wider px-2 text-gray-800 pb-1 capitalize">
                  {route.params.friendData.name}
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

            {/*********** Two Butons View ***********/}
            {true && (
              <View className="flex flex-row items-center space-x-4 justify-start mb-4">
                <TouchableOpacity className="flex flex-row items-center justify-center shadow-xl border border-[#E96479] bg-[#E96479] px-3 py-2 mt-6 rounded-md space-x-2 ">
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-sm font-normal text-white">
                      Settle up
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex flex-row items-center justify-center border border-[#E96479] px-3 py-2 mt-6 rounded-md space-x-2 shadow-lg"
                  onPress={() => handleExpenseShow()}>
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-sm font-normal text-[#E96479]">
                      Add Expense
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {/** Show when atleast two members and no expense added in group */}
            {expenses.length === 0 && (
              <AddExpense
                handleExpenseShow={handleExpenseShow}
                friendName={route.params.friendData.name}
              />
            )}

            {/** Single Expense Design */}
            {expenses.map(expense => (
              <View
                className="pt-4 border-b pb-4 border-gray-100"
                key={expense.date}>
                <TouchableOpacity className="flex flex-row items-center justify-between">
                  <View className="flex flex-row items-center space-x-4">
                    <Image
                      source={require('../../../assets/images/bag.png')}
                      className="h-10 w-10"
                    />
                    <View className="flex space-y-1">
                      <Text className="text-md font-normal">
                        {expense.description}
                      </Text>
                      <Text className="text-md font-light text-gray-500">
                        {expense.detailsPaid.message +
                          ' CA $' +
                          expense.detailsPaid.amount}
                      </Text>
                    </View>
                  </View>
                  <View className="flex space-y-1 justify-end items-end">
                    <Text className="text-[12px] text-gray-800">
                      {expense.detailsSplit.message}
                    </Text>
                    <Text className="text-[17px] text-sky-600 font-light">
                      {'CA $' + expense.detailsSplit.amount}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/******************* SETTING MODAL *******************/}
          <Modal
            visible={visibleSetting}
            onRequestClose={handleSettingHide}
            animationType="fade">
            <FriendSettingModal
              handleSettingHide={handleSettingHide}
              friendData={route.params.friendData}
            />
          </Modal>

          {/******************* EXPENSE MODAL *******************/}
          <Modal
            visible={expenseModal}
            onRequestClose={handleExpenseHide}
            animationType="slide">
            <AddExpenseModal
              getExpenses={getExpenses}
              handleExpenseHide={handleExpenseHide}
              name={route.params.friendData.name}
              friendId={route.params.friendData._id}
            />
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FriendScreen;
