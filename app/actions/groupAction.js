import apiRequest from '../network/api';
import {
  API_URL,
  createGroupString,
  getAllGroupsString,
  getAGroupString,
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';
import axios from 'axios';

// ------------------ getAllGroups EndPoints  ----------------------- //
export const getAllGroups = authToken => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });

  const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {Authorization: 'Bearer ' + authToken},
  });
  const res = await instance
    .get(EndPoints.getAllGroups)
    .then(response => {
      //console.log('RESPON 123SE', response);
      dispatch({type: getAllGroupsString, payload: response});
      let any = {
        code: 200,
        message: response.data.message,
      };
      return any;
    })
    .catch(function (error) {
      let any = {
        code: 401,
        message: error.response.data.message,
      };
      return any;
    });
  return res;
};

// ------------------ getAGroup EndPoints  ----------------------- //
export const getAGroup = (authToken, groupId) => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  //console.log('FROM GET A GROUP ACTION FILE ', groupId);
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {Authorization: 'Bearer ' + authToken},
  });
  const res = await instance
    .get(EndPoints.getAGroup + `/` + groupId)
    .then(response => {
      //console.log('RESPON 123SE', groupId);
      dispatch({type: getAGroupString, payload: response});
      let any = {
        code: 200,
        message: response.data.message,
      };
      return any;
    })
    .catch(function (error) {
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
  //console.log('authToken', authToken);
  //console.log('data', data);
  const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {Authorization: 'Bearer ' + authToken},
  });
  const res = await instance
    .post(EndPoints.createAGroup, {
      name: data.name,
    })
    .then(response => {
      //console.log('RESPON 123SE', response.data);
      dispatch({type: createGroupString, payload: response});
      dispatch(getAllGroups(authToken));
      let any = {
        code: 200,
        message: response.data.message,
      };
      return any;
    })
    .catch(function (error) {
      let any = {
        code: 401,
        message: error.response.data.message,
      };
      return any;
    });
  //console.log('INSIDE CREATE GROUP', res);
  return res;
};
