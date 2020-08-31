import * as api from "../api";
import {
  COLLABORATION_CREATED_FROM_OFFER,
  FETCH_USER_MESSAGES_SUCCESS,
  SET_COLLABORATION,
  SET_COLLABORATION_JOINED_PEOPLE,
  UPDATE_COLLABORATION_USER
} from "../types";

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

export const subscribeToMessages = userId => dispatch => api.subscribeToMessages(userId, messages => dispatch({
  type: FETCH_USER_MESSAGES_SUCCESS,
  messages
}));

export const markMessageAsRead = msg => api.markMessageAsRead(msg);

export const fetchCollaborations = userId => api.fetchCollaborations(userId);

export const subscribeToCollaboration = (collaborationId, callback) => dispatch => api.subscribeToCollaboration(collaborationId, async collaboration => {
  let joinedPeople = [];
  if (collaboration.joinedPeople) {
    joinedPeople = await Promise.all(collaboration.joinedPeople.map(async userRef => {
      const user = await userRef.get();
      return {id: user.id, ...user.data()};
    }));
  }
  dispatch({type: SET_COLLABORATION, collaboration});
  dispatch({type: SET_COLLABORATION_JOINED_PEOPLE, joinedPeople});
  callback({joinedPeople});
});

export const joinCollaboration = (collaborationId, userId) => api.joinCollaboration(collaborationId, userId);

export const subscribeToProfile = uid => dispatch => api.subscribeToCollaboration(uid, user => dispatch({
  type: UPDATE_COLLABORATION_USER,
  user
}));