import apiRequest from '../network/api';
import {
  getScoreViaUserId,
  isLoading,
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';
import AsyncStorage from '@react-native-community/async-storage';

// ------------------ Login EndPoints  ----------------------- //
export const getScoreViaUserId = user => async dispatch => {
  dispatch({type: isLoading, payload: {loader: true}});
  let response = await apiRequest(EndPoints.getScoreViaUserId, 'POST', loginData);
  if (response && response.success) {
    AsyncStorage.setItem('userToken', response.token);
    AsyncStorage.setItem('user', JSON.stringify(response.data));
    dispatch({type: getScoreViaUserId, payload: {user: response.data}});
  }
  dispatch({type: isLoading, payload: {loader: false}});
  return response ? response : false;
};
