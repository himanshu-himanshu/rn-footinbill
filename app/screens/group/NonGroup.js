import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Swipeable,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { API_URL } from '../../constants/actionStrings';
import { getAuthUser } from '../../../app/actions/authAction';
import AddExpense from './components/AddExpense';
import { ScrollView } from 'react-native-gesture-handler';

const GroupScreen = ({ navigation, route }) => {
  //   const {_id} = route.params.groupData;

  const dispatch = useDispatch();

  // useState Variables
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);

  // Fetch from state
  const { authToken, authUser } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAuthUser(authToken));
    getExpenses();
  }, []);

  useEffect(
    () => {
      dispatch(getAuthUser(authToken));
      getExpenses();
    },
    [route],
    [navigation],
    [visible],
  );

  //---------------------------------------------------//
  /*** Function to get expenses with a friend */
  //---------------------------------------------------//
  const getExpenses = async () => {
    setLoading(true);
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: { Authorization: 'Bearer ' + authToken },
    });
    const res = await instance
      .get(`expenses`)
      .then(response => {
        setExpenses(response.data.data);
        console.log('INSIDE GET EXPENSE FUNC THEN ', response.data);
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

  const handleHide = () => {
    setVisible(false);
  };
  const handleShow = () => {
    setVisible(true);
  };

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full -mt-14">
          {/*********** Banner View ***********/}
          <View className="relative pt-2">
            <Image
              source={require('../../../assets/images/222.jpg')}
              className="h-40 w-full bg-cover"
            />
            <TouchableOpacity
              className="absolute left-1 flex justify-center items-center rounded-full mt-14"
              onPress={() => navigation.goBack()}>
              <Text className="text-2xl text-gray-900">&larr;</Text>
            </TouchableOpacity>
          </View>

          <View className="h-full w-full py-4">
            {/*********** Heading Text ***********/}
            <View className="flex flex-row items-start justify-between py-2 px-4">
              <View>
                <Text className="text-xl font-Raleway tracking-wider px-2 text-gray-800 pb-1">
                  Non-group Expenses
                </Text>
                <Text className="text-xsm font-Raleway px-2 text-gray-600 font-light">
                  All non-group expenses will be shown here.
                </Text>
              </View>
            </View>

            {/*********** Three Butons View (Only show if there is atleast one member in group) ***********/}

            {/* <View className="flex flex-row items-center space-x-4 justify-start mb-5 px-4">
              <TouchableOpacity className="flex flex-row items-center justify-center shadow-xl border border-[#8F43EE] bg-[#8F43EE] px-3 py-2 mt-6 rounded-md space-x-2">
                <View className="flex flex-row items-center space-x-4">
                  <Text className="text-sm font-normal text-white">
                    Settle up
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="flex flex-row items-center justify-center border border-[#76C893] px-3 py-2 mt-6 rounded-md space-x-2">
                <View className="flex flex-row items-center space-x-4">
                  <Text className="text-sm font-normal text-[#184E77]">
                    Add Expense
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}

            {/** Show if loading is true */}
            {loading && (
              <View className="h-[50%] w-full flex justify-center items-center">
                <ActivityIndicator size="large" color="#8F43EE" />
              </View>
            )}

            <ScrollView className="mb-12 pb-12">
              {!loading &&
                expenses &&
                expenses.map((expense) => (
                  expense.type == "settle" ? (<View 
                    className="border-b pb-1 border-gray-100 px-4"
                    key={expense.date}>
                    <TouchableOpacity className="flex flex-row items-center justify-between">
                      <View className="flex flex-row justify-between items-center px-1 py-4 w-full">
                        <View className="flex flex-row items-center space-x-3">
                          <Image
                            source={require('../../../assets/images/bill.png')}
                            className="h-11 w-11"
                          />
                          <View className="flex space-y-1">
                            <Text className="text-md font-normal capitalize">
                              {expense.description}
                            </Text>
                            <Text className="text-md font-light text-gray-600">
                              {expense.message +
                                ' CA $ ' +
                                expense.amount.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>) : (<View
                    className="border-b pb-1 border-gray-100 px-4"
                    key={expense.id}>
                    <TouchableOpacity className="flex flex-row items-center justify-between">
                      <View className="flex flex-row justify-between items-center px-1 py-4 w-full">
                        <View className="flex flex-row items-center space-x-3">
                          <Image
                            source={require('../../../assets/images/bill.png')}
                            className="h-11 w-11"
                          />
                          <View className="flex space-y-1">
                            <Text className="text-md font-normal capitalize">
                              {expense.description}
                            </Text>
                            <Text className="text-md font-light text-gray-600">
                              {expense.detailsPaid.message +
                                ' CA $ ' +
                                expense.detailsPaid.amount.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                        <View className="flex space-y-1 justify-end items-end">
                          <Text className="text-[12px] text-gray-800">
                            {expense.detailsSplit.message}
                          </Text>
                          <Text className="text-[17px] text-sky-600 font-light">
                            {'CA $ ' + expense.detailsSplit.amount.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>)
                ))}
            </ScrollView>
            {/** Show when atleast two members and no expense added in group */}
            {false && <AddExpense handleExpenseShow={handleExpenseShow} />}
          </View>

          {/******************* EXPENSE MODAL *******************/}
          {/* <Modal
            visible={expenseModal}
            onRequestClose={handleExpenseHide}
            animationType="slide">
            <AddExpenseModal
              name={route.params.groupData.name}
              addExpense={addExpense}
              handleExpenseHide={handleExpenseHide}
            />
          </Modal> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GroupScreen;
