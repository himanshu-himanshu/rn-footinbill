import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const AddExpense = ({handleExpenseShow, friendName}) => {
  return (
    <View className="h-[60%] w-full px-4 flex justify-center items-center">
      <Text className="text-gray-900 text-md tracking-wide text-center font-bold mb-2">
        Nothing to show here!
      </Text>
      <Text className="text-gray-700 text-md tracking-wide text-center py-2 capitalize">
        {`Click on Add Expense button to add an expense with ${friendName}.`}
      </Text>

      {/*********** Add Member Button ***********/}
      <TouchableOpacity
        className="flex flex-row items-center justify-center shadow-xl px-8 py-4 bg-[#E96479] mt-6 rounded-md space-x-2"
        onPress={handleExpenseShow}>
        <View className="flex flex-row items-center space-x-4">
          <Text className="text-md font-semibold text-gray-100">
            Add Expense
          </Text>
        </View>
        <Image
          source={require('../../../../assets/images/expenses.png')}
          className="h-6 w-6"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddExpense;
