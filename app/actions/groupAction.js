import apiRequest from '../network/api';
import {
  API_URL,
  createGroupString,
  getAllGroupsString,
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';
import axios from 'axios';

// ------------------ getAllGroups EndPoints  ----------------------- //
export const getAllGroups = (authToken) => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });

  const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: { 'Authorization': 'Bearer ' + authToken }
  });
  const res = await instance.get(EndPoints.getAllGroups)
    .then(response => {
      console.log('RESPON 123SE', response);
      dispatch({ type: getAllGroupsString, payload: response });
      let any = {
        code: 200,
        message: response.data.message,
      };
      return any;
    }).catch(function (error) {
      let any = {
        code: 401,
        message: error.response.data.message,
      };
      return any;
    });
  return res;
};

// ------------------ createGroup EndPoints  ----------------------- //
export const createGroup = (data, authToken) => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  console.log('authToken', authToken);
  console.log('data', data);
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: { 'Authorization': 'Bearer ' + authToken }
  });
  const res = await instance.post(EndPoints.createAGroup,
    {
      name: data.name
    })
    .then(response => {
      console.log('RESPON 123SE', response.data);
      dispatch({ type: createGroupString, payload: response });
      let any = {
        code: 200,
        message: response.data.message,
      };
      return any;
    }).catch(function (error) {
      let any = {
        code: 401,
        message: error.response.data.message,
      };
      return any;
    });
  return res;
};
