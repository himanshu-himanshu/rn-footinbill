import {getAllFriendsString} from '../constants/actionStrings';

export default (state = {}, action) => {
  //console.log('friend REDUCER action ----------XXXX', action.payload);
  switch (action.type) {
    case getAllFriendsString:
      return {
        ...state,
        friend: action.payload.data,
      };
    default:
      return state;
  }
};
