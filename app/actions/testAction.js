import apiRequest from '../network/api';
import {
  getAllTestsOfAPatientString,
  isLoadingString,
  addATestResultString,
  getATestResultString
} from '../constants/actionStrings';
import EndPoints from '../constants/endPoints';

// ------------------ getAllTestsOfAPatient EndPoints  ----------------------- //
export const getAllTestsOfAPatient = (patientId) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  let response = await apiRequest(EndPoints.getAllTestsOfAPatient + `/${patientId}/tests`, 'GET');
  if (response && response.success) {
    dispatch({ type: isLoadingString, payload: { loader: true } });
    dispatch({ type: getAllTestsOfAPatientString, payload: response.data });
  }
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response ? response : false;
};

// ----------------add A Patient--------------------- //
export const addATestResult = (patientData) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.addATestResult + `/${patientData.userId}/tests`, 'POST', patientData);
  dispatch({ type: addATestResultString, payload: response.data });
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};

// ----------------add A Patient--------------------- //
export const getATestResult = (patientId, testId) => async dispatch => {
  dispatch({ type: isLoadingString, payload: { loader: true } });
  const response = await apiRequest(EndPoints.getATestResult + `/${patientId}/tests/${testId}`, 'GET');
  dispatch({ type: getATestResultString, payload: response.data });
  dispatch({ type: isLoadingString, payload: { loader: false } });
  return response && response.success ? response : false;
};