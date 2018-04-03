import * as types from '../actions/actionTypes';

const INITIAL_STATE = { data: {}, loading: false };

export default function user(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case types.REQUEST_USER_DATA:
      return { ...state, loading: true };

    case types.RECEIVE_USER_DATA:
      return { data: action.data, loading: false };

    case types.ABORT_USER_DATA:
      return { data: {}, loading: false };

    default:
      return state;
  }
}
