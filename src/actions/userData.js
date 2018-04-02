import * as types from './actionTypes';
import axios from 'axios';

import { deleteToken } from '../utils/tokenUtils';

import { URL } from '../config';
import User from '../models/User';

export function fetchUserData(userToken) {
  return dispatch => {
    dispatch({
      type: types.REQUEST_USER_DATA
    });
    axios.get(URL.currentUser, {
      headers: {
        'Authorization': userToken
      }
    })
        .then(currentUserData => {
          dispatch({
            type: types.RECEIVE_USER_DATA,
            userData: new User(currentUserData.data)
          })
        })
        .catch(() => {
          dispatch({
            type: types.ABORT_USER_DATA
          })
        })

  };
}

export function abortUserData() {
  return dispatch => {
    //abort axios
    deleteToken();
    dispatch({ type: types.ABORT_USER_DATA });
  };
}
