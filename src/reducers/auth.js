import {
  RESET_AUTH_STATE,
  SET_AUTH_USER,
  FETCH_USER_SERVICES_SUCCESS,
  FETCH_USER_MESSAGES_SUCCESS
} from "../types";
import { combineReducers } from "redux";

const INITIAL_USER_STATE = {
  messages: [],
  services: []
}

const initAuth = () => {
  const user = (state = INITIAL_USER_STATE, action) => {
    const {type, user, services, messages} = action;
    switch (type) {
      case SET_AUTH_USER:
        return {...user, services: [], messages: []};
      case FETCH_USER_SERVICES_SUCCESS:
        return {...state, services}
      case FETCH_USER_MESSAGES_SUCCESS:
        return {...state, messages}
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
    isAuthResolved
  });
}

const auth = initAuth();

export default auth;