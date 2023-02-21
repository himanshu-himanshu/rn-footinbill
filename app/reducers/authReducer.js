import { loginString, updateAuthUserString, getAllTestsOfAPatientString, getAllPatientsOfAUserString, logOutString, getAPatientsInfoString } from '../constants/actionStrings';

export default (state = {}, action) => {
  switch (action.type) {
    case logOutString:
      return {
      };
    case loginString:
      return {
        ...state,
        user: action.payload.data,
      };
    case updateAuthUserString:
      return {
        ...state,
        user: action.payload.data,
      };
    case getAllPatientsOfAUserString:
      return {
        ...state,
        allPatients: action.payload,
      };
    case getAPatientsInfoString:
      return {
        ...state,
        patient: action.payload,
      };
    default:
      return state;
  }
};
