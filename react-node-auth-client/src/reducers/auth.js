import { 
  AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR,
  FETCH_MESSAGE 
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    // user successfully authenticated
    case AUTH_USER:
      return { ...state, isAuthenticated: true };
    // user authentication failed
    case UNAUTH_USER:
      return { ...state, isAuthenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};