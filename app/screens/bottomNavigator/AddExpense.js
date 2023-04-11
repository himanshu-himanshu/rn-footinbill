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

import { getAllFriends } from '../../../app/actions/friendAction';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

const AddExpense = ({ navigation }) => {
  // State Variables
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState([]);
  const { authToken } = useSelector(state => state.auth);
  const { friend } = useSelector(state => state.friend);

  const [friends, setFriends] = useState();
  //   [
  //   {
  //     label: 'Gurminder',
  //     value: 'Gurminder',
  //   },
  //   {
  //     label: 'Nirav',
  //     value: 'Nirav',
  //   },
  //   {
  //     label: 'Himanshu',
  //     value: 'Himanshu',
  //   },
  // ]

  console.log(currentValue);

  useEffect(() => {
    dispatch(getAllFriends(authToken));
  }, []);

  useEffect(() => {
    let k = [];
    friend.data.map((friend, index) => {
      let obj = {
        label: friend.name,
        value: friend.name
      };
      k.push(obj);
    });
    setFriends(k);
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(getAllGroups(authToken));
  //   setLoading(false);
  // }, []);

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full -mt-[80px]">
          <View className="h-full w-full py-4">
            <View className="relative pt-2">
              <Image
                source={require('../../../assets/images/0000.jpg')}
                className="h-40 w-full"
              />
            </View>
            {/*********** Heading Text ***********/}
            <View className="flex flex-col items-start justify-center px-2 h-[10%]">
              <Text className="text-2xl font-Raleway tracking-wider px-4">
                Add an expense
              </Text>
            </View>

            <View className="h-[90%] px-2 flex items-center">
              {/*********** Header View ***********/}
              <View className="flex w-full pb-6 px-6 mb-[10px] rounded-lg z-40">
                <Text className="text-lg font-Raleway tracking-wide pt-4 text-gray-700 mb-4">
                  With you and:
                </Text>

                <DropDownPicker
                  items={friends}
                  open={isOpen}
                  value={currentValue}
                  setOpen={() => setIsOpen(!isOpen)}
                  setValue={val => setCurrentValue(val)}
                  maxHeight={120}
                  autoScroll
                  placeholder="Select friends"
                  placeholderStyle={{ color: '#333333' }}
                  multiple={true}
                  min={1}
                  mode="BADGE"
                  badgeColors={['#19376D', '#8F43EE', '#245953']}
                  badgeDotColors={['white']}
                  badgeTextStyle={{ color: 'white' }}
                />
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
