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
import {Swipeable} from 'react-native-gesture-handler';
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

  const getTotalLent = () => {
    let totalLent = 0;
    expenses &&
      expenses.map(expense => {
        totalLent = totalLent + expense.detailsSplit.amount;
      });
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
          message: error.response.data.message,
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
              <TouchableOpacity className="flex flex-row items-center justify-center shadow-xl border border-[#F2921D] bg-[#F2921D] px-3 py-2 mt-6 rounded-md space-x-2 ">
                <View className="flex flex-row items-center space-x-4">
                  <Text className="text-sm font-normal text-white">
                    Settle up
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="flex flex-row items-center justify-center border border-[#F2921D] px-3 py-2 mt-6 rounded-md space-x-2 shadow-lg">
                <View className="flex flex-row items-center space-x-4">
                  <Text className="text-sm font-normal text-[#F2921D]">
                    Edit Expense
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/** Show when atleast two members and no expense added in group */}
            {/* {!loading && expenses.length === 0 && (
              <AddExpense
                handleExpenseShow={handleExpenseShow}
                friendName={route.params.friendData.name}
              />
            )} */}

            {/** Show if loading is true */}
            {/* {loading && (
              <View className="h-[50%] w-full flex justify-center items-center">
                <ActivityIndicator size="large" color="#8F43EE" />
              </View>
            )} */}

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
                        {route.params.expenseData.description}
                      </Text>
                      <Text className="text-2xl font-bold text-gray-500">
                        {'CA $' +
                          route.params.expenseData.detailsPaid.amount.toFixed(
                            2,
                          )}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-[12px] text-gray-600 font-light py-1 capitalize pt-8">
                    {`Added by ` + route.params.expenseData.createdByName}
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
                        {route.params.expenseData.detailsPaid.message +
                          ' $' +
                          route.params.expenseData.detailsPaid.amount.toFixed(
                            2,
                          )}
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
                        {route.params.expenseData.detailsSplit.message +
                          ' $' +
                          route.params.expenseData.detailsSplit.amount.toFixed(
                            2,
                          )}
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
