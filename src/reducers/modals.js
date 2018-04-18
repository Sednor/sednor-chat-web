import { ACTIONS } from '../actions/actionTypes';

const INITIAL_STATE = { chatModal: false };

export default function modals(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case ACTIONS.OPEN_CHAT_MODAL:
      return { ...state, chatModal: true };

    case ACTIONS.CLOSE_CHAT_MODAL:
      return { ...state, chatModal: false };

    default:
      return state;
  }
}
