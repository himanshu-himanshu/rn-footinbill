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

import CreateGroup from '../bottomNavigator/components/CreateGroup';

const GroupScreen = ({navigation}) => {
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
            <View className="flex flex-col items-start py-2">
              <Text className="text-xl font-Raleway tracking-wider px-2 text-gray-800 pb-1">
                Centennial College
              </Text>
              <Text className="text-xsm font-Raleway px-2 text-gray-600 font-light">
                No expenses to show.
              </Text>
            </View>

            {/*********** Three Butons View (Only show if there is atleast one member in group) ***********/}
            <View className="flex flex-row items-center space-x-3 justify-center">
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
                    Add Member
                  </Text>
                </View>
                <Image
                  source={require('../../../assets/images/plus.png')}
                  className="h-4 w-4"
                />
              </TouchableOpacity>

              <TouchableOpacity className="flex flex-row items-center justify-center border border-[#76C893] px-3 py-2 mt-6 rounded-md space-x-2">
                <View className="flex flex-row items-center space-x-4">
                  <Text className="text-sm font-normal text-[#184E77]">
                    Add Expense
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/** Show when no members in group */}
            <View className="h-[60%] w-full px-4 flex justify-center items-center">
              <Text className="text-gray-900 text-md tracking-wide text-center font-bold mb-2">
                You are the only one here!
              </Text>
              <Text className="text-gray-700 text-md tracking-wide text-center py-2">
                Invite friends to join group and share expenses.
              </Text>

              {/*********** Create Group Button ***********/}
              <TouchableOpacity className="flex flex-row items-center justify-center border-b border-gray-100 px-8 py-4 bg-[#76C893] mt-6 rounded-md space-x-2">
                <View className="flex flex-row items-center space-x-4">
                  <Text className="text-md font-semibold text-gray-800">
                    Add Member
                  </Text>
                </View>
                <Image
                  source={require('../../../assets/images/plus.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>
            </View>

            {/** Show whenever there is atleast one group  */}
            {/* <View className="p-2 flex flex-col">
              {groups &&
                groups.data &&
                groups.data.map((group, key) => (
                  <TouchableOpacity
                    key={key}
                    className="flex flex-row items-center justify-between p-2 py-3 shadow-lg border-b border-gray-100"
                    onPress={() => navigation.navigate('groupScreen')}>
                    <View className="flex flex-row items-center space-x-4">
                      <Image
                        source={require('../../../assets/images/meet.png')}
                        className="h-10 w-10"
                      />
                      <Text className="text-lg font-light">{group.name}</Text>
                    </View>
                    <Image
                      source={require('../../../assets/images/next.png')}
                      className="h-6 w-6"
                    />
                  </TouchableOpacity>
                ))}
            </View> */}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GroupScreen;
