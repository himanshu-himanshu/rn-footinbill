import apiRequest from '../network/api';
import axios from 'axios';
import {
  loginString,
  isLoadingString,
  updateProfileString,
  logOutString,
  registerPatientString,
  updateAuthUserString,
  saveAuthUserString,
  saveAuthTokenString,
  API_URL,
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

// -------------  set user details ------- //
export const getUserToken = () => async dispatch => {
  const user = await AsyncStorage.getItem('userToken');
  if (user) {
    return JSON.parse(user);
  }
};

// -------------  saveAuthToken ------- //
export const saveAuthToken = authToken => async dispatch => {
  dispatch({type: saveAuthTokenString, payload: authToken});
};

// ------------------ Login User  ----------------------- //
export const loginUser = loginData => async dispatch => {
  let k = await axios
    .post(API_URL + EndPoints.signIn, loginData)
    .then(function (fff) {
      //console.log('fff', fff);
      dispatch(saveAuthToken(fff.data.data.access_token));
      dispatch(getAuthUser(fff.data.data.access_token));
      let any = {
        code: 200,
        message: fff.data.message,
      };
      return any;
    })
    .catch(function (error) {
      // alert(error.response.data.message);
      // return error;
      let any = {
        code: 401,
        message: error.response.data.message,
      };
      return any;
    });
  //console.log('k', k);
  return k;
};

// ------------------ Change Password  ----------------------- //
export const changePassword = payload => async dispatch => {
  const config = {
    headers: {Authorization: `Bearer ${payload.authToken}`},
  };
  //console.log('auth action payload change password line 43', config);
  let response = await axios
    .put(API_URL + EndPoints.changePassword, payload, config)
    .then(function (innerResponse) {
      //console.log('innerResponse', innerResponse);
      let any = {
        code: 200,
        message: innerResponse.data.message,
      };
      return any;
    })
    .catch(err => {
      //console.log(
      //   'AUTH ACTION CHANGE PASS**************',
      //   err.response.data.message,
      // );
      let any = {
        code: 401,
        message: err.response.data.message,
      };
      return any;
    });
  return response;
};

// ------------------ get Auth User  ----------------------- //
export const getAuthUser = authToken => async dispatch => {
  const config = {
    headers: {Authorization: `Bearer ${authToken}`},
  };
  await axios
    .get(API_URL + EndPoints.getAuthUser, config)
    .then(function (response) {
      dispatch({type: saveAuthUserString, payload: response.data.data});
      return response;
    })
    .catch(function (error) {
      // alert(error.response.data.message);
    });
};

// ----------------Register User--------------------- //
export const registerUser = signUpData => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  // const response = await apiRequest(EndPoints.signUp, 'POST', signUpData);
  let url = API_URL + EndPoints.signUp;
  let res = await axios
    .post(url, signUpData)
    .then(function (response) {
      if (response && response.data.success) {
        dispatch(saveAuthToken(response.data.data.access_token));
        dispatch(getAuthUser(response.data.data.access_token));
        //AsyncStorage.setItem('userToken', response.data.data.access_token);
        dispatch({type: loginString, payload: response.data});
        let any = {
          code: 200,
          message: response.data.message,
        };
        return any;
      }
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

// ----------------send otp to email API--------------------- //
export const sendForgotPasswordOTPEmail =
  (data, navigator) => async dispatch => {
    // dispatch({ type: isLoadingString, payload: { loader: true } });
    let url = API_URL + EndPoints.sendForgotPasswordOTPEmail;
    const res = await axios
      .post(url, data)
      .then(function (response) {
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

// ----------------Verify OTP--------------------- //
export const verifyForgotPasswordOTP = (data, navigator) => async dispatch => {
  let url = API_URL + EndPoints.verifyOtp + '/' + data.otp;
  const res = await axios
    .post(url, data)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response.data;
    });
  return res;
};

// ------------------ Google Login  ----------------------- //
export const handleGoogleLogIn = googleloginData => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(
    EndPoints.googleLogin,
    'POST',
    googleloginData,
  );
  if (response && response.success) {
    AsyncStorage.setItem('userToken', response.token);
    AsyncStorage.setItem('user', JSON.stringify(response));
    dispatch({type: loginString, payload: {user: response}});
  }
  // dispatch({ type: isLoadingString, payload: { loader: false } });
  //return response ? response : false;
};

// ----------------Register Patient--------------------- //
export const registerPatient = (patientData, navigator) => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.addPatient, 'POST', patientData);

  // dispatch({ type: isLoadingString, payload: { loader: false } });
  dispatch({type: registerPatientString, payload: response.data});
  return response && response.success ? response : false;
};

// -------------- Update User's Profile ---------------//
export const updateProfile = data => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.updateProfile, 'POST', data);
  if (response && response.success) {
    //
    dispatch({type: updateProfileString, payload: response});
    dispatch({type: updateAuthUserString, payload: response.data});
  }
  // dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};

// ----------------Update User Password--------------------- //
export const updatePassword = payload => async dispatch => {
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.updatePassword, 'POST', payload);
  // dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};

// -------------Logout User----------------- //
export const logoutUser = logOutData => async dispatch => {
  AsyncStorage.removeItem('userToken');
  // dispatch({ type: isLoadingString, payload: { loader: true } });
  dispatch({type: logOutString, payload: {}});
  // dispatch({ type: isLoadingString, payload: { loader: false } });
  return true;
};
