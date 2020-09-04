import db from "../db";
import {createRef} from "./index";

export const createOffer = offer => db.collection("offers").add(offer);

export const fetchSentOffer = uid => {
  const userRef = createRef("profiles", uid);
  return db
    .collection("offers")
    .where("fromUser", "==", userRef)
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
}

export const fetchReceivedOffer = uid => {
  const userRef = createRef("profiles", uid);
  return db
    .collection("offers")
    .where("toUser", "==", userRef)
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
}

export const changeOfferStatus = (offerId, status) => db.collection("offers").doc(offerId).update({status});

export const markOfferAsInCollaboration = offerId => db.collection("offers").doc(offerId).update({collaborationCreated: true});

