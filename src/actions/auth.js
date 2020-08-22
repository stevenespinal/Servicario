import * as api from "../api";
import {RESET_AUTH_STATE, SET_AUTH_USER} from "../types";

export const register = registerFormData => api.register({...registerFormData});
export const login = loginData => api.login({...loginData});
export const logout = () => dispatch => api.logout().then(() => dispatch({user: null, type: SET_AUTH_USER}));
export const onAuthStateChanged = onAuthCallback => api.onAuthStateChanged(onAuthCallback);

export const storeAuthUser = authUser => dispatch => {
  dispatch({type: RESET_AUTH_STATE});
  if (authUser) {
    return api.getUserProfile(authUser.uid).then(profile => dispatch({user: profile, type: SET_AUTH_USER}));
  } else {
    return dispatch({user: null, type: SET_AUTH_USER});
  }
}
