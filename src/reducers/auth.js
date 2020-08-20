import {RESET_AUTH_STATE, SET_AUTH_USER} from "../types";

const INITIAL_STATE = {
  user: null,
  isAuth: false,
  isAuthResolved: false
}

const auth = (state = INITIAL_STATE, action) => {
  const {type, user} = action;
  switch (type) {
    case SET_AUTH_USER:
      return {user, isAuthResolved: true, isAuth: !!user}
    case RESET_AUTH_STATE:
      return {...state, isAuthResolved: false}
    default:
      return state;
  }
}

export default auth;