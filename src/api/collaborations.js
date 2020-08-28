import db from "../db";

export const createCollaboration = col => db.collection("collaborations").add(col).then(docRef => docRef.id)
export const sendMessage = msg => db.collection("profiles").doc(msg.toUser).collection("messages").add(msg);
export const subscribeToMessages = (userId, callback) => db.collection("profiles").doc(userId).collection("messages").onSnapshot(snapshot => {
  const messages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  callback(messages);
});

export const markMessageAsRead = msg => db.collection("profiles").doc(msg.toUser).collection("messages").doc(msg.id).update({isRead: true});