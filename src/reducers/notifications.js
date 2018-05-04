import { ACTIONS } from '../actions/actionTypes';

const INITIAL_STATE = {
  ignore: true, timeOut: 5000, title: '', options: {
    tag: '',
    body: '',
    icon: null,
    lang: 'en',
    dir: 'ltr'
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

    case ACTIONS.CLOSE_NOTIFICATION:
      return {
        ...state, title: '', timeOut: 0, options: {
          tag: '',
          body: '',
          icon: null,
          lang: 'en',
          dir: 'ltr'
        }
      };

    default:
      return state;
  }
}
