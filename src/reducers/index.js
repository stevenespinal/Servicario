import {FETCH_SERVICES} from "../types";

const INITIAL_STATE = {
  items: []
}

const servicesReducer = (state = INITIAL_STATE, action) => {
  const {type, services} = action;
  switch (type) {
    case FETCH_SERVICES:
      return {...state, items: services}
    default:
      return state;
  }
}

export default servicesReducer;