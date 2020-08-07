import {FETCH_SERVICE_SUCCESS, REQUEST_SERVICE} from "../types";
import {combineReducers} from "redux";

const initSelectedService = () => {
  const item = (state = {}, action) => {
    const {type, service} = action;
    switch (type) {
      case FETCH_SERVICE_SUCCESS:
        return service
      default:
        return state;
    }
  }

  const isFetching = (state = false, action) => {
    const {type} = action;
    switch (type) {
      case REQUEST_SERVICE:
        return true;
      case FETCH_SERVICE_SUCCESS:
        return false;
      default:
        return state;
    }
  }

  return combineReducers({
    item,
    isFetching
  });
}

const selectedService = initSelectedService();

export default selectedService;