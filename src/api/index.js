import firebase from "firebase/app";
import "firebase/auth";
import db from "../db";

const createUserProfile = userProfile => db.collection("profile").doc(userProfile.uid).set(userProfile);

export const fetchService = id => db.collection("services").doc(id).get().then(snapshot => ({id: snapshot.id, ...snapshot.data()}));

export const fetchServices = () => db.collection("services").get().then(snapshot => snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})));

export const register = async ({email, password, fullName, avatar}) => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const {user} = response;
    const userProfile = {uid: user.uid, fullName: fullName, email, avatar, description: "", services: []};
    await createUserProfile(userProfile);
    return userProfile;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export const login = async({email, password}) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

