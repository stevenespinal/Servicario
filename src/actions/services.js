import * as api from "../api";
import {FETCH_SERVICE_SUCCESS, FETCH_SERVICES_SUCCESS, FETCH_USER_SERVICES_SUCCESS, REQUEST_SERVICE} from "../types";

export const fetchServices = () => dispatch => api.fetchServices().then(services => dispatch({
  type: FETCH_SERVICES_SUCCESS,
  services
}));

export const fetchUserServices = userId => dispatch => api.fetchUserServices(userId).then(services => dispatch({
  type: FETCH_USER_SERVICES_SUCCESS,
  services
}));

export const fetchService = id => (dispatch, getState) => {

  const lastService = getState().selectedService.item;

  if (lastService.id && lastService.id === id) {
    return Promise.resolve()
  }

  dispatch({type: REQUEST_SERVICE});

  return api.fetchService(id).then(async service => {
    // service.user = await api.getUserProfile(service.user);
    const user = await service.user.get();
    service.user = user.data();
    service.user.id = user.id;
    dispatch({
      type: FETCH_SERVICE_SUCCESS,
      service
    })
  });
}

export const createService = (newService, userId) => {
  newService.price = parseInt(newService.price, 10);
  // newService.user = userId;
  newService.user = api.createRef("profiles", userId);
  return api.createService(newService);
}