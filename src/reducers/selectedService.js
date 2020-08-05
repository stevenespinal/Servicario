import {FETCH_SERVICE_SUCCESS} from "../types";

const INITIAL_STATE = {
  item: {}
}

const selectedService = (state = INITIAL_STATE, action) => {
  const {type, service} = action;
  switch (type) {
    case FETCH_SERVICE_SUCCESS:
      return {item: service}
    default:
      return state;
  }
}

export default selectedService;