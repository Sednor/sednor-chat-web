import { ACTIONS } from './actionTypes';

import api from '../api/api';

import { URL } from '../config';

import User from '../models/User';

export function fetchUsers() {
  return dispatch => {
    dispatch({
      type: ACTIONS.REQUEST_USERS
    });
    api.get(URL.users)
        .then(response => {
          dispatch({
            type: ACTIONS.RECEIVE_USERS,
            data: response.data.map(user => new User(user))
          });
        });
  };
}
