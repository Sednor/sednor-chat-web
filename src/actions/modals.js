import { ACTIONS } from './actionTypes';

export function openChatModal() {
  return dispatch => {
    dispatch({ type: ACTIONS.OPEN_CHAT_MODAL });
  }
}

export function closeChatModal() {
  return dispatch => {
    dispatch({ type: ACTIONS.CLOSE_CHAT_MODAL });
  }
}
