import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {API_URL} from '../../constants/actionStrings';
import {getAGroup, getAllGroups} from '../../../app/actions/groupAction';
import {getAuthUser} from '../../../app/actions/authAction';
import AddFriendModal from './AddFriendModal';
import GroupSettingModal from './GroupSettingModal';
import AddMember from './components/AddMember';
import AddExpense from './components/AddExpense';
import AddExpenseModal from '../friend/AddExpenseModal';
import showSnack from '../../utils/ShowSnack';
import {Swipeable} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';

const GroupScreen = ({navigation, route}) => {
  const {_id} = route.params.groupData;

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  // useState Variables
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expenseModal, setExpenseModal] = useState(false);
  const [youPaid, setYouPaid] = useState(0);
  const [youBorrowed, setYouBorrowed] = useState(0);
  const [totalLent, setTotalLent] = useState(0);

  // Fetch from state
  const {authToken, authUser} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAGroup(authToken, _id));
    getGroupMembers();
    dispatch(getAuthUser(authToken));
    getExpenses();
    setTotalLent(getTotalLent());
  }, []);

  useEffect(() => {
    dispatch(getAGroup(authToken, _id));
    getGroupMembers();
    dispatch(getAuthUser(authToken));
    getExpenses();
    setTotalLent(getTotalLent());
  }, [isFocused]);

  const getTotalLent = () => {
    console.log('TOTAL LENT CALLED ****** ', expenses);
    let totalLent = 0;
    let localPaid = 0;
    let localBorrowed = 0;
    expenses &&
      expenses.map(expense => {
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
  /*** Function to fetch members of current group */
  //---------------------------------------------------//
  const getGroupMembers = async () => {
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .get(`groups` + `/` + _id + `/members`)
      .then(response => {
        //console.log('INSIDE GET ALL MEMBERS FUNC THEN ', response.data.data);
        setGroupMembers(response.data.data);
      })
      .catch(function (error) {
        //console.log('INSIDE GET ALL MEMBERS FUNC CATCH ', error);
        let any = {
          code: 401,
          message: error.response.data.message,
        };
        return any;
      });
    return res;
  };

  //---------------------------------------------------//
  /*** Function to delete current group */
  //---------------------------------------------------//

  const handleDeleteGroup = async () => {
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .delete(`groups` + `/` + _id)
      .then(response => {
        //console.log('INSIDE DELETE GROUP FUNC THEN ', response.data.data);
        showSnack('Group deleted successfully');
        handleSettingHide();
        navigation.goBack();
        dispatch(getAllGroups(authToken));
      })
      .catch(function (error) {
        //console.log('IINSIDE DELETE GROUP FUNC CATCH ', error);
        let any = {
          code: 401,
          message: error.response.data.message,
        };
        return any;
      });
    return res;
  };

  //---------------------------------------------------//
  /*** Function to add expense */
  //---------------------------------------------------//
  const addExpense = async (amount, description) => {
    let amountFloat = parseFloat(amount);
    let totalMembers = groupMembers.length;
    let tempSplitWith = [];

    groupMembers.map(member => {
      let obj = {
        splitWithUser: member._id,
        splitWithAmount: amount / totalMembers,
      };
      tempSplitWith.push(obj);
    });

    let payload = {
      description: description,
      totalAmount: amountFloat,
      paidBy: [
        {
          paidByUser: authUser._id,
          paidByAmount: amountFloat,
        },
      ],
      splitWith: tempSplitWith,
      splitType: 'equally',
      group: _id,
    };

    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .post(`expenses`, payload)
      .then(response => {
        //console.log('INSIDE ADD EXPENSE FUNC THEN ', response.data);
        showSnack('Successfully added expense 💵');
        handleExpenseHide();
        getExpenses();
      })
      .catch(function (error) {
        //console.log('INSIDE ADD EXPENSE FUNC CATCH ', error);
        let any = {
          code: 401,
          message: error.response.data.message,
        };
        return any;
      });
    return res;
  };

  //---------------------------------------------------//
  /*** Function to get expenses for a group */
  //---------------------------------------------------//
  const getExpenses = async () => {
    setLoading(true);
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
      params: {groupId: _id},
    });
    const res = await instance
      .get(`expenses`)
      .then(response => {
        setExpenses(response.data.data);
        console.log('INSIDE GET GROUP EXPENSE FUNC THEN ', response.data);
        handleExpenseHide();
        setLoading(false);
        setTotalLent(getTotalLent());
      })
      .catch(function (error) {
        console.log('INSIDE GET GROUP EXPENSE FUNC CATCH ', error);
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

  const {group} = useSelector(state => state.group);

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full">
          {/*********** Banner View ***********/}
          <View className="relative pt-2">
            <Image
              source={require('../../../assets/images/bgg.jpg')}
              className="h-24 w-full"
            />
            <TouchableOpacity
              className="absolute left-1 flex justify-center items-center rounded-full"
              onPress={() => navigation.goBack()}>
              <Text className="text-2xl text-gray-500">&larr;</Text>
            </TouchableOpacity>
          </View>

          <View className="h-full w-full p-4">
            {/*********** Heading Text ***********/}
            <View className="flex flex-row items-start justify-between py-2">
              <View>
                <Text className="text-xl font-Raleway tracking-wider px-2 text-gray-800 pb-1">
                  {route.params.groupData.name}
                </Text>
                {totalLent == 0 && (
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

            {/*********** Three Butons View (Only show if there is atleast one member in group) ***********/}
            {groupMembers.length > 1 && (
              <View className="flex flex-row items-center space-x-3 justify-center mb-6">
                <TouchableOpacity className="flex flex-row items-center justify-center shadow-xl border border-[#8F43EE] bg-[#8F43EE] px-3 py-2 mt-6 rounded-md space-x-2">
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-sm font-normal text-white">
                      Settle up
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex flex-row items-center justify-center border border-[#76C893] px-3 py-2 mt-6 rounded-md space-x-2"
                  onPress={() => handleShow()}>
                  <View className="flex flex-row items-center space-x-4">
                    <Text className="text-sm font-normal text-[#184E77]">
                      Add Member
                    </Text>
                  </View>
                  <Image
                    source={require('../../../assets/images/plus.png')}
                    className="h-4 w-4"
                  />
                </TouchableOpacity>

                {expenses && (
                  <TouchableOpacity
                    className="flex flex-row items-center justify-center border border-[#76C893] px-3 py-2 mt-6 rounded-md space-x-2"
                    onPress={() => handleExpenseShow()}>
                    <View className="flex flex-row items-center space-x-4">
                      <Text className="text-sm font-normal text-[#184E77]">
                        Add Expense
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/** Show if loading is true */}
            {loading && (
              <View className="h-[80%] w-full flex justify-center items-center">
                <ActivityIndicator size="large" color="#8F43EE" />
                <Text className="mt-2 font-light text-gray-500">
                  Fetching info
                </Text>
              </View>
            )}

            {/** Single Expense Design */}
            {!loading &&
              expenses.map(expense => (
                <View
                  className="border-b pb-1 border-gray-100"
                  key={expense.date}>
                  <TouchableOpacity
                    className="flex flex-row items-center justify-between"
                    onPress={() =>
                      navigation.navigate('expenseScreen', {
                        expenseData: expense,
                      })
                    }>
                    <View className="flex flex-row justify-between items-center py-4 px-1 w-full">
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
                        <Text
                          className={`text-[12px] ${
                            expense.detailsPaid.message === 'you paid'
                              ? 'text-green-600'
                              : 'text-pink-500'
                          }`}>
                          {expense.detailsSplit.message}
                        </Text>
                        <Text
                          className={`text-[17px]  ${
                            expense.detailsPaid.message === 'you paid'
                              ? 'text-green-600'
                              : 'text-pink-500'
                          } font-light`}>
                          {'CA $' + expense.detailsSplit.amount}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}

            {/** Show when atleast two members and no expense added in group */}
            {expenses.length === 0 && groupMembers.length > 1 && (
              <AddExpense handleExpenseShow={handleExpenseShow} />
            )}

            {/** Show when no members in group */}
            {groupMembers.length == 1 && <AddMember handleShow={handleShow} />}
          </View>

          {/******************* ADD FRIEND MODAL *******************/}
          <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={handleHide}>
            <AddFriendModal
              handleHide={handleHide}
              groupId={group && group.data._id}
              authToken={authToken}
              getGroupMembers={getGroupMembers}
            />
          </Modal>

          {/******************* SETTING MODAL *******************/}
          <Modal
            visible={visibleSetting}
            onRequestClose={handleSettingHide}
            animationType="fade">
            <GroupSettingModal
              handleSettingHide={handleSettingHide}
              groupMembers={groupMembers}
              authUser={authUser}
              createdBy={group && group.data.createdBy}
              groupName={route.params.groupData.name}
              handleDeleteGroup={handleDeleteGroup}
            />
          </Modal>

          {/******************* EXPENSE MODAL *******************/}
          <Modal
            visible={expenseModal}
            onRequestClose={handleExpenseHide}
            animationType="slide">
            <AddExpenseModal
              name={route.params.groupData.name}
              addExpense={addExpense}
              handleExpenseHide={handleExpenseHide}
            />
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GroupScreen;
