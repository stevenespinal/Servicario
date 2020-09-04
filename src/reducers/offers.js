import {combineReducers} from "redux";
import {CHANGE_OFFER_STATUS, COLLABORATION_CREATED_FROM_OFFER, FETCH_OFFERS_SUCCESS} from "../types";
import {isFetching} from "./common";

const createOfferList = offersType => {
  return (state = [], action) => {
    // const {offersType} = action;

    if (action.offersType !== offersType) return state;

    switch (action.type) {
      case FETCH_OFFERS_SUCCESS:
        return action.offers;
      case CHANGE_OFFER_STATUS: {
        const nextState = [...state];
        const offerIndex = nextState.findIndex(o => o.id === action.offerId);
        nextState[offerIndex].status = action.status;
        return nextState;
      }
      case COLLABORATION_CREATED_FROM_OFFER: {
        const nextState = [...state];
        const offerIndex = nextState.findIndex(o => o.id === action.offerId);
        nextState[offerIndex].collaborationCreated = true;
        return nextState;
      }
      default:
        return state;
    }
  }
}

const offers = combineReducers({
  received: createOfferList('received'),
  sent: createOfferList('sent'),
  isFetching: isFetching('offers')
});

export default offers;