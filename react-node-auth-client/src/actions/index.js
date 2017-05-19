import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = `http://localhost:3090`;

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const signInUser = ({ email, password }, callback) => {
  return (dispatch) => {
    // submit email/password object and properties/values to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      // if request is good...
      .then(response => { 
        // update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // save JWT
        localStorage.setItem('token', response.data.token);
        // redirect to the route /feature
        callback();
      })
      .catch(err => {
        dispatch(authError(`Bad login information: ${err}`));
      });
  };
};

export const signUpUser = ({ email, password }, callback) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch(err => {
        dispatch(authError(err.response.data.error));
      });
  };
};

export const signOutUser = () => {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
};

export const fetchMessage = () => {
  return (dispatch) => {
    axios.get(ROOT_URL, { headers: { 
      authorization: localStorage.getItem('token')
    }})
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      })
      .catch(err => console.log(err));
  };
};