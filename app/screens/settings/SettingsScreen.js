import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logoutUser} from '../../actions/authAction';
import showSnack from '../../utils/ShowSnack';

export const SettingsScreen = ({navigation}) => {
  
  const dispatch = useDispatch();

  let performLogout = () => {
    AsyncStorage.removeItem('userToken');
    dispatch(logoutUser());
    navigation.navigate('loginScreen');
    showSnack('See you soon!');
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>

      <View style={styles.inputBox}>
        <TouchableOpacity onPress={performLogout}>
          <Text style={styles.logoutButton}>
            <AntDesign name="poweroff" size={25} /> Logout
          </Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#2a2a2a02',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  inputBox: {
    margin: 5,
    padding: 5,
  },
  logoutButton: {
    padding: 10,
    fontSize: 24,
    backgroundColor: '#ff000082',
    color: 'white',
    textAlign: 'center',
  },
});
export default SettingsScreen;
