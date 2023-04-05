import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {API_URL} from '../../constants/actionStrings';
import AddExpense from './components/AddExpense';
import AddExpenseModal from './AddExpenseModal';
import showSnack from '../../utils/ShowSnack';
import {Swipeable} from 'react-native-gesture-handler';
import FriendSettingModal from './FriendSettingModal';

const FriendScreen = ({navigation, route}) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState([]);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [totalLent, setTotalLent] = useState(0);
  const [youPaid, setYouPaid] = useState(0);
  const [youBorrowed, setYouBorrowed] = useState(0);

  const {authUser, authToken} = useSelector(state => state.auth);

  useEffect(() => {
    setLoading(true);
    getExpenses();
    setTotalLent(getTotalLent());
  }, []);

  useEffect(() => {
    setTotalLent(getTotalLent());
  }, [expenses, loading]);

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

  const getTotalLent = () => {
    let totalLent = 0;
    let localPaid = 0;
    let localBorrowed = 0;
    expenses &&
      expenses.map(expense => {
        console.log('EXPENSE FROM FRIENDS', expense);
        totalLent = totalLent + expense.detailsSplit.amount;

        if (expense.detailsPaid.message == 'you paid') {
          localPaid = localPaid + expense.detailsPaid.amount / 2;
          setYouPaid(localPaid);
        }
        if (expense.detailsPaid.message != 'you paid') {
          localBorrowed = localBorrowed + expense.detailsPaid.amount / 2;
          setYouBorrowed(localBorrowed);
        }
      });
    console.log('PAID: ', youPaid, ' AND BORROWED: ', youBorrowed);
    return totalLent;
  };

  //---------------------------------------------------//
  /*** Function to get expenses with a friend */
  //---------------------------------------------------//
  const getExpenses = async () => {
    setLoading(true);
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .get(`expenses`)
      .then(response => {
        const dummyExpense = response.data.data;
        const friendExpense = dummyExpense.filter(expense => {
          if (friendId in expense.allDetails === true) {
            return expense;
          }
        });
        setExpenses(friendExpense);
        console.log('INSIDE GET EXPENSE FUNC THEN ', response.data);
        handleExpenseHide();
        setLoading(false);
      })
      .catch(function (error) {
        console.log('INSIDE GET EXPENSE FUNC CATCH ', error);
        let any = {
          code: 401,
          message: error.response.data.message,
        };
        setLoading(false);
        return any;
      });
    return res;
  };

  //---------------------------------------------------//
  /*** Function to add expense */
  //---------------------------------------------------//
  const addExpense = async (amount, description) => {
    let amountFloat = parseFloat(amount);
    let payload = {
      description: description,
      totalAmount: amountFloat,
      paidBy: [
        {
          paidByUser: authUser._id,
          paidByAmount: amountFloat,
        },
      ],
      splitWith: [
        {
          splitWithUser: authUser._id,
          splitWithAmount: amountFloat / 2,
        },
        {
          splitWithUser: route.params.friendData._id,
          splitWithAmount: amountFloat / 2,
        },
      ],
      splitType: 'equally',
    };

    console.log(payload);

    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .post(`expenses`, payload)
      .then(response => {
        console.log('INSIDE ADD EXPENSE FUNC THEN ', response.data);
        showSnack('Successfully added expense 💵');
        //handleExpenseHide();
        getExpenses();
      })
      .catch(function (error) {
        console.log('INSIDE ADD EXPENSE FUNC CATCH ', error);
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
                <Text className="text-[12px] font-Raleway tracking-wider px-2 text-gray-800 pb-1">
                  Your transactions with:
                </Text>
                <Text className="text-xl font-Raleway tracking-wider px-2 text-gray-800 pb-1 capitalize">
                  {route.params.friendData.name}
                </Text>
                {totalLent === 0 && (
                  <Text className="text-xsm font-Raleway px-2 text-gray-600 font-light">
                    No expenses to show.
                  </Text>
                )}
                {totalLent !== 0 && (
                  <Text
                    className={`text-xsm font-Raleway px-2 ${
                      youPaid >= youBorrowed
                        ? 'text-green-600'
                        : 'text-pink-500'
                    } font-semibold`}>
                    Total Balance:{' '}
                    {youPaid >= youBorrowed
                      ? ` +$${youPaid - youBorrowed}`
                      : ` -$${youBorrowed - youPaid}`}
                  </Text>
                )}
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
            {!loading && expenses.length === 0 && (
              <AddExpense
                handleExpenseShow={handleExpenseShow}
                friendName={route.params.friendData.name}
              />
            )}

            {/** Show if loading is true */}
            {loading && (
              <View className="h-[50%] w-full flex justify-center items-center">
                <ActivityIndicator size="large" color="#8F43EE" />
              </View>
            )}

            {/** Single Expense Design */}
            <ScrollView className="mb-12 pb-12">
              {!loading &&
                expenses.map(expense => (
                  <View
                    className="border-b pb-3 border-gray-100"
                    key={expense.date}>
                    <TouchableOpacity className="flex flex-row items-center justify-between">
                      <View className="flex flex-row justify-between items-center p-4 w-full">
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
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
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
              name={route.params.friendData.name}
              addExpense={addExpense}
              handleExpenseHide={handleExpenseHide}
            />
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FriendScreen;
