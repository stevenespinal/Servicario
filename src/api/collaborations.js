import db from "../db";
import {createRef} from "./index";
import firebase from "firebase/app";

export const createCollaboration = col => db.collection("collaborations").add(col).then(docRef => docRef.id)
export const sendMessage = msg => db.collection("profiles").doc(msg.toUser).collection("messages").add(msg);
export const subscribeToMessages = (userId, callback) => db.collection("profiles").doc(userId).collection("messages").onSnapshot(snapshot => {
  const messages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  callback(messages);
});

export const markMessageAsRead = msg => db.collection("profiles").doc(msg.toUser).collection("messages").doc(msg.id).update({isRead: true});

export const fetchCollaborations = userId => db.collection("collaborations").where("allowedPeople", 'array-contains', userId).get().then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));

export const subscribeToCollaboration = (collaborationId, callback) => db.collection("collaborations").doc(collaborationId).onSnapshot(snapshot => {
  const collaboration = {id: snapshot.id, ...snapshot.data()};
  callback(collaboration);
});

export const joinCollaboration = (collaborationId, userId) => {
  const userRef = createRef('profiles', userId);

  return db.collection("collaborations").doc(collaborationId).update({joinedPeople: firebase.firestore.FieldValue.arrayUnion(userRef)});
}

export const leaveCollaboration = (collaborationId, userId) => {
  const userRef = createRef('profiles', userId);

  return db.collection("collaborations").doc(collaborationId).update({joinedPeople: firebase.firestore.FieldValue.arrayRemove(userRef)});
}

export const subscribeToProfile = (uid, callback) => db.collection("profiles").doc(uid).onSnapshot(snapshot => {
  const user = {id: snapshot.id, ...snapshot.data()};
  callback(user)
})