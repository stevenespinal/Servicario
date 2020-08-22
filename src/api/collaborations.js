import db from "../db";

export const createCollaboration = col => db.collection("collaborations").add(col).then(docRef => docRef.id)
export const sendMessage = msg => db.collection("profiles").doc(msg.toUser).collection("messages").add(msg);