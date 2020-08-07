import {FETCH_SERVICES_SUCCESS} from "../types";
import {combineReducers} from "redux";
//
// const INITIAL_STATE = {
//   items: []
// }

const initServices = () => {
  const all = (state = [], action) => {
    const {type, services} = action;
    switch (type) {
      case FETCH_SERVICES_SUCCESS:
        return services
      default:
        return state;
    }
  }

  return combineReducers({all});

}

const services = initServices();

export default services;