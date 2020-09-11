import {
  RESET_AUTH_STATE,
  SET_AUTH_USER,
  FETCH_USER_SERVICES_SUCCESS,
  FETCH_USER_MESSAGES_SUCCESS
} from "../types";
import {combineReducers} from "redux";
//
// const INITIAL_USER_STATE = {
//   messages: [],
//   services: []
// }

const initAuth = () => {
  const user = (state = {}, action) => {
    const {type, user} = action;
    switch (type) {
      case SET_AUTH_USER:
        return user;
      default:
        return state;
    }
  }

  const messages = (state = [], action) => {
    const {type, messages} = action;
    switch (type) {
      case FETCH_USER_MESSAGES_SUCCESS:
        return messages;
      default:
        return state;
    }
  }

  const services = (state = [], action) => {
    const {type, services} = action;
    switch (type) {
      case FETCH_USER_SERVICES_SUCCESS:
        return services;
      default:
        return state;
    }
  }

  const isAuth = (state = false, action) => {
    const {type, user} = action;
    switch (type) {
      case SET_AUTH_USER:
        return !!user;
      default:
        return state;
    }
  }
  const isAuthResolved = (state = false, action) => {
    const {type} = action;
    switch (type) {
      case SET_AUTH_USER:
        return true;
      case RESET_AUTH_STATE:
        return false;
      default:
        return state;
    }
  }

  return combineReducers({
    user,
    isAuth,
    isAuthResolved,
    messages,
    services
  });
}

const auth = initAuth();

export default auth;