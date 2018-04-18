import openSocket from 'socket.io-client';

import { ACTIONS } from '../actions/actionTypes';

import { URL } from '../config';

const INITIAL_STATE = {
  socket: null,
  loaded: false,
  message: 'Just created',
  connected: false,
  history: []
};

export default function webSocket(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ACTIONS.SOCKETS_CONNECTING:
      return {
        ...state,
        socket: openSocket(URL.webSocket),
        loaded: true,
        message: 'Connecting...',
        connected: false,
        history: [
          ...state.history,
          {
            loaded: true,
            message: 'Connecting...',
            connected: false
          }
        ]
      };
    case ACTIONS.SOCKETS_CONNECT:
      return {
        ...state,
        loaded: true,
        message: 'Connected',
        connected: true,
        history: [
          ...state.history,
          {
            loaded: true,
            message: 'Connected',
            connected: true
          }
        ]
      };
    case ACTIONS.SOCKETS_DISCONNECTING:
      return {
        ...state,
        loaded: true,
        message: 'Disconnecting...',
        connected: true,
        history: [
          ...state.history,
          {
            loaded: true,
            message: 'Disconnecting...',
            connected: false
          }
        ]
      };
    case ACTIONS.SOCKETS_DISCONNECT:
      return {
        ...state,
        loaded: false,
        message: 'Disconnected',
        connected: false,
        history: [
          ...state.history,
          {
            loaded: false,
            message: 'Disconnected',
            connected: false
          }
        ]
      };
    case ACTIONS.SOCKETS_MESSAGE_SENDING:
      return {
        ...state,
        loaded: true,
        message: 'Send message',
        connected: true
      };
    case ACTIONS.SOCKETS_MESSAGE_RECEIVING:
      return {
        ...state,
        loaded: true,
        message: 'Message receive',
        connected: true
      };
    default:
      return state;
  }
}
