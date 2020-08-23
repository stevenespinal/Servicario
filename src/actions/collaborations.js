import * as api from "../api";
import {COLLABORATION_CREATED_FROM_OFFER, FETCH_USER_MESSAGES_SUCCESS, MARK_MESSAGE_AS_READ} from "../types";

export const collaborate = ({collaboration, msg}) => dispatch => api.createCollaboration(collaboration).then(collabId => {
  msg.cta = `/collaborations/${collabId}`;
  api.sendMessage(msg);
  api.markOfferAsInCollaboration(collaboration.fromOffer);
  dispatch({
    type: COLLABORATION_CREATED_FROM_OFFER,
    offerId: collaboration.fromOffer,
    offersType: 'sent'
  });
  return collabId;
});

export const subscribeToMessages = userId => dispatch => api.subscribeToMessages(userId, messages => dispatch({type: FETCH_USER_MESSAGES_SUCCESS, messages}));

export const markMessageAsRead = msg => api.markMessageAsRead(msg);