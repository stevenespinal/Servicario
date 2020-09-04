import {REQUEST_RESOURCE, FETCH_RESOURCE_SUCCESS} from "../types";

export const isFetching = (resource) => {
  return (state = false, action) => {
    if (resource !== action.resource) {
      return state;
    }
    const {type} = action;
    switch (type) {
      case REQUEST_RESOURCE:
        return true;
      case FETCH_RESOURCE_SUCCESS:
        return false;
      default:
        return state;
    }
  }
}
