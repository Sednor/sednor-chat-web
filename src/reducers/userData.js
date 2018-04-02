import * as types from '../actions/actionTypes';

const INITIAL_STATE = { userData: {}, loading: false };

export default function userData(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case types.REQUEST_USER_DATA:
      return { ...state, loading: true };

    case types.RECEIVE_USER_DATA:
      return { userData: action.userData, loading: false };

    case types.ABORT_USER_DATA:
      return { userData: {}, loading: false };

    default:
      return state;
  }
}
