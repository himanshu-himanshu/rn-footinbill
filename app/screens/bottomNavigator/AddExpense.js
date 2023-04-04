import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Modal,
  CheckBox,
  ActivityIndicator,
  Button,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import CreateGroup from './components/CreateGroup';
import {createGroup, getAllGroups} from '../../../app/actions/groupAction';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';

const AddExpense = ({navigation}) => {
  // State Variables
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const {authToken} = useSelector(state => state.auth);

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(getAllGroups(authToken));
  //   setLoading(false);
  // }, []);

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full">
          <View className="h-full w-full py-4">
            {/*********** Heading Text ***********/}
            <View className="flex flex-col items-start justify-center px-2 h-[10%">
              <Text className="text-2xl font-Raleway tracking-wider px-4">
                Add an expense
              </Text>
            </View>

            <View className="h-[90%] px-2 flex items-center mt-4">
              {/*********** Header View ***********/}
              <View className="flex w-full pb-6 px-6 mb-18 rounded-lg">
                <Text className="text-lg font-Raleway tracking-wide pt-4 text-gray-700">
                  With you and:
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="py-4 flex flex-row space-x-2">
                  <TouchableOpacity className="text-lg font-Raleway tracking-wide bg-[#F3E8FF] p-2 rounded-full">
                    <Text className="text-blue-500">Gurminder</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="text-lg font-Raleway tracking-wide bg-[#F3E8FF] p-2 rounded-full">
                    <Text className="text-blue-500">Nirav Goswami</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="text-lg font-Raleway tracking-wide bg-[#F3E8FF] p-2 rounded-full">
                    <Text className="text-blue-500">Sprint</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="text-lg font-Raleway tracking-wide bg-[#F3E8FF] p-2 rounded-full">
                    <Text className="text-blue-500">Himanshu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="text-lg font-Raleway tracking-wide bg-[#F3E8FF] p-2 rounded-full">
                    <Text className="text-blue-500">Samir</Text>
                  </TouchableOpacity>
                </ScrollView>
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

                <TouchableOpacity className="w-[90%] mx-auto shadow-xl  border border-[#19A7CE] rounded-md my-4 px-2 py-2">
                  <Text className="text-center text-md text-[#19A7CE]">
                    Paid by you and split equally
                  </Text>
                </TouchableOpacity>

                {/*********** Add Expense Button View ***********/}
                <View className="w-[90%] mx-auto shadow-xl bg-[#19A7CE] rounded-md mt-6">
                  <TouchableOpacity>
                    <Text className="text-center px-10 py-4 text-gray-100 font-bold text-xl rounded-full capitalize">
                      Share expense
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddExpense;
