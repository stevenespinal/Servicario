import {
  RESET_AUTH_STATE,
  SET_AUTH_USER,
  FETCH_USER_SERVICES_SUCCESS,
  FETCH_USER_MESSAGES_SUCCESS
} from "../types";
import { combineReducers } from "redux";

const initAuth = () => {
  const user = (state = {}, action) => {
    const {type, user, services, messages} = action;
    switch (type) {
      case SET_AUTH_USER:
        return user;
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


// const INITIAL_STATE = {
//   user: null,
//   isAuth: false,
//   isAuthResolved: false
// }

// const auth = (state = INITIAL_STATE, action) => {
//   const {type, user, services, messages, id} = action;
//   switch (type) {
//     case SET_AUTH_USER:
//       return {user, isAuthResolved: true, isAuth: !!user};
//     case RESET_AUTH_STATE:
//       return {...state, isAuthResolved: false};
//     case FETCH_USER_SERVICES_SUCCESS:
//       return {...state, user: {...state.user, services}};
//     case FETCH_USER_MESSAGES_SUCCESS:
//       return {...state, user: {...state.user, messages}};
//     case MARK_MESSAGE_AS_READ:
//       const newMessages = state.user.messages.map(msg => {
//         if (msg.id === id) {
//           msg.isRead = true;
//         }
//         return msg
//       });
//       return {...state, user: {...state.user, messages: newMessages}}
//     default:
//       return state;
//   }
// }

const auth = initAuth();

export default auth;