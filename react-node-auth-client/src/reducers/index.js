import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import UsersReducer from './users';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  users: UsersReducer,
  auth: AuthReducer,
  form: FormReducer
});

export default rootReducer;