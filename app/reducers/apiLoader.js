import {isLoadingString, resetStoreString} from '../constants/actionStrings';

export default (loader = false, action) => {
  switch (action.type) {
    case resetStoreString:
      return loader;
    case isLoadingString:
      return action.payload.loader;
    default:
      return loader;
  }
};
