import apiRequest from '../network/api';
import axios from 'axios';
import {
  loginString,
  isLoadingString,
  updateProfileString,
  getAllPatientsOfAUserString,
  getAPatientsInfoString,
  logOutString,
  registerPatientString,
  updateAuthUserString,
  API_URL,
  sendForgotPasswordOTPEmailString
} from '../constants/actionStrings';
// import {
//   AsyncStorage
// } from 'react-native';
import EndPoints from '../constants/endPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

// -------------  set user details ------- //
export const setUserDetails = () => async dispatch => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    dispatch({ type: loginString, payload: { user: JSON.parse(user) } });
  }
};
// ------------------ Login User  ----------------------- //
export const loginUser = loginData => async dispatch => {
  axios.post(API_URL + EndPoints.signIn, loginData)
    .then(function (response) {
      if (response && response.data.success) {
        AsyncStorage.setItem('userToken', response.data.access_token);
        AsyncStorage.setItem('user', JSON.stringify(response.data.data));
        dispatch({ type: loginString, payload: response.data });
      }
      dispatch({ type: isLoadingString, payload: { loader: false } });
      return response ? response.data : false;
    }).catch(function (error) {
      // handle error
      console.log('error', error.response.data.message);
      alert(error.response.data.message);
    })

};

// ----------------Register User--------------------- //
export const registerUser = (signUpData) => async dispatch => {

  dispatch({ type: isLoadingString, payload: { loader: true } });
  // const response = await apiRequest(EndPoints.signUp, 'POST', signUpData);
  let url = API_URL + EndPoints.signUp;
  axios.post(url, signUpData)
    .then(function (response) {
      if (response && response.data.success) {
        AsyncStorage.setItem('userToken', response.data.access_token);
        // AsyncStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: loginString, payload: response.data });
      }
      dispatch({ type: isLoadingString, payload: { loader: false } });
    }).catch(function (error) {
      // handle error
      
    })
};

// ----------------Verify OTP--------------------- //
export const verifyForgotPasswordOTP = payload => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  console.log('data', payload);
  let url = API_URL + EndPoints.sendForgotPasswordOTPEmail + '/' + payload.otp;
  console.log('url', url);
  const res = await axios.post(url, payload)
    .then(function (response) {
      return response.data;
    }).catch(function (error) {
      // handle error
      // console.log('rerrrror-------', error.response.data);
      return error.response.data;
    })
  console.log('res 123 123 //////', res);
  return res;
};

// ------------------ Google Login  ----------------------- //
export const handleGoogleLogIn = googleloginData => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(
    EndPoints.googleLogin,
    'POST',
    googleloginData,
  );
  if (response && response.success) {
    AsyncStorage.setItem('userToken', response.token);
    AsyncStorage.setItem('user', JSON.stringify(response));
    dispatch({ type: loginString, payload: { user: response } });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  //return response ? response : false;
};



// ----------------Register Patient--------------------- //
export const registerPatient = (patientData, navigator) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.addPatient, 'POST', patientData);

  dispatch({ type: isLoadingString, payload: { loader: false } });
  dispatch({ type: registerPatientString, payload: response.data });
  return response && response.success ? response : false;

};

// ------------------ getAllPatients EndPoint  ----------------------- //
export const getAllPatientsOfAUser = (userId) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  let response = await apiRequest(`users/${userId}/patients`, 'GET');
  if (response && response.success) {
    dispatch({ type: isLoadingString, payload: { loader: true } });
    dispatch({ type: getAllPatientsOfAUserString, payload: response.patients });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response ? response : false;
};

// ------------------ get info of a patient EndPoint  ----------------------- //
export const getAPatientsInfo = (patientId) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  let response = await apiRequest(EndPoints.getAPatientsInfo + `/${patientId}`, 'GET');
  if (response && response.success) {
    dispatch({ type: isLoadingString, payload: { loader: true } });
    dispatch({ type: getAPatientsInfoString, payload: response.data });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response ? response : false;
};

// ----------------Otp password API--------------------- //
export const sendForgotPasswordOTPEmail = (data, navigator) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  console.log('data', data);
  let url = API_URL + EndPoints.sendForgotPasswordOTPEmail;
  const res = await axios.post(url, data)
    .then(function (response) {
      return response;
    }).catch(function (error) {
      // handle error
    })
  return res.data;
};

// -------------- Update User's Profile ---------------//
export const updateProfile = data => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.updateProfile, 'POST', data);
  if (response && response.success) {
    // 
    dispatch({ type: updateProfileString, payload: response });
    dispatch({ type: updateAuthUserString, payload: response.data });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};


// ----------------Update User Password--------------------- //
export const updatePassword = payload => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.updatePassword, 'POST', payload);
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};

// -------------Logout User----------------- //
export const logoutUser = logOutData => async dispatch => {

  AsyncStorage.removeItem('userToken');
  dispatch({ type: isLoadingString, payload: { loader: true } });
  dispatch({ type: logOutString, payload: {} });
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return true;
};
