import {FETCH_SERVICE_SUCCESS} from "../types";
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
  return combineReducers({
    item
  });
}

const selectedService = initSelectedService();

export default selectedService;