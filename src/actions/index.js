import {FETCH_SERVICES_SUCCESS, FETCH_SERVICE_SUCCESS, REQUEST_SERVICE, SET_AUTH_USER, RESET_AUTH_STATE} from "../types";
import * as api from "../api";

export const fetchServices = () => dispatch => api.fetchServices().then(services => dispatch({
  type: FETCH_SERVICES_SUCCESS,
  services
}));

export const fetchService = id => (dispatch, getState) => {

  const lastService = getState().selectedService.item;

  if (lastService.id && lastService.id === id) {
    return Promise.resolve()
  }

  dispatch({type: REQUEST_SERVICE});

  return api.fetchService(id).then(service => dispatch({
    type: FETCH_SERVICE_SUCCESS,
    service
  }));
}

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
