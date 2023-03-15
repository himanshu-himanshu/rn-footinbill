import apiRequest from '../network/api';
import {
  API_URL,
  createFriendString,
  getAllFriendsString,
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';
import axios from 'axios';
import {err} from 'react-native-svg/lib/typescript/xml';

// ------------------ getAllFriends EndPoints  ----------------------- //
export const getAllFriends = authToken => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });

  const instance = axios.create({
    baseURL: API_URL,
    timeout: 2000,
    headers: {Authorization: 'Bearer ' + authToken},
  });
  const res = await instance
    .get(EndPoints.getAllFriends)
    .then(response => {
      console.log('INSIDE THEN GET ALL FRIENDS ****** ', response);
      dispatch({type: getAllFriendsString, payload: response});
      let any = {
        code: 200,
        message: response.data.message,
      };
      return any;
    })
    .catch(function (error) {
      console.log('GET ALL FRIENDS CATCH', error);
      let any = {
        code: 401,
        message: error.response.data.message,
      };
      return any;
    });
  return res;
};

// ------------------ createFriend EndPoints  ----------------------- //
export const createFriend = (data, authToken) => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  console.log('authToken', authToken);
  console.log('data', data);
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {Authorization: 'Bearer ' + authToken},
  });
  const res = await instance
    .post(EndPoints.createAFriend, {
      name: data.name,
      email: data.email,
    })
    .then(response => {
      console.log('INSIDE THEN CREATE FRIEND ****** ', response.data);
      dispatch({type: createFriendString, payload: response});
      let any = {
        code: 200,
        message: response.data.message,
      };
      return any;
    })
    .catch(function (error) {
      console.log(
        'INSIDE CATCH CREATE FRIEND ****** ',
        error.response.data.message,
      );
      let any = {
        code: 401,
        message: error.response.data.message,
      };
      return any;
    });
  return res;
};
