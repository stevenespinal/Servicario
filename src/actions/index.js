import {FETCH_SERVICES_SUCCESS, FETCH_SERVICE_SUCCESS, REQUEST_SERVICE} from "../types";
import * as api from "../api";

export const fetchServices = () => dispatch => api.fetchServices().then(services => dispatch({
  type: FETCH_SERVICES_SUCCESS,
  services
}));

export const fetchService = id => dispatch => {
  dispatch({
    type: FETCH_SERVICE_SUCCESS,
    service: {}
  });

  dispatch({type: REQUEST_SERVICE});

  return api.fetchService(id).then(service => dispatch({
    type: FETCH_SERVICE_SUCCESS,
    service
  }));
}