import { ACTIONS } from './actionTypes';

import { MESSAGE_TYPES } from '../common/messageTypes';

export function socketsConnecting() {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_CONNECTING });
  }
}

export function socketsConnect() {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_CONNECT });
  }
}

export function subscribeToWebSocketMessages(socket) {
  return dispatch => {
    Object.keys(MESSAGE_TYPES)
        .forEach(type => socket.on(type, payload =>
                dispatch({ type, payload })
            )
        );
  }
}

export function socketsDisconnecting() {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_DISCONNECTING });
  }
}

export function socketsDisconnect() {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_DISCONNECT });
  }
}

export function socketsMessageSending(sendMessage) {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_MESSAGE_SENDING, message: sendMessage });
  }
}

export function socketsMessageReceiving(sendMessage) {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_MESSAGE_RECEIVING, message: sendMessage });
  }
}
