import {FETCH_SERVICES_SUCCESS, FETCH_SERVICE_SUCCESS} from "../types";
import * as api from "../api";

export const fetchServices = () => api.fetchServices().then(services => ({type: FETCH_SERVICES_SUCCESS, services}));

export const fetchService = id => api.fetchService(id).then(service => ({
  type: FETCH_SERVICE_SUCCESS,
  service
}));