import { combineReducers } from "redux";
import auth from './auth'
import users from './users';
import roles from './roles';
import permissions from './permissions';

export default combineReducers({
  auth,
  users,
  roles,
  permissions,
});