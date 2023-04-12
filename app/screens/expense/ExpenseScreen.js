import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {API_URL} from '../../constants/actionStrings';
import showSnack from '../../utils/ShowSnack';

const ExpenseScreen = ({navigation, route}) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState([]);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [totalLent, setTotalLent] = useState(0);

  const {authUser, authToken} = useSelector(state => state.auth);

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

  const settleUpExpense = async (expense, authUser) => {
    console.log('EXPENSE LINE 45-00-----0-0-', expense, authUser);
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    let amt = expense.allDetails[authUser.id].owe;
    let data = {
      payer: authUser.id,
      recipient: expense.paidBy,
      expense: expense.id,
      settleAmount: amt,
    };
    console.log('data being passed ---1023-1203-1203-2103-120321-0', data);
    const res = await instance
      .put('expenses/settle', data)
      .then(response => {
        console.log('inside settle up THEN ', response.data);
        showSnack(response.data.message);
        getGroupMembers();
        handleHide();
      })
      .catch(function (error) {
        let any = {
          code: 401,
          message: '-',
          // message: error.response.data.message,
        };
        return any;
      });
    return res;
  };

  const getTotalLent = () => {
    let totalLent = 0;
    expenses &&
      expenses.map(expense => {
        totalLent = totalLent + expense.detailsSplit.amount;
      });
    return totalLent;
  };
  let routeExpenseData = route.params.expenseData;
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
        console.log('dummyExpense 1203812098321098', dummyExpense);
        const friendExpesne = dummyExpense.filter(expense => {
          if (friendId in expense.allDetails === true) {
            return expense;
          }
        });
        setExpenses(friendExpesne);
        console.log('INSIDE GET EXPENSE FUNC THEN ', response.data);
        handleExpenseHide();
        setLoading(false);
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

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full -mt-14">
          {/*********** Banner View ***********/}
          <View className="relative pt-2">
            <Image
              source={require('../../../assets/images/expense.jpg')}
              className="h-48 w-full"
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
                  Expense details
                </Text>
                <Text className="text-[14px] font-Raleway font-light tracking-wide px-2 text-gray-700 pb-1">
                  Below are the details for the expense.
                </Text>
              </View>
            </View>

            {/*********** Two Butons View ***********/}
            <View className="flex flex-row items-center space-x-4 justify-start mb-4">
              {authUser.id == routeExpenseData.paidBy ? (
                ''
              ) : (
                <TouchableOpacity
                  onPress={() => settleUpExpense(routeExpenseData, authUser)}
                  className="flex flex-row items-center justify-center shadow-xl border border-[#F2921D] bg-[#F2921D] px-3 py-2 mt-6 rounded-md space-x-2 ">
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-sm font-normal text-white">
                      Settle up
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/** Single Expense Design */}
            <View className="">
              <View className="flex flex-row justify-between border-b pb-1 border-gray-100">
                <View className="flex flex-row justify-between items-center py-4 px-1 w-full">
                  <View className="flex flex-row items-center space-x-4">
                    <Image
                      source={require('../../../assets/images/receipt.png')}
                      className="h-14 w-14"
                    />
                    <View className="flex space-y-1">
                      <Text className="text-lg font-light">
                        {routeExpenseData.description}
                      </Text>
                      <Text className="text-2xl font-bold text-gray-500">
                        {'CA $' +
                          routeExpenseData.detailsPaid.amount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-[12px] text-gray-600 font-light py-1 capitalize pt-8">
                    {`Added by ` + routeExpenseData.createdByName}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row justify-between mt-2 px-2">
                <View className="flex flex-row justify-between items-center py-2 px-1 w-full">
                  <View className="flex flex-row items-center space-x-4">
                    <Image
                      source={require('../../../assets/images/user12.png')}
                      className="h-9 w-9"
                    />
                    <View className="flex space-y-1">
                      <Text className="text-lg font-light capitalize">
                        {routeExpenseData.detailsPaid.message +
                          ' $' +
                          routeExpenseData.detailsPaid.amount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex flex-row justify-between ml-6">
                <View className="flex flex-row justify-between items-center py-2 px-1 w-full">
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-lg text-gray-300">&rarr;</Text>
                    <Image
                      source={require('../../../assets/images/user12.png')}
                      className="h-9 w-9"
                    />
                    <View className="flex space-y-1">
                      <Text className="text-md font-light capitalize">
                        {routeExpenseData.detailsSplit.message +
                          ' $' +
                          routeExpenseData.detailsSplit.amount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ExpenseScreen;
