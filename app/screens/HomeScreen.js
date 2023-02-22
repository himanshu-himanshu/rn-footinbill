import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showSnack from '../utils/ShowSnack';
import BottomNavigator from './bottomNavigator/BottomNavigator';

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    // dispatch(getAllPatientsOfAUser(user.id));
  }, []);

  return <BottomNavigator />;
};

export default HomeScreen;
