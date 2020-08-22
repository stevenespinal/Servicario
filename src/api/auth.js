import db from "../db";
import firebase from "firebase";

const createUserProfile = userProfile => db.collection("profiles").doc(userProfile.uid).set(userProfile);
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

export const login = ({email, password}) => firebase.auth().signInWithEmailAndPassword(email, password).catch(error => Promise.reject(error.message));
export const logout = () => firebase.auth().signOut();
export const onAuthStateChanged = onAuthCallback => firebase.auth().onAuthStateChanged(onAuthCallback);
export const getUserProfile = uid => db.collection("profiles").doc(uid).get().then(snapshot => ({uid, ...snapshot.data()}));