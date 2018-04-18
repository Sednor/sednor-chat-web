import { ACTIONS } from './actionTypes';

import { deleteToken } from '../utils/tokenUtils';

import api from '../api/api';

import { URL } from '../config';

import User from '../models/User';

export function fetchUserData() {
  return dispatch => {
    dispatch({
      type: ACTIONS.REQUEST_USER_DATA
    });
    api.get(URL.auth.currentUser)
        .then(currentUserData => {
          dispatch({
            type: ACTIONS.RECEIVE_USER_DATA,
            data: new User(currentUserData.data)
          })
        })
        .catch(() => {
          dispatch(abortUserData());
        })

  };
}

export function abortUserData() {
  return dispatch => {
    //abort axios
    deleteToken();
    dispatch({ type: ACTIONS.ABORT_USER_DATA });
  };
}
