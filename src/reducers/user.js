import {FETCH_USER_SERVICES_SUCCESS} from "../types";

const INITIAL_STATE = {
  services: []
}

const user = (state = INITIAL_STATE, action) => {
  const {type, services} = action;
  switch (type) {
    case FETCH_USER_SERVICES_SUCCESS:
      return {services};
    default:
      return state;
  }
}

export default user;