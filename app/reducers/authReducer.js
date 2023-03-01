import {
  loginString,
  updateAuthUserString,
  saveAuthTokenString,
  saveAuthUserString,
  logOutString,
} from '../constants/actionStrings';

export default (state = {}, action) => {
  switch (action.type) {
    case logOutString:
      return {};
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
    case saveAuthTokenString:
      return {
        ...state,
        authToken: action.payload,
      };
    case saveAuthUserString:
      return {
        ...state,
        authUser: action.payload,
      };
    default:
      return state;
  }
};
