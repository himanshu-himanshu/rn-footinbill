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
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../../constants/actionStrings';
import showSnack from '../../utils/ShowSnack';

const AddExpenseModal = ({handleExpenseHide, name, friendId, getExpenses}) => {
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();

  const {authUser, authToken} = useSelector(state => state.auth);

  console.log(authUser);
  console.log(friendId);

  //---------------------------------------------------//
  /*** Function to add expense */
  //---------------------------------------------------//
  const addExpense = async () => {
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
          splitWithUser: friendId,
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
        handleExpenseHide();
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
    <SafeAreaView>
      <View className="h-full">
        {/*********** Header View ***********/}
        <View className="flex px-4">
          <TouchableOpacity onPress={handleExpenseHide}>
            <Text className="text-2xl text-gray-500">&larr;</Text>
          </TouchableOpacity>
        </View>
        <View className="flex w-full justify-center items-center pb-6">
          <Image
            source={require('../../../assets/images/exp.jpg')}
            className="h-44 w-52"
          />
          <Text className="text-2xl font-Raleway font-semibold tracking-wide pt-4">
            Add An Expense
          </Text>
          <Text className="text-gray-500 py-1">With {name}</Text>
        </View>

        {/*********** Inputs View ***********/}
        <View className="w-full h-screen bg-white">
          {/*********** Name Input View ***********/}
          <View className="flex w-[90%] flex-row justify-center items-center mx-auto my-2 rounded-sm">
            <Image
              source={require('../../../assets/images/desc.png')}
              className="h-8 w-8"
            />
            <TextInput
              onChangeText={value => setDescription(value)}
              placeholder="Description"
              name="name"
              className="p-4 text-xl text-gray-600 rounded-md w-[85%]"
              autoCapitalize="none"
            />
          </View>

          {/*********** Email Input View ***********/}
          <View className="flex w-[90%] flex-row justify-center items-center mx-auto my-2 rounded-sm">
            <Image
              source={require('../../../assets/images/amount.png')}
              className="h-8 w-8"
            />
            <TextInput
              onChangeText={value => setAmount(value)}
              placeholder="$ 0.0"
              name="email"
              className="p-4 text-xl text-gray-600 rounded-md w-[85%]"
              autoCapitalize="none"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity className="w-[90%] mx-auto shadow-xl  border border-[#E96479] rounded-md my-4 px-2 py-2">
            <Text className="text-center text-md text-[#E96479]">
              Paid by you and split equally
            </Text>
          </TouchableOpacity>

          {/*********** Add Friend Button View ***********/}
          <View className="w-[90%] mx-auto shadow-xl bg-[#E96479] rounded-md mt-6">
            <TouchableOpacity onPress={() => addExpense()}>
              <Text className="text-center px-10 py-4 text-gray-100 font-bold text-xl rounded-full capitalize">
                Share expense
              </Text>
            </TouchableOpacity>
          </View>

          {/*********** Cancel Button View ***********/}
          <TouchableOpacity onPress={handleExpenseHide}>
            <Text className="text-center px-10 py-4 text-pink-700 text-md rounded-full mt-6">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddExpenseModal;
