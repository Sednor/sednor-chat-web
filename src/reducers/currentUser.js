import { ACTIONS } from '../actions/actionTypes';

const INITIAL_STATE = { data: {}, loading: false };

export default function currentUser(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case ACTIONS.REQUEST_USER_DATA:
      return { ...state, loading: true };

    case ACTIONS.RECEIVE_USER_DATA:
      return { data: action.data, loading: false };

    case ACTIONS.ABORT_USER_DATA:
      return { data: {}, loading: false };

    default:
      return state;
  }
}
