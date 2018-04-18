import { ACTIONS } from '../actions/actionTypes';

const INITIAL_STATE = { all: [], active: [], loading: false };

export default function chats(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case ACTIONS.REQUEST_CHATS:
      return { ...state, loading: true };

    case ACTIONS.RECEIVE_CHATS:
      return { ...state, all: action.data, loading: false };

    case ACTIONS.CREATE_CHAT: {
      const NEW_STATE = { ...state };

      NEW_STATE.all.push(action.data);
      NEW_STATE.active.push(action.data);
      return {...state, NEW_STATE};
    }

    case ACTIONS.UPDATE_CHAT: {
      const NEW_STATE = { ...state };
      const COMMON_INDEX = NEW_STATE.all.indexOf(NEW_STATE.all.find(chat => chat.id === action.data.id));
      const ACTIVE_INDEX = NEW_STATE.active.indexOf(NEW_STATE.active.find(chat => chat.id === action.data.id));

      NEW_STATE.all[COMMON_INDEX] = action.data;
      NEW_STATE.active[ACTIVE_INDEX] = action.data;
      return {...state, ...NEW_STATE};
    }

    case ACTIONS.OPEN_CHAT: {
      const NEW_STATE = { ...state };

      NEW_STATE.active.push(action.data);
      return {...state, ...NEW_STATE};
    }

    case ACTIONS.CLOSE_CHAT: {
      const NEW_STATE = { ...state };

      NEW_STATE.active.splice(NEW_STATE.active.indexOf(action.data), 1);
      return {...state, ...NEW_STATE};
    }

    default:
      return state;
  }
}
