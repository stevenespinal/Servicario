import * as api from "../api";
import {FETCH_OFFERS_SUCCESS, CHANGE_OFFER_STATUS, FETCH_RESOURCE_SUCCESS, REQUEST_RESOURCE} from "../types";

export const createOffer = offer => api.createOffer(offer);

const extractDataFromOffer = async (offer, userType) => {
  const service = await offer.service.get();
  const user = await offer[userType].get();
  offer.service = service.data();
  offer.service.id = service.id;
  offer[userType] = user.data();
  return offer;
}

export const fetchSentOffer = uid => dispatch => {
  dispatch({type: REQUEST_RESOURCE, resource: "offers"});

  return api.fetchSentOffer(uid).then(async offers => {
    const mappedOffers = await Promise.all(offers.map(offer => extractDataFromOffer(offer, "toUser")));
    dispatch({type: FETCH_RESOURCE_SUCCESS, resource: "offers"});
    dispatch({
      type: FETCH_OFFERS_SUCCESS,
      offers: mappedOffers,
      offersType: 'sent'
    });
    return mappedOffers;
  });
}

export const fetchReceivedOffer = uid => dispatch => {
  dispatch({type: REQUEST_RESOURCE, resource: "offers"});
  return api.fetchReceivedOffer(uid).then(async offers => {
    const mappedOffers = await Promise.all(offers.map(offer => extractDataFromOffer(offer, "fromUser")));
    dispatch({type: FETCH_RESOURCE_SUCCESS, resource: "offers"});
    dispatch({
      type: FETCH_OFFERS_SUCCESS,
      offers: mappedOffers,
      offersType: 'received'
    });
    return mappedOffers;
  });
}

export const changeOfferStatus = (offerId, status) => dispatch => {
  return api.changeOfferStatus(offerId, status).then(() => {
    dispatch({
      type: CHANGE_OFFER_STATUS,
      offerId,
      offersType: "received",
      status
    });
  });
}