import firebase from "firebase/app";
import 'firebase/database';

export const createFirebaseRef = (collection, id) => firebase.database().ref(`/${collection}/${id}`);

export const onConnectionChanged = callback => firebase.database().ref('.info/connected').on('value', snapshot => {
  callback(snapshot.val())
});

export const isOffline = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP
}
export const isOnline = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP
}
