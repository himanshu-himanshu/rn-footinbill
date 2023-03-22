import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';

const AddExpenseModal = ({handleExpenseHide, name, addExpense}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpenseClick = () => {
    if (description === '' || amount === '') {
      alert('Values cannot be empty');
      return;
    } else {
      addExpense(amount, description);
    }
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
          {/*********** Description Input View ***********/}
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

          {/*********** Amount Input View ***********/}
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
              keyboardType="number-pad"
            />
          </View>

          <TouchableOpacity className="w-[90%] mx-auto shadow-xl  border border-[#E96479] rounded-md my-4 px-2 py-2">
            <Text className="text-center text-md text-[#E96479]">
              Paid by you and split equally
            </Text>
          </TouchableOpacity>

          {/*********** Add Friend Button View ***********/}
          <View className="w-[90%] mx-auto shadow-xl bg-[#E96479] rounded-md mt-6">
            <TouchableOpacity onPress={() => handleAddExpenseClick()}>
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
