import {RESET_AUTH_STATE, SET_AUTH_USER, FETCH_USER_SERVICES_SUCCESS} from "../types";

const INITIAL_STATE = {
  user: null,
  isAuth: false,
  isAuthResolved: false
}

const auth = (state = INITIAL_STATE, action) => {
  const {type, user, services} = action;
  switch (type) {
    case SET_AUTH_USER:
      return {user, isAuthResolved: true, isAuth: !!user};
    case RESET_AUTH_STATE:
      return {...state, isAuthResolved: false};
    case FETCH_USER_SERVICES_SUCCESS:
      return {...state, user: {...state.user, services}};
    default:
      return state;
  }
}

export default auth;