import {
  RESET_AUTH_STATE,
  SET_AUTH_USER,
  FETCH_USER_SERVICES_SUCCESS,
  FETCH_USER_MESSAGES_SUCCESS,
  MARK_MESSAGE_AS_READ
} from "../types";

const INITIAL_STATE = {
  user: null,
  isAuth: false,
  isAuthResolved: false
}

const auth = (state = INITIAL_STATE, action) => {
  const {type, user, services, messages, id} = action;
  switch (type) {
    case SET_AUTH_USER:
      return {user, isAuthResolved: true, isAuth: !!user};
    case RESET_AUTH_STATE:
      return {...state, isAuthResolved: false};
    case FETCH_USER_SERVICES_SUCCESS:
      return {...state, user: {...state.user, services}};
    case FETCH_USER_MESSAGES_SUCCESS:
      return {...state, user: {...state.user, messages}};
    case MARK_MESSAGE_AS_READ:
      const newMessages = state.user.messages.map(msg => {
        if (msg.id === id) {
          msg.isRead = true;
        }
        return msg
      });
      return {...state, user: {...state.user, messages: newMessages}}
    default:
      return state;
  }
}

export default auth;