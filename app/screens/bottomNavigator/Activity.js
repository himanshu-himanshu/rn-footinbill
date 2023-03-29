import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../../constants/actionStrings';
import {useIsFocused} from '@react-navigation/native';

const Activity = ({navigation, route}) => {
  const isFocused = useIsFocused();
  console.log(navigation, 'AND', route);
  // useState Variables
  const [loading, setLoading] = useState(false);
  let [recentActivites, setRecentActivities] = useState([]);

  // Fetch from state
  const {authToken} = useSelector(state => state.auth);

  useEffect(() => {
    setLoading(true);
    getRecentActivities();
    console.log('ACTIVITIES ARRAY', recentActivites);
  }, []);

  useEffect(() => {
    setLoading(true);
    getRecentActivities();
    console.log('ACTIVITIES ARRAY', recentActivites);
  }, [isFocused]);

  //-----------------------------------------------------------//
  /* Function to fetch recent activities for a current user */
  //----------------------------------------------------------//
  const getRecentActivities = async () => {
    const instance = axios.create({
      baseURL: API_URL,
      timeout: 2500,
      headers: {Authorization: 'Bearer ' + authToken},
    });
    const res = await instance
      .get('activities')
      .then(response => {
        console.log(
          'INSIDE GET RECENT ACT FUNC THEN AGAIN',
          response.data.data,
        );
        setRecentActivities(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log('INSIDE GET RECENT ACT FUNC CATCH ', error);
        let any = {
          code: 401,
          message: error.response.data.message,
        };
        return any;
      });
    return res;
  };

  function getImages(type) {
    if (type == 'group_created') {
      return (
        <Image
          source={require(`../../../assets/images/meet.png`)}
          className="h-8 w-8"
        />
      );
    } else if (type == 'group_deleted') {
      return (
        <Image
          source={require(`../../../assets/images/delete.png`)}
          className="h-8 w-8"
        />
      );
    } else if (type == 'group_member_added') {
      return (
        <Image
          source={require(`../../../assets/images/plus.png`)}
          className="h-8 w-8"
        />
      );
    } else if (type == 'expense_created') {
      return (
        <Image
          source={require(`../../../assets/images/receipt.png`)}
          className="h-8 w-8"
        />
      );
    }
  }

  return (
    <View className="w-full h-screen bg-white">
      <SafeAreaView>
        <View className="w-full h-full">
          <View className="h-full w-full py-4">
            {/** Heading Text **/}
            <View className="flex flex-row items-center justify-between px-4">
              <Text className="text-2xl font-Raleway tracking-wider p-4">
                Recent activities
              </Text>
            </View>
            {/** Single Expense Design */}
            <ScrollView className="mb-24">
              {!loading &&
                recentActivites.map(activity => (
                  <View
                    className="border-b pb-1 border-gray-100 px-4"
                    key={activity.date}>
                    <TouchableOpacity className="flex flex-row items-center justify-between">
                      <View className="flex flex-row justify-between items-center py-4 px-1 w-full">
                        <View className="flex flex-row items-center space-x-3">
                          {getImages(activity.activityType)}
                          <View className="flex flex-col space-y-2">
                            <Text className="text-[14px] font-bold">
                              {activity.description}
                            </Text>
                            <Text className="text-[12px] text-gray-800">
                              {activity.date}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Activity;
