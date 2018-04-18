import { ACTIONS } from '../actions/actionTypes';

const INITIAL_STATE = { data: [], loading: false };

export default function users(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case ACTIONS.REQUEST_USERS:
      return { ...state, loading: true };

    case ACTIONS.RECEIVE_USERS:
      return { data: action.data, loading: false };

    default:
      return state;
  }
}
