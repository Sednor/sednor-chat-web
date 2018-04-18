import { ACTIONS } from '../actions/actionTypes';

const INITIAL_STATE = {
  ignore: true, timeOut: 5000, title: '', options: {
    tag: '',
    body: '',
    icon: null,
    lang: 'en',
    sound: '' //not supported yet
  }
};

export default function notifications(state = { ...INITIAL_STATE }, action = {}) {
  switch (action.type) {
    case ACTIONS.ENABLE_NOTIFICATIONS:
      return { ...state, ignore: false };

    case ACTIONS.DISABLE_NOTIFICATIONS:
      return { ...state, ignore: true };

    case ACTIONS.CREATE_NOTIFICATION:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
