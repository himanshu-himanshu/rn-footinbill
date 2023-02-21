import { getAllTestsOfAPatientString, addATestResultString, getATestResultString } from '../constants/actionStrings';

export default (state = {}, action) => { 
  switch (action.type) {
    case getAllTestsOfAPatientString:
      return {
        ...state,
        tests: action.payload,
      };
    case addATestResultString:
      return {
        ...state,
        tests: action.payload,
      };
    case getATestResultString:
      return {
        ...state,
        test: action.payload,
      };
    default:
      return state;
  };
}
