import {getAGroupString, getAllGroupsString} from '../constants/actionStrings';

export default (state = {}, action) => {
  //rconsole.log('GROUP REDUCER action ----------XXXX', action.payload);
  switch (action.type) {
    case getAllGroupsString:
      return {
        ...state,
        groups: action.payload.data,
      };
    case getAGroupString:
      return {
        ...state,
        group: action.payload.data,
      };
    default:
      return state;
  }
};
