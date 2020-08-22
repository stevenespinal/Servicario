import {combineReducers} from "redux";
import {FETCH_OFFERS_SUCCESS} from "../types";

const createOfferList = offersType => {
  return (state = [], action) => {
    // const {offersType} = action;

    if (action.offersType !== offersType) return state;

    switch (action.type) {
      case FETCH_OFFERS_SUCCESS:
        return action.offers
      default:
        return state;
    }
  }
}

const offers = combineReducers({
  received: createOfferList('received'),
  sent: createOfferList('sent')
});

export default offers;