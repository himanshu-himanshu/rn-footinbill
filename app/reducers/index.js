import { combineReducers } from 'redux';
import auth from './authReducer';
import group from './groupReducer';
import test from './testReducer';
import friend from './friendReducer';
import Loader from './apiLoader'

export default combineReducers({
  auth,
  test,
  group,
  friend,
  Loader,
});
