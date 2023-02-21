import { combineReducers } from 'redux';
import auth from './authReducer';
import test from './testReducer';
import Loader from './apiLoader'

export default combineReducers({
  auth,
  test,
  Loader,
});
